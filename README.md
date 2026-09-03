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

## Scritture verificabili

Per il riquadro «Aggiornamento» di clienti e progetti usa `publish_entity_update` (semaforo `health` e sintesi `summary` obbligatori, `blockers` e `next_steps` opzionali): è la stessa scrittura del pannello della web app e risponde `recognized_by_ui: true` con `valid_until`. `update_entity_state` con il solo `content` salva una versione che la scheda non mostra e lo dichiara in `warnings[state_not_recognized_by_ui]`. Gli `update_*` di task, cliente, progetto, meeting e preventivo restituiscono `changed_fields` con le sole colonne cambiate davvero (`meta.changed_fields_source: verified`); per azzerare un campo passa `null` esplicito. Gli stati task `blocked`, `next` e `backlog` sono alias convertiti e segnalati in `warnings[status_alias]`.

## Risposte e paginazione

`structuredContent` porta solo l'envelope: il risultato è in `data`, versione e paginazione in `meta`, accanto `warnings`, `changed_fields` e `next_actions`; le chiavi storiche duplicate accanto a `data` non ci sono più (`?envelope=legacy` sull'endpoint le ripristina). Ogni `list_*` e `get_*` accetta `verbosity` — `standard` (default) nelle liste tronca i testi a 280 caratteri, riassume la checklist e omette i blob; `full` riga intera; `compact` solo campi chiave — e `fields` (CSV dei campi voluti); ogni taglio è in `warnings[fields_omitted]`. Le liste espongono `meta.page`, `has_more` e `next_cursor`; `total_matches` è il totale vero per task, clienti, progetti, lead, meeting, fatture e preventivi, altrove la finestra è di 200 righe e `meta.window_saturated: true` dice che il totale non è noto: restringi i filtri.

## Effetti delle scritture

Le scritture producono gli stessi effetti della web app. `create_task`, `update_task`, `assign_task` e `set_task_responsible` notificano gli assegnatari nuovi e rispondono `notifications {requested, status}`; `add_task_comment` avvisa partecipanti e menzionati (formato `@[Nome](member:uuid)`) e riporta i conteggi. `create_meeting` pianifica i reminder al contatto del cliente; `cancel_meeting` cancella l'evento Google, salta i reminder e avvisa i contatti; `delete_meeting` cancella prima su Google (`delete_from_google`, default true) e, se fallisce, lascia il meeting. `accept_quote` converte l'opportunità e promuove il lead a cliente: `update_quote` non accetta `status: accepted` e non riapre un preventivo accettato. Gli orari di lavoro accettano `{version: 1, days: {...}}` e la forma piatta, e `set_my_work_availability` è self-service anche per i collaboratori.

## Ricerca per nome

`search` copre clienti, progetti, task, meeting, preventivi e playbook con id tipizzati (`client:<uuid>`, `task:<uuid>`, …) e URL della web app; `fetch` legge l'elemento dal suo id tipizzato. `list_tasks` espone `assignee_ids` e `responsible_ids`; `list_clients` esclude i lead salvo `include_leads: true` o `status: "lead"`; `list_leads.stage` usa gli stage reali (`new`, `qualification`, `negotiation`, `won`, `lost`); `get_dashboard_stats` conta solo i progetti `planning`, `active`, `paused` e i lead della pipeline. Un campo chiesto con `fields` che non esiste finisce in `warnings[fields_unknown]`. `search` e `fetch` sono visibili a ogni token (lo scope decide quali entità entrano); nei `get_*` la proiezione con `fields` colpisce l'entità e non gli array collegati; `verbosity: "compact"` conserva `assignee_ids`; `get_client_health` conta i progetti come la scheda cliente.

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
