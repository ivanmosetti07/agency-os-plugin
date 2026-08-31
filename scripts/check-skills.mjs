import { readdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = resolve(root, "plugins/agency-os/skills");
const expected = [
  "agency-os-operations",
  "aggiorna-lavoro",
  "aggiorna-second-brain-para",
  "business",
  "cliente",
  "crea-second-brain-para",
  "daily-brief",
  "meeting",
  "ped-social",
  "preventivo",
  "progetto",
  "task"
];
const mcpSkills = new Set(expected.filter((name) => !name.includes("second-brain-para")));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function validateLinks(path, content) {
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+\.md)\)/g)].map((match) => match[1]);
  for (const link of links) {
    const target = resolve(dirname(path), link);
    await readFile(target, "utf8").catch(() => {
      throw new Error(`Riferimento non risolto in ${path}: ${link}`);
    });
  }
}

const found = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
assert(JSON.stringify(found) === JSON.stringify(expected), `Set di skill inatteso: ${found.join(", ")}`);

for (const name of expected) {
  const skillPath = resolve(skillsRoot, name, "SKILL.md");
  const metadataPath = resolve(skillsRoot, name, "agents/openai.yaml");
  const skill = await readFile(skillPath, "utf8");
  const metadata = await readFile(metadataPath, "utf8");
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
  assert(frontmatter, `${name}: frontmatter assente.`);
  assert(new RegExp(`^name: ${name}$`, "m").test(frontmatter[1]), `${name}: nome frontmatter divergente.`);
  assert(/^description: .{40,}$/m.test(frontmatter[1]), `${name}: descrizione non discriminante.`);
  assert(!skill.includes("[TODO:"), `${name}: placeholder residuo.`);
  assert(metadata.includes(`$${name}`), `${name}: default prompt non invoca la skill.`);
  assert(metadata.includes("allow_implicit_invocation: true"), `${name}: policy implicita assente.`);
  if (mcpSkills.has(name)) {
    assert(metadata.includes('value: "agency-os"'), `${name}: dipendenza MCP assente.`);
    assert(metadata.includes('url: "https://agency-os.it/mcp"'), `${name}: endpoint MCP assente.`);
  }
  await validateLinks(skillPath, skill);
}

console.log(`Skill verificate: ${expected.length}, metadati e riferimenti coerenti.`);
