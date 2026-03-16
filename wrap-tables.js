const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const DOCS_PATH = path.join(__dirname, "docs");

function isTableRow(line) {
    return line.trim().startsWith("|");
}

function isSeparatorRow(line) {
    return /^\|[\s\-:|]+\|/.test(line.trim());
}

function isTable(lines, i) {
    // A table needs at least a header row, separator row, and one data row
    if (!isTableRow(lines[i])) return false;
    if (i + 1 >= lines.length) return false;
    if (!isSeparatorRow(lines[i + 1])) return false;
    return true;
}

function getHeadingAbove(lines, tableStartIndex) {
    for (let i = tableStartIndex - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line === "") continue;
        const headingMatch = line.match(/^#{1,4}\s+(.+)/);
        if (headingMatch) return headingMatch[1].trim();
        // Stop searching if we hit something that's not a heading or blank
        break;
    }
    return "Details";
}

function isInsideNote(lines, tableStartIndex) {
    let depth = 0;
    for (let i = 0; i < tableStartIndex; i++) {
        if (lines[i].trim().startsWith(":::")) {
            if (lines[i].trim() === ":::") {
                depth = Math.max(0, depth - 1);
            } else {
                depth++;
            }
        }
    }
    return depth > 0;
}

function isInsideDetails(lines, tableStartIndex) {
    for (let i = tableStartIndex - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line === "<details>" || line === "<details open>") return true;
        if (line === "</details>") return false;
    }
    return false;
}

function processContent(content) {
    const lines = content.split("\n");
    const result = [];
    let i = 0;
    let changed = false;

    // Skip frontmatter
    let frontmatterEnd = 0;
    if (lines[0] && lines[0].trim() === "---") {
        for (let j = 1; j < lines.length; j++) {
            if (lines[j].trim() === "---") {
                frontmatterEnd = j;
                break;
            }
        }
    }

    while (i < lines.length) {
        // Don't process inside frontmatter
        if (i <= frontmatterEnd) {
            result.push(lines[i]);
            i++;
            continue;
        }

        if (isTable(lines, i) && !isInsideNote(lines, i) && !isInsideDetails(lines, i)) {
            const label = getHeadingAbove(lines, i);

            // Collect all table lines
            const tableLines = [];
            while (i < lines.length && isTableRow(lines[i])) {
                tableLines.push(lines[i]);
                i++;
            }

            // Wrap in details
            result.push("<details>");
            result.push(`<summary><strong>${label}</strong></summary>`);
            result.push("");
            tableLines.forEach((l) => result.push(l));
            result.push("");
            result.push("</details>");
            result.push("");
            changed = true;
        } else {
            result.push(lines[i]);
            i++;
        }
    }

    return { content: result.join("\n"), changed };
}

(async () => {
    const files = await glob(`${DOCS_PATH}/**/*.{md,mdx}`);
    let updated = 0;
    let skipped = 0;

    for (const filePath of files) {
        const raw = fs.readFileSync(filePath, "utf8");

        // Only process files with api: in frontmatter
        const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
        if (!fmMatch || !fmMatch[1].includes("api:")) {
            skipped++;
            continue;
        }

        const { content, changed } = processContent(raw);

        if (changed) {
            fs.writeFileSync(filePath, content, "utf8");
            console.log(`UPDATED: ${filePath}`);
            updated++;
        } else {
            skipped++;
        }
    }

    console.log(`\n✅ Done — ${updated} updated, ${skipped} skipped`);
})();