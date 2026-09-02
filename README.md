# Agency OS Plugin

Marketplace privato multipiattaforma per usare l'MCP Agency OS da ChatGPT, Codex e Claude Code. Il pacchetto collega l'endpoint remoto autenticato e include skill per il lavoro operativo, il daily brief, la riconciliazione col vault e la gestione del second brain PARA.

La versione `1.3.1` è allineata al catalogo `2026-09-03.1` e al server contract `0.9.0`. Le operazioni Economics/Qonto mantengono sempre il confine agenzia–conto e trattano `qonto_id` come campo di sola lettura.

## Struttura

- `.agents/plugins/marketplace.json`: marketplace ChatGPT/Codex.
- `.claude-plugin/marketplace.json`: marketplace Claude Code.
- `plugins/agency-os/.codex-plugin/plugin.json`: manifest ChatGPT/Codex.
- `plugins/agency-os/.claude-plugin/plugin.json`: manifest Claude Code.
- `plugins/agency-os/.mcp.json`: unica configurazione MCP condivisa.
- `plugins/agency-os/.app.json`: collegamento alla connessione ChatGPT già registrata.
- `plugins/agency-os/skills/`: skill condivise da Claude e Codex.
- `contract/mcp-contract.json`: contratto di allineamento col catalogo server.

## Installazione Codex

Autenticati a GitHub con un account autorizzato alla repository privata, quindi aggiungi il marketplace:

```bash
codex plugin marketplace add ivanmosetti07/agency-os-plugin --ref main
```

Apri `/plugins`, seleziona il marketplace **Agency OS** e installa il plugin. Avvia una nuova sessione per caricare skill e tool.

## Installazione Claude Code

L'autorizzazione OAuth apre il browser: va completata **una volta da un terminale interattivo**. Le sessioni avviate da Cowork, da Claude Desktop o con `claude -p` non possono aprirlo: registrano il client e si fermano prima dell'autorizzazione, e il plugin resta senza token.

```text
claude
/plugin marketplace update agency-os
/plugin install agency-os@agency-os
/mcp   →  plugin:agency-os:agency-os  →  Authenticate
```

Il browser mostra la pagina di consenso di Agency OS e torna su `localhost`. Da lì in poi il token vale sette giorni e si rinnova da solo; un logout dalla web app non lo revoca. Il repository non contiene password, token o chiavi API.

L'aggiunta del marketplace non installa automaticamente il plugin: dopo il primo comando esegui sempre anche `/plugin install`. Dopo un aggiornamento delle skill, aggiorna il marketplace e il plugin e apri una nuova sessione per ricaricarle.

## Discovery

Il profilo compatto espone pochi tool nativi e tre esecutori. Per scoprire un tool: `search_tools` con parole chiave in italiano (task, cliente, preventivo, meeting, stato), poi `describe_tool` con il nome esatto — restituisce schema, esempio di chiamata, alias degli identificativi (`id` contro `task_id`) ed esecutore da usare, in una sola chiamata. `list_toolsets` mostra tutti i 31 domini in una pagina. I meta-tool accettano numeri e array anche serializzati come stringhe (`limit: "10"`, `names: "get_task,list_tasks"`), perché alcuni client non ricevono gli schemi. Il server dichiara inoltre `instructions` in `initialize` con le stesse convenzioni.

## Skill

Sono incluse `daily-brief`, `aggiorna-lavoro`, `task`, `progetto`, `cliente`, `business`, `preventivo`, `meeting`, `ped-social`, `crea-second-brain-para`, `aggiorna-second-brain-para` e la base `agency-os-operations`.

Ogni skill di entità spiega separatamente creazione e modifica. Prima di chiedere dati, legge schema, contesto ed entità collegate e precompila tutti i campi risolvibili. I soli obbligatori ancora mancanti vengono chiesti insieme, senza inventare ID, assegnatari, date, importi o condizioni. La guida completa è in [docs/USO-SKILL.md](docs/USO-SKILL.md).

## Verifica

```bash
npm run check
node scripts/check-alignment.mjs --source /percorso/alla/checkout/Agency-OS
```

Il secondo comando confronta endpoint, versione, fingerprint e numero di tool con il catalogo della checkout sorgente. Vedi [docs/ALLINEAMENTO.md](docs/ALLINEAMENTO.md) prima di pubblicare modifiche all'MCP o al plugin.

## Privacy

Il pacchetto contiene soltanto configurazione pubblicabile, documentazione generica e identificativi tecnici non segreti. Non inserire nomi di clienti, percorsi personali, ID tenant, fotografie operative, snapshot, importi, token o variabili d'ambiente.

Licenza proprietaria. Uso riservato agli utenti autorizzati di Agency OS.
