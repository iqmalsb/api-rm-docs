#!/usr/bin/env node
/**
 * convert-tables.js
 *
 * Modes:
 *   node convert-tables.js            → dry run
 *   node convert-tables.js --write    → convert + backup
 *   node convert-tables.js --restore  → restore from backup
 */

const fs = require("fs");
const path = require("path");

const WRITE = process.argv.includes("--write");
const RESTORE = process.argv.includes("--restore");

const SCAN_DIRS = ["./docs", "./docs_internal"];
const BACKUP_DIR = "./.backup";

const TRIGGER_KEYWORDS = [
  "details",
  "request parameter",
  "response parameter",
];

// ─── File collection ─────────────────────────────────────────────────────────

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectFiles(full));
    else if (/\.(mdx?)$/.test(entry.name)) results.push(full);
  }
  return results;
}

// ─── Backup system ───────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function backupFile(file) {
  const rel = path.relative(process.cwd(), file);
  const dest = path.join(BACKUP_DIR, rel);

  ensureDir(path.dirname(dest));

  if (!fs.existsSync(dest)) {
    fs.copyFileSync(file, dest);
  }
}

function restoreFiles() {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log("❌ No backup folder found.");
    return;
  }

  const files = collectFiles(BACKUP_DIR);

  let restored = 0;

  for (const file of files) {
    const rel = path.relative(BACKUP_DIR, file);
    const dest = path.join(process.cwd(), rel);

    ensureDir(path.dirname(dest));
    fs.copyFileSync(file, dest);
    restored++;
  }

  console.log(`\n♻️  Restored ${restored} files from backup.\n`);
}

// ─── Table parser ─────────────────────────────────────────────────────────────

function parseRow(line) {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

function cleanCell(str) {
  return str
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

function parseMarkdownTable(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|"));

  if (lines.length < 3) return null;

  const headers = parseRow(lines[0]).map((h) => h.toLowerCase().trim());
  const dataLines = lines.slice(2);

  const col = {
    name: headers.findIndex((h) => h.includes("param") || h === "field" || h === "name" || h === "key"),
    type: headers.findIndex((h) => h === "type"),
    required: headers.findIndex((h) => h.includes("required") || h === "req"),
    description: headers.findIndex((h) => h.includes("desc")),
    example: headers.findIndex((h) => h.includes("example") || h.includes("value")),
  };

  if (col.name === -1) return null;

  const rows = dataLines.map((line) => {
    const cells = parseRow(line);
    const row = {};

    row.name = cleanCell(cells[col.name] ?? "");
    if (!row.name) return null;

    if (col.type !== -1) row.type = cleanCell(cells[col.type] ?? "");
    if (col.required !== -1)
      row.required = /yes|true|required/i.test(cleanCell(cells[col.required] ?? ""));
    if (col.description !== -1)
      row.description = cleanCell(cells[col.description] ?? "");

    if (col.example !== -1) {
      const ex = cleanCell(cells[col.example] ?? "");
      if (ex) row.example = ex;
    }

    return row;
  }).filter(Boolean);

  return rows.length ? rows : null;
}

// ─── JSX builder ─────────────────────────────────────────

function rowToJSX(row) {
  const parts = [`name: ${JSON.stringify(row.name)}`];
  if (row.type) parts.push(`type: ${JSON.stringify(row.type)}`);
  if (row.required) parts.push(`required: true`);
  if (row.description) parts.push(`description: ${JSON.stringify(row.description)}`);
  if (row.example) parts.push(`example: ${JSON.stringify(row.example)}`);
  return `{ ${parts.join(", ")} }`;
}

function buildParamTable(title, rows) {
  const rowsStr = rows.map((r) => `    ${rowToJSX(r)}`).join(",\n");
  return `<ParamTable\n  title=${JSON.stringify(title)}\n  rows={[\n${rowsStr}\n  ]}\n/>`;
}

// ─── Helpers ─────────────────────────────────────────────

function inferTitle(summaryText) {
  const l = summaryText.toLowerCase();
  if (l.includes("response")) return "Response Parameters";
  if (l.includes("request")) return "Request Parameters";
  return "Details";
}

function getSummaryText(block) {
  const m = block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
  if (!m) return "";
  return m[1].replace(/<[^>]+>/g, "").trim();
}

function isTrigger(summaryText) {
  const l = summaryText.toLowerCase();
  return TRIGGER_KEYWORDS.some((kw) => l.includes(kw));
}

// ─── Core processor ──────────────────────────────────────

function processContent(content) {
  let count = 0;
  let result = content;
  let changed = true;

  while (changed) {
    changed = false;

    result = result.replace(
      /<details([^>]*)>([\s\S]*?)<\/details>/gi,
      (match, attrs, inner) => {
        if (/<details/i.test(inner)) return match;

        const summary = getSummaryText(match);
        if (!isTrigger(summary)) return match;

        const rows = parseMarkdownTable(inner);
        if (!rows) return match;

        const title = inferTitle(summary);
        count++;
        changed = true;
        return buildParamTable(title, rows);
      }
    );
  }

  result = result.replace(
    /<details([^>]*)>([\s\S]*?)<\/details>/gi,
    (match, attrs, inner) => {
      const summary = getSummaryText(match);
      if (!isTrigger(summary)) return match;

      if (inner.includes("<ParamTable")) {
        const tables = inner.match(/<ParamTable[\s\S]*?\/>/g);
        if (tables) {
          count++;
          return tables.join("\n\n");
        }
      }

      const rows = parseMarkdownTable(inner);
      if (!rows) return match;

      const title = inferTitle(summary);
      count++;
      return buildParamTable(title, rows);
    }


  );

  // ─── CLEANUP: remove orphan <details> tags ───────────────────
  result = result
    .replace(/<\/details>/gi, "")
    .replace(/<details[^>]*>/gi, "")
    .replace(/<summary[^>]*>[\s\S]*?<\/summary>/gi, "");

  return { newContent: result, count };
}

// ─── MAIN ───────────────────────────────────────────────

if (RESTORE) {
  restoreFiles();
  process.exit(0);
}

const files = SCAN_DIRS.flatMap(collectFiles);

console.log(`\n📂  Scanning: ${SCAN_DIRS.join(", ")}`);
console.log(`📄  Found ${files.length} files`);
console.log(`✏️   Mode: ${WRITE ? "WRITE (with backup)" : "DRY RUN"}\n`);

let totalFiles = 0;
let totalTables = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const { newContent, count } = processContent(original);

  if (count === 0) continue;

  totalFiles++;
  totalTables += count;

  const rel = path.relative(process.cwd(), file);
  console.log(`✅  ${rel} (${count} tables)`);

  if (WRITE) {
    backupFile(file); // 🔥 BACKUP FIRST
    fs.writeFileSync(file, newContent, "utf8");
  }
}

console.log("─".repeat(50));
console.log(`📊 Files affected: ${totalFiles}`);
console.log(`📊 Tables converted: ${totalTables}`);

if (!WRITE) {
  console.log(`\n⚠️ DRY RUN — nothing written. Use --write\n`);
}