#!/usr/bin/env node
/**
 * SEO build step for the Tide site.
 *
 * 1. Reads the freshly built SPA shell from dist/public/index.html
 * 2. Writes one static HTML file per route with its own <title>, description,
 *    canonical URL and social preview tags
 * 3. Writes sitemap.xml and copies robots.txt
 * 4. Syncs everything (plus assets) into the repository root that GitHub Pages serves
 *
 * Usage: node scripts/seo-inject.mjs   (run after `pnpm exec vite build`)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(projectRoot, "..");
const distDir = path.join(projectRoot, "dist", "public");

const meta = JSON.parse(fs.readFileSync(path.join(projectRoot, "shared", "pageMeta.json"), "utf8"));
const MARK_START = "<!-- seo:meta:start -->";
const MARK_END = "<!-- seo:meta:end -->";

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const urlFor = (routePath) => (routePath === "/" ? `${meta.siteUrl}/` : `${meta.siteUrl}${routePath}/`);
const fileFor = (routePath) =>
  routePath === "/" ? "index.html" : path.join(routePath.replace(/^\//, ""), "index.html");

const notFoundPage = {
  path: "/404",
  title: "Page not found | TIDE Peptide Laboratory",
  description: "The page you requested could not be found. Browse Tide's peptide products, COA reports, manufacturing capability or contact the team.",
  noindex: true,
};

function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${meta.siteUrl}/#organization`,
        name: meta.siteName,
        alternateName: "TIDE",
        url: `${meta.siteUrl}/`,
        logo: `${meta.siteUrl}${meta.logo}`,
        email: "tidepeptide@outlook.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Guangzhou",
          addressRegion: "Guangdong",
          addressCountry: "CN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+852-6615-3262",
            email: "tidepeptide@outlook.com",
            availableLanguage: ["English", "Chinese"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${meta.siteUrl}/#website`,
        url: `${meta.siteUrl}/`,
        name: meta.siteName,
        inLanguage: "en",
        publisher: { "@id": `${meta.siteUrl}/#organization` },
      },
    ],
  };
}

function headBlock(page) {
  const url = urlFor(page.path);
  const image = `${meta.siteUrl}${meta.defaultImage}`;
  const lines = [];

  if (page.noindex) {
    lines.push('<meta name="robots" content="noindex, follow" />');
  } else {
    lines.push(`<link rel="canonical" href="${esc(url)}" />`);
    lines.push('<meta name="robots" content="index, follow, max-image-preview:large" />');
  }

  lines.push('<meta property="og:type" content="website" />');
  lines.push(`<meta property="og:site_name" content="${esc(meta.siteName)}" />`);
  lines.push(`<meta property="og:locale" content="en_US" />`);
  lines.push(`<meta property="og:title" content="${esc(page.title)}" />`);
  lines.push(`<meta property="og:description" content="${esc(page.description)}" />`);
  lines.push(`<meta property="og:url" content="${esc(url)}" />`);
  lines.push(`<meta property="og:image" content="${esc(image)}" />`);
  lines.push('<meta name="twitter:card" content="summary_large_image" />');
  lines.push(`<meta name="twitter:title" content="${esc(page.title)}" />`);
  lines.push(`<meta name="twitter:description" content="${esc(page.description)}" />`);
  lines.push(`<meta name="twitter:image" content="${esc(image)}" />`);

  if (page.path === "/") {
    lines.push(`<script type="application/ld+json">${JSON.stringify(structuredData())}</script>`);
  }

  return lines.map((line) => `    ${line}`).join("\n");
}

function renderPage(template, page) {
  let html = template.split(MARK_START).join(MARK_START);
  html = html.replace(new RegExp(`${MARK_START}[\\s\\S]*?${MARK_END}`, "g"), "");
  html = html.replace(/<html[^>]*>/i, '<html lang="en">');
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)}</title>`);

  const descriptionTag = `<meta name="description" content="${esc(page.description)}" />`;
  if (/<meta\s+name="description"[^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name="description"[^>]*>/i, descriptionTag);
  } else {
    html = html.replace(/<\/title>/i, `</title>\n    ${descriptionTag}`);
  }

  return html.replace(/<\/head>/i, `    ${MARK_START}\n${headBlock(page)}\n    ${MARK_END}\n  </head>`);
}

function sitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = pages
    .filter((page) => !page.noindex && !page.hidden)
    .map((page) =>
      [
        "  <url>",
        `    <loc>${esc(urlFor(page.path))}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        "    <changefreq>monthly</changefreq>",
        `    <priority>${page.path === "/" ? "1.0" : "0.8"}</priority>`,
        "  </url>",
      ].join("\n"),
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function syncDirectory(source, target) {
  if (!fs.existsSync(source)) return 0;
  fs.mkdirSync(target, { recursive: true });
  let copied = 0;
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copied += syncDirectory(from, to);
      continue;
    }
    const needsCopy = !fs.existsSync(to) || fs.statSync(from).size !== fs.statSync(to).size;
    if (needsCopy) {
      fs.copyFileSync(from, to);
      copied += 1;
    }
  }
  return copied;
}

const templatePath = path.join(distDir, "index.html");
if (!fs.existsSync(templatePath)) {
  console.error(`Missing build output at ${templatePath}. Run "pnpm exec vite build" first.`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const written = [];

for (const page of meta.pages) {
  if (page.hidden) {
    const stale = path.join(repoRoot, fileFor(page.path));
    if (fs.existsSync(stale)) {
      fs.rmSync(stale);
      written.push(`removed ${path.relative(repoRoot, stale).split(path.sep).join("/")}`);
    }
    continue;
  }

  const html = renderPage(template, page);
  const targets = [path.join(repoRoot, fileFor(page.path))];
  if (page.path === "/") targets.push(path.join(repoRoot, "404.html"));
  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const content = target.endsWith("404.html") ? renderPage(template, notFoundPage) : html;
    fs.writeFileSync(target, content, "utf8");
    written.push(path.relative(repoRoot, target).split(path.sep).join("/"));
  }
}

const sitemapXml = sitemap(meta.pages);
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.join(repoRoot, "sitemap.xml"), sitemapXml, "utf8");
written.push("sitemap.xml");

const robotsSource = path.join(distDir, "robots.txt");
if (fs.existsSync(robotsSource)) {
  fs.copyFileSync(robotsSource, path.join(repoRoot, "robots.txt"));
  written.push("robots.txt");
}

const copiedAssets = syncDirectory(path.join(distDir, "assets"), path.join(repoRoot, "assets"));
for (const extra of ["favicon.ico", "__manus__", "llms.txt"]) {
  const from = path.join(distDir, extra);
  const to = path.join(repoRoot, extra);
  if (!fs.existsSync(from)) continue;
  if (fs.statSync(from).isDirectory()) syncDirectory(from, to);
  else if (!fs.existsSync(to) || fs.statSync(from).size !== fs.statSync(to).size) fs.copyFileSync(from, to);
}

console.log(`SEO files written (${written.length}):`);
for (const file of written) console.log(`  - ${file}`);
console.log(`Assets copied: ${copiedAssets}`);
