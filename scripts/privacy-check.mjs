import { readdir, readFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const allowedExtensions = new Set(["", ".json", ".md", ".mjs", ".svg", ".yml", ".yaml"]);
const ignored = new Set([".git", "node_modules"]);
const forbidden = [
  { label: "chiave privata", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { label: "service role Supabase", pattern: /SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*\S+/ },
  { label: "token bearer", pattern: /Authorization\s*:\s*Bearer\s+[A-Za-z0-9._-]{20,}/i },
  { label: "percorso home locale", pattern: /\/(?:Users|home)\/[A-Za-z0-9._-]+\// },
  { label: "JWT", pattern: /eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/ }
];

async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await files(path));
    else if (allowedExtensions.has(extname(entry.name))) result.push(path);
  }
  return result;
}

const findings = [];
for (const path of await files(root)) {
  if (path.endsWith("scripts/privacy-check.mjs")) continue;
  const localPath = relative(root, path);
  if (localPath.split("/").some((part) => part === ".env" || part.startsWith(".env."))) {
    findings.push(`${localPath}: file ambiente`);
    continue;
  }
  const content = await readFile(path, "utf8");
  for (const rule of forbidden) {
    if (rule.pattern.test(content)) findings.push(`${localPath}: ${rule.label}`);
  }
}

if (findings.length) {
  console.error("Controllo privacy fallito:\n" + findings.join("\n"));
  process.exit(1);
}

console.log("Controllo privacy superato: nessun segreto o percorso personale rilevato.");
