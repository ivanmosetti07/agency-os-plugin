import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = resolve(root, "plugins/agency-os");

async function json(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const contract = await json(resolve(root, "contract/mcp-contract.json"));
const mcp = await json(resolve(pluginRoot, ".mcp.json"));
const app = await json(resolve(pluginRoot, ".app.json"));
const codex = await json(resolve(pluginRoot, ".codex-plugin/plugin.json"));
const claude = await json(resolve(pluginRoot, ".claude-plugin/plugin.json"));
const codexMarketplace = await json(resolve(root, ".agents/plugins/marketplace.json"));
const claudeMarketplace = await json(resolve(root, ".claude-plugin/marketplace.json"));

const server = mcp.mcpServers?.["agency-os"];
assert(server?.type === "http", "Il server MCP deve usare Streamable HTTP.");
assert(server.url === contract.endpoint, "Endpoint MCP non allineato al contratto.");
assert(server.oauth_resource === contract.oauth_resource, "OAuth resource non allineata al contratto.");
assert(codex.name === "agency-os" && claude.name === "agency-os", "I manifest devono condividere il nome agency-os.");
assert(codex.version === claude.version, "Le versioni Claude e Codex devono coincidere.");
assert(codex.mcpServers === "./.mcp.json" && claude.mcpServers === "./.mcp.json", "Entrambi i manifest devono usare lo stesso .mcp.json.");
assert(codex.apps === "./.app.json", "Il manifest Codex deve collegare .app.json.");
assert(/^asdk_app_[a-z0-9]+$/.test(app.apps?.["agency-os"]?.id ?? ""), "ID app ChatGPT assente o non valido.");
assert(codexMarketplace.plugins?.[0]?.source?.path === "./plugins/agency-os", "Marketplace Codex non allineato.");
assert(claudeMarketplace.plugins?.[0]?.source === "./plugins/agency-os", "Marketplace Claude non allineato.");

const sourceIndex = process.argv.indexOf("--source");
if (sourceIndex !== -1) {
  const sourceRoot = process.argv[sourceIndex + 1];
  assert(sourceRoot, "--source richiede il percorso del repository Agency OS.");
  const snapshot = await json(resolve(sourceRoot, "mcp-server/catalog-snapshot.json"));
  const sourceContract = await json(resolve(sourceRoot, "mcp-server/plugin-contract.json"));
  for (const key of ["catalog_version", "server_version", "fingerprint", "tool_count"]) {
    assert(contract[key] === snapshot[key], `Contratto plugin divergente dal catalogo: ${key}.`);
    assert(sourceContract[key] === snapshot[key], `Contratto sorgente divergente dal catalogo: ${key}.`);
  }
  assert(contract.toolset_count === Object.keys(snapshot.toolsets).length, "Numero toolset divergente dal catalogo.");
  assert(sourceContract.toolset_count === Object.keys(snapshot.toolsets).length, "Numero toolset del contratto sorgente non valido.");
  assert(sourceContract.endpoint === contract.endpoint, "Endpoint diverso tra repository sorgente e plugin.");
  assert(sourceContract.plugin_repository === contract.plugin_repository, "Repository plugin diverso tra i contratti.");
}

console.log(`Allineamento verificato: Agency OS ${contract.catalog_version}, ${contract.tool_count} tool.`);
