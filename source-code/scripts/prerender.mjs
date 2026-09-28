#!/usr/bin/env node
/**
 * Prerenders every route to static HTML so search engines and AI crawlers can read
 * the page content without executing JavaScript.
 *
 * 1. Serves the repository root on a local port
 * 2. Loads each route in headless Chrome and captures the rendered DOM
 * 3. Splices the rendered markup back into that route's static HTML file
 *
 * Usage: node scripts/prerender.mjs   (run after scripts/seo-inject.mjs)
 */
import { execFile } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(projectRoot, "..");
const meta = JSON.parse(fs.readFileSync(path.join(projectRoot, "shared", "pageMeta.json"), "utf8"));

const PORT = 8123;
const RENDER_BUDGET_MS = 20000;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function createServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const requested = decodeURIComponent(req.url.split("?")[0]);
      let file = path.join(repoRoot, requested);
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      if (!fs.existsSync(file)) {
        file = path.join(repoRoot, "404.html");
        res.statusCode = 404;
      }
      res.setHeader("Content-Type", MIME[path.extname(file)] || "application/octet-stream");
      fs.createReadStream(file).pipe(res);
    });
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

// Walks the markup from <div id="root"> to its matching closing tag so nested
// divs inside the rendered page are preserved.
function extractRootMarkup(dom) {
  const marker = '<div id="root">';
  const start = dom.indexOf(marker);
  if (start === -1) return null;

  const contentStart = start + marker.length;
  let index = contentStart;
  let depth = 1;

  while (index < dom.length) {
    const nextOpen = dom.indexOf("<div", index);
    const nextClose = dom.indexOf("</div>", index);
    if (nextClose === -1) return null;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + 4;
      continue;
    }
    depth -= 1;
    if (depth === 0) return dom.slice(contentStart, nextClose);
    index = nextClose + 6;
  }
  return null;
}

async function capture(chrome, routePath, profileDir) {
  const url = `http://127.0.0.1:${PORT}${routePath}`;
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--disable-extensions",
    "--no-first-run",
    "--disable-sync",
    "--host-resolver-rules=MAP * 127.0.0.1:8123",
    `--user-data-dir=${profileDir}`,
    `--virtual-time-budget=${RENDER_BUDGET_MS}`,
    "--window-size=1440,900",
    "--dump-dom",
    url,
  ];
  return new Promise((resolve, reject) => { execFile(chrome, args, { encoding: "utf8", maxBuffer: 268435456, timeout: 90000 }, (error, stdout) => { if (error && !stdout) { reject(error); } else { resolve(stdout || ""); } }); });
}

function replaceRoot(html, markup) {
  const marker = '<div id="root">';
  const start = html.indexOf(marker);
  if (start === -1) return null;
  const contentStart = start + marker.length;
  const close = html.indexOf("</div>", contentStart);
  if (close === -1) return null;
  const current = html.slice(contentStart, close);
  if (current.includes("<")) {
    const end = (() => {
      let index = contentStart;
      let depth = 1;
      while (index < html.length) {
        const nextOpen = html.indexOf("<div", index);
        const nextClose = html.indexOf("</div>", index);
        if (nextClose === -1) return -1;
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth += 1;
          index = nextOpen + 4;
          continue;
        }
        depth -= 1;
        if (depth === 0) return nextClose;
        index = nextClose + 6;
      }
      return -1;
    })();
    if (end === -1) return null;
    return html.slice(0, contentStart) + markup + html.slice(end);
  }
  return html.slice(0, contentStart) + markup + html.slice(close);
}

const targetFor = (routePath) =>
  routePath === "/" ? path.join(repoRoot, "index.html") : path.join(repoRoot, routePath.replace(/^\//, ""), "index.html");

const chrome = findChrome();
if (!chrome) {
  console.log("No headless browser found; skipping prerender (static shells stay in place).");
  process.exit(0);
}

const server = await createServer();
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "tide-prerender-"));
const results = [];

for (const page of meta.pages) {
  if (page.hidden) {
    results.push(`${page.path} hidden -> skipped`);
    continue;
  }
  const routePath = page.path === "/" ? "/" : `${page.path}/`;
  const target = targetFor(page.path);
  try {
    const dom = await capture(chrome, routePath, profileDir);
    const markup = extractRootMarkup(dom);
    if (!markup) {
      results.push(`${page.path} skipped (no rendered markup)`);
      continue;
    }
    const html = fs.readFileSync(target, "utf8");
    const updated = replaceRoot(html, markup);
    if (!updated) {
      results.push(`${page.path} skipped (root container not found)`);
      continue;
    }
    fs.writeFileSync(target, updated, "utf8");
    results.push(`${page.path} -> ${markup.length} chars of static content`);
  } catch (error) {
    results.push(`${page.path} failed: ${error.message.split("\n")[0]}`);
  }
}

// 404.html gets the real "not found" markup so hidden or mistyped URLs never flash the home page.
try {
  const dom = await capture(chrome, "/tide-page-not-found/", profileDir);
  const markup = extractRootMarkup(dom);
  const notFoundPath = path.join(repoRoot, "404.html");
  if (markup) {
    const notFoundHtml = fs.readFileSync(notFoundPath, "utf8");
    const updated = replaceRoot(notFoundHtml, markup);
    if (updated) {
      fs.writeFileSync(notFoundPath, updated, "utf8");
      results.push("404.html -> not found markup");
    }
  }
} catch (error) {
  results.push(`404.html skipped: ${error.message.split("\n")[0]}`);
}

server.close();
fs.rmSync(profileDir, { recursive: true, force: true });

console.log("Prerender results:");
for (const line of results) console.log(`  - ${line}`);
