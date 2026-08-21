import fs from "node:fs";
import path from "node:path";

const pagesDir = path.resolve("client/src/pages");
const files = fs.readdirSync(pagesDir).filter((name) => name.endsWith(".tsx") && name !== "NotFound.tsx");
const rows = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(pagesDir, file), "utf8");
  const managed = [...content.matchAll(/managed\.get\(\s*["'`]([^"'`]+)["'`]\s*,\s*["'`]([^"'`]+)["'`]/g)];
  for (const match of managed) rows.push({ page: file.replace(/\.tsx$/, ""), slot: match[1], source: match[2], type: "managed" });
  const img = [...content.matchAll(/<img[^>]+src=["'`]([^"'`]+)["'`][^>]*>/g)];
  for (const match of img) rows.push({ page: file.replace(/\.tsx$/, ""), slot: "inline-img", source: match[1], type: "inline" });
}
const grouped = new Map();
for (const row of rows) {
  if (!grouped.has(row.source)) grouped.set(row.source, []);
  grouped.get(row.source).push(row);
}
const lines = ["# Public Image Slot Audit", "", "| Page | Slot | Source | Type | Repeat count |", "|---|---|---|---|---:|"];
for (const row of rows.sort((a, b) => `${a.page}-${a.slot}`.localeCompare(`${b.page}-${b.slot}`))) {
  const count = grouped.get(row.source).length;
  lines.push(`| ${row.page} | ${row.slot} | ${row.source} | ${row.type} | ${count} |`);
}
lines.push("", "## Repeated resources", "", "| Source | Count | Locations |", "|---|---:|---|");
for (const [source, locations] of [...grouped.entries()].filter(([, locations]) => locations.length > 1).sort((a, b) => b[1].length - a[1].length)) {
  lines.push(`| ${source} | ${locations.length} | ${locations.map((item) => `${item.page}:${item.slot}`).join(", ")} |`);
}
fs.writeFileSync("docs/public-image-slot-audit.md", `${lines.join("\n")}\n`);
console.log(`Audited ${rows.length} image slots across ${files.length} public page files; ${[...grouped.values()].filter((items) => items.length > 1).length} repeated sources found.`);
