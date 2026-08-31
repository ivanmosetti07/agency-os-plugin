# Agency OS Plugin

Marketplace privato multipiattaforma per usare l'MCP Agency OS da ChatGPT, Codex e Claude Code. Il pacchetto collega l'endpoint remoto autenticato e aggiunge una skill operativa con copertura dichiarata, redazione alla frontiera, approvazione delle scritture e verifica post-mutazione.

## Struttura

- `.agents/plugins/marketplace.json`: marketplace ChatGPT/Codex.
- `.claude-plugin/marketplace.json`: marketplace Claude Code.
- `plugins/agency-os/.codex-plugin/plugin.json`: manifest ChatGPT/Codex.
- `plugins/agency-os/.claude-plugin/plugin.json`: manifest Claude Code.
- `plugins/agency-os/.mcp.json`: unica configurazione MCP condivisa.
- `plugins/agency-os/.app.json`: collegamento alla connessione ChatGPT già registrata.
- `plugins/agency-os/skills/agency-os-operations`: workflow operativo condiviso.
- `contract/mcp-contract.json`: contratto di allineamento col catalogo server.

## Installazione Codex

Autenticati a GitHub con un account autorizzato alla repository privata, quindi aggiungi il marketplace:

```bash
codex plugin marketplace add ivanmosetti07/agency-os-plugin --ref main
```

Apri `/plugins`, seleziona il marketplace **Agency OS** e installa il plugin. Avvia una nuova sessione per caricare skill e tool.

## Installazione Claude Code

```text
/plugin marketplace add ivanmosetti07/agency-os-plugin
/plugin install agency-os@agency-os
```

Completa l'OAuth Agency OS quando richiesto. Il repository non contiene password, token o chiavi API.

## Verifica

```bash
npm run check
node scripts/check-alignment.mjs --source /percorso/alla/checkout/Agency-OS
```

Il secondo comando confronta endpoint, versione, fingerprint e numero di tool con il catalogo della checkout sorgente. Vedi [docs/ALLINEAMENTO.md](docs/ALLINEAMENTO.md) prima di pubblicare modifiche all'MCP o al plugin.

## Privacy

Il pacchetto contiene soltanto configurazione pubblicabile, documentazione generica e identificativi tecnici non segreti. Non inserire nomi di clienti, percorsi personali, ID tenant, fotografie operative, snapshot, importi, token o variabili d'ambiente.

Licenza proprietaria. Uso riservato agli utenti autorizzati di Agency OS.
