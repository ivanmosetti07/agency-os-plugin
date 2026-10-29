# Agency OS Plugin

Marketplace multipiattaforma per usare l'MCP Agency OS da ChatGPT, Codex e Claude Code. Il pacchetto collega l'endpoint remoto autenticato e include skill per il lavoro operativo, il daily brief, la riconciliazione col vault e la gestione del second brain PARA.

La versione `1.6.2` è allineata al catalogo `2026-09-30.1` e al server contract `0.14.1`. Le operazioni Economics/Qonto mantengono sempre il confine agenzia–conto e trattano `qonto_id` come campo di sola lettura.

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

Aggiungi il marketplace dal repository pubblico:

```bash
codex plugin marketplace add ivanmosetti07/agency-os-plugin --ref main
```

Apri `/plugins`, seleziona il marketplace **Agency OS** e installa il plugin. Avvia una nuova sessione per caricare skill e tool.

## Installazione Claude Code

L'autorizzazione OAuth apre il browser: va completata **una volta da un terminale interattivo**. Le sessioni avviate da Cowork, da Claude Desktop o con `claude -p` non possono aprirlo: registrano il client e si fermano prima dell'autorizzazione, e il plugin resta senza token.

```text
claude
/plugin marketplace add ivanmosetti07/agency-os-plugin
/plugin install agency-os@agency-os-plugin
/mcp   →  plugin:agency-os:agency-os  →  Authenticate
```

Il browser mostra la pagina di consenso di Agency OS e torna su `localhost`. Da lì in poi il token vale sette giorni e si rinnova da solo; un logout dalla web app non lo revoca. Il repository non contiene password, token o chiavi API.

L'aggiunta del marketplace non installa automaticamente il plugin: dopo il primo comando esegui sempre anche `/plugin install`. Per i marketplace non ufficiali l'aggiornamento automatico è spento: accendilo da `/plugin` → **Marketplaces** → `agency-os-plugin` → **Enable auto-update**. A mano: `claude plugin update agency-os@agency-os-plugin`, poi `/reload-plugins` o una nuova sessione.

Le stesse istruzioni, anche per claude.ai, ChatGPT e Codex, sono in Agency OS → Impostazioni → **Claude e ChatGPT**.

## Discovery

Il profilo compatto espone pochi tool nativi e tre esecutori. Per scoprire un tool: `search_tools` con parole chiave in italiano (task, cliente, preventivo, meeting, stato), poi `describe_tool` con il nome esatto — restituisce schema, esempio di chiamata, alias degli identificativi (`id` contro `task_id`) ed esecutore da usare, in una sola chiamata. `list_toolsets` mostra tutti i 31 domini in una pagina. I meta-tool accettano numeri e array anche serializzati come stringhe (`limit: "10"`, `names: "get_task,list_tasks"`), perché alcuni client non ricevono gli schemi. Il server dichiara inoltre `instructions` in `initialize` con le stesse convenzioni.

## Scritture verificabili

Lo stato di clienti e progetti (Top, In linea, A rischio) lo calcola Agency OS: `get_health` lo legge con motivi e segnali, `set_health` (solo admin) lo imposta a mano o lo riporta su `auto`. Per il riquadro «Aggiornamento» usa `publish_entity_update` (semaforo `health` di state.md e sintesi `summary` obbligatori, `blockers` e `next_steps` opzionali): è la stessa scrittura del pannello della web app, risponde `recognized_by_ui: true` e non cambia lo stato. `update_entity_state` con il solo `content` salva una versione che il pannello non mostra e lo dichiara in `warnings[state_not_recognized_by_ui]`. Gli `update_*` di task, cliente, progetto, meeting e preventivo restituiscono `changed_fields` con le sole colonne cambiate davvero (`meta.changed_fields_source: verified`); per azzerare un campo passa `null` esplicito. Gli stati task `blocked`, `next` e `backlog` sono alias convertiti e segnalati in `warnings[status_alias]`.

## Risposte e paginazione

`structuredContent` porta solo l'envelope: il risultato è in `data`, versione e paginazione in `meta`, accanto `warnings`, `changed_fields` e `next_actions`; le chiavi storiche duplicate accanto a `data` non ci sono più (`?envelope=legacy` sull'endpoint le ripristina). Ogni `list_*` e `get_*` accetta `verbosity` — `standard` (default) nelle liste tronca i testi a 280 caratteri, riassume la checklist e omette i blob; `full` riga intera; `compact` solo campi chiave — e `fields` (CSV dei campi voluti); ogni taglio è in `warnings[fields_omitted]`. Le liste espongono `meta.page`, `has_more` e `next_cursor`; `total_matches` è il totale vero per task, clienti, progetti, lead, meeting, fatture e preventivi, altrove la finestra è di 200 righe e `meta.window_saturated: true` dice che il totale non è noto: restringi i filtri.

## Effetti delle scritture

Le scritture producono gli stessi effetti della web app. `create_task`, `update_task`, `assign_task` e `set_task_responsible` notificano gli assegnatari nuovi e rispondono `notifications {requested, status}`; `add_task_comment` avvisa partecipanti e menzionati (formato `@[Nome](member:uuid)`) e riporta i conteggi. `create_meeting` pianifica i reminder al contatto del cliente; `cancel_meeting` cancella l'evento Google, salta i reminder e avvisa i contatti; `delete_meeting` cancella prima su Google (`delete_from_google`, default true) e, se fallisce, lascia il meeting. `accept_quote` converte l'opportunità e promuove il lead a cliente: `update_quote` non accetta `status: accepted` e non riapre un preventivo accettato. Gli orari di lavoro accettano `{version: 1, days: {...}}` e la forma piatta, e `set_my_work_availability` è self-service anche per i collaboratori.

## Ricerca per nome

`search` copre clienti, progetti, task, meeting, preventivi e playbook con id tipizzati (`client:<uuid>`, `task:<uuid>`, …) e URL della web app; `fetch` legge l'elemento dal suo id tipizzato. `list_tasks` espone `assignee_ids` e `responsible_ids`; `list_clients` esclude i lead salvo `include_leads: true` o `status: "lead"`; `list_leads.stage` usa gli stage reali (`new`, `qualification`, `negotiation`, `won`, `lost`); `get_dashboard_stats` conta solo i progetti `planning`, `active`, `paused` e i lead della pipeline. Un campo chiesto con `fields` che non esiste finisce in `warnings[fields_unknown]`. `search` e `fetch` sono visibili a ogni token (lo scope decide quali entità entrano); nei `get_*` la proiezione con `fields` colpisce l'entità e non gli array collegati; `verbosity: "compact"` conserva `assignee_ids`; `get_client_health` conta i progetti come la scheda cliente.

## Skill

Sono incluse `daily-brief`, `aggiorna-lavoro`, `task`, `progetto`, `cliente`, `business`, `preventivo`, `meeting`, `ped-social`, `report-cliente`, `strategia`, `crea-second-brain-para`, `aggiorna-second-brain-para` e la base `agency-os-operations`.

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

## Aggiornamento 1.6.0

Allineato al catalogo MCP 2026-09-23.1 (server 0.14.0, 350 tool).
- Gli input dei tool sono rigidi: un campo non previsto restituisce un errore invece di sparire.
- Gli argomenti degli executor vanno dentro `arguments`; quelli fuori vengono spostati con un avviso.
- Nuovo `get_task_history` per la cronologia delle modifiche fatte da UI, MCP e sistema.
- Brand Identity e Analisi di Mercato si ripuliscono con `mode`, `remove_paths` e `prune_legacy`; i campi legacy non visibili in UI accettano solo `null`.
- Le opportunità si vincono solo con `accept_quote`.
- Le liste dichiarano nel testo se ci sono altre pagine.

## Aggiornamento 1.5.1

Riconciliazione secondo la fonte principale scelta dall’utente; viste PARA leggere e datate. Daily brief e chiusura sessione rispettano le autorizzazioni già concesse per operazioni certe, verificano le scritture e pongono domande esplicite sui dubbi. Il default resta lettura e proposta quando manca una delega esplicita.

## Aggiornamento 1.6.1 — Agency OS nella barra laterale di ChatGPT

Allineato al catalogo MCP `2026-09-30.1` (server `0.14.1`, 350 tool). Il tool `render_task_workbench` dichiara l’apertura globale `Agency OS`: apre le task a schermo intero, con navigazione verso clienti, progetti, meeting, preventivi e piani editoriali quando autorizzati dal token e dal ruolo. Le risorse UI sono versionate v2. Il repository è pubblico; dati e operazioni restano protetti dal login e dai permessi Agency OS.

Per il plugin cloud personale già collegato, apri la sua scheda in ChatGPT, aggiorna la scansione dei tool e verifica la nuova voce Agency OS nella barra laterale. Non serve creare un secondo collegamento né pubblicare il plugin nella directory pubblica. Se ChatGPT richiede una nuova autorizzazione OAuth, completala con il tuo account Agency OS.

Specifica: [Sidebar apps](https://developers.openai.com/plugins/build/extensions#sidebar-apps).

## Aggiornamento 1.6.2 — Logo ufficiale e aggiornamenti GitHub

Il plugin usa il logo originale Agency OS, bianco e giallo su fondo nero, incluso nel pacchetto in `assets/logo.png`. Il marketplace segue il repository pubblico e il ramo `main`. Nei client locali aggiorna con `codex plugin marketplace upgrade agency-os-plugin` e apri una nuova sessione.

Nei workspace ChatGPT con pannello Admin, importa `https://github.com/ivanmosetti07/agency-os-plugin` da Admin → Plugins → Add → Import marketplace: percorso vuoto, ramo `main`. I nuovi marketplace prevedono sincronizzazione giornaliera e il comando Sync now. Per un plugin cloud personale il caricamento di una nuova versione resta distinto dalla sincronizzazione del marketplace locale; dopo modifiche ai tool, aggiorna anche la connessione MCP.

La sincronizzazione workspace richiede i permessi Admin e non equivale alla pubblicazione nella directory pubblica. Il pacchetto attuale include `.mcp.json`: i plugin importati con questa configurazione sono limitati al client desktop. Per il plugin web personale conserva la connessione all'app già registrata tramite `.app.json`.

Documentazione: [Gestione e sincronizzazione GitHub](https://developers.openai.com/codex/enterprise/plugin-management).

### Pacchetto cloud personale

`cloud/plugins/agency-os` conserva l’identità del plugin cloud esistente e il riferimento all’app registrata; usa il logo ufficiale e non dichiara server MCP locali, per mantenere l’uso web. Il marketplace dedicato si trova in `cloud/.agents/plugins/marketplace.json`: per importarlo da Admin usa Path `cloud`. Il caricamento manuale usa uno ZIP del contenuto di `cloud/plugins/agency-os`, con `.codex-plugin`, `.app.json` e `assets` alla radice. La connessione e i permessi dell’app restano quelli già configurati.

Verifica del plugin personale: il caricamento ZIP applica la versione e i testi; il successivo comando Aggiorna strumenti può rigenerare il pacchetto predefinito. Dopo la scansione ricarica quindi il pacchetto cloud. La visualizzazione del logo nella scheda personale resta da verificare, anche quando l’immagine è inclusa correttamente. Il pacchetto cloud include le 12 skill e il manifest portabile `plugin.json`.

## Aggiornamento 1.6.3 — Icona dell’apertura globale

Allineato al catalogo `2026-09-30.2`, server `0.14.2`. Il tool che apre Agency OS dichiara il logo ufficiale nel campo MCP `icons`, come previsto dalla specifica delle aperture globali. Aggiorna gli strumenti della connessione ChatGPT dopo il deploy per ricaricare l’icona.

## Aggiornamento 1.6.4 — Workbench task in ChatGPT

Allineato al catalogo `2026-09-30.3`, server `0.14.3`. Il pannello task offre tabella ordinabile, board per stato, calendario di pianificazione/scadenze, filtri condivisi e dettaglio con report obbligatorio per completare. Le task sono caricate automaticamente in pagine da 200 entro i permessi correnti. Gli indirizzi v1/v2 continuano a servire la nuova UI.

Nel plugin personale ChatGPT, **Aggiorna strumenti** rigenera il pacchetto MCP e può riportarne la versione a `1.0.0`. Questo numero è distinto dal servizio Agency OS: per ricaricare il workbench è sufficiente chiudere e riaprire il pannello. Importare lo ZIP corrente ripristina versione e metadati del pacchetto personalizzato. Il comportamento del numero di versione generato da ChatGPT non è controllato dall’endpoint MCP.

Il workbench carica le pagine task tramite `execute_read_tool`: lo schema e i permessi vengono rivalidati dal servizio anche se ChatGPT mantiene il vecchio descrittore con limite 30.

## Aggiornamento 1.6.5 — Gestione tramite Plugin Creator

Il pacchetto cloud è stato accettato da Plugin Creator come plugin personale privato, distinto dal plugin generato direttamente dalla connessione MCP. Il plugin generato dall’app non è modificabile con Plugin Creator; il pacchetto personalizzato può invece ricevere nuove versioni con `update_plugin`, usando ID e release correnti restituiti dal connettore. L’aggiornamento conserva connessione, file omessi e pubblico esistente.

Logo ufficiale e 12 skill restano inclusi. I suggerimenti iniziali aprono le task, preparano il daily brief o creano una task; la skill task preferisce il workbench con tabella, board e calendario e gestisce gli schemi in cache e i caricamenti parziali. GitHub resta la fonte dei file: nel profilo personale gli aggiornamenti si applicano con Plugin Creator, non con una sincronizzazione automatica GitHub.

## Aggiornamento 1.6.6 — Ripristino della connessione MCP

La precedente app registrata rispondeva `Plugin not found`. Il pacchetto conserva identità e skill e punta alla nuova registrazione verificata sullo stesso endpoint OAuth `https://agency-os.it/mcp`. L'account è stato ricollegato tramite il flusso ChatGPT autorizzato dall'utente. Il sottotitolo rispetta il limite di 30 caratteri.

Il pannello 1.6.6 supporta il bridge compatibile ChatGPT per il caricamento dei metadati completi e l’aggiornamento delle task. Il contratto registra anche la revisione del bridge UI.

## Codex: installazione unica 1.7.4

Il pacchetto dedicato `codex/plugins/agency-os` contiene MCP HTTP con OAuth, le 12 skill e il logo. Non richiede una app ChatGPT né una seconda configurazione manuale del server. Il pacchetto Claude resta separato e invariato.

```sh
codex plugin marketplace add ivanmosetti07/agency-os-plugin
codex plugin add agency-os@agency-os-plugin
```

Per aggiornare dal repository GitHub:

```sh
codex plugin marketplace upgrade agency-os-plugin
codex plugin add agency-os@agency-os-plugin
```

Dopo aver verificato il plugin, disabilitare l'eventuale server Agency OS configurato manualmente e la precedente copia cloud in Codex. Le connessioni in ChatGPT e Claude restano indipendenti.

### Pannello task incorporato

La risorsa MCP task v4 apre la vista `/embed` della PWA Agency OS con selettore agenzia, vista aggregata, tabella, board, calendario settimanale e dettaglio task condivisi con l’app. Il primo accesso richiede «Collega Agency OS»; la sessione rimane in memoria nel dominio Agency OS. Le risorse precedenti e il pacchetto Claude restano invariati.

La policy iframe ammette anche l’origine predefinita OpenAI `web-sandbox.oaiusercontent.com`, oltre ai sottodomini isolati.

Il workspace incorporato autorizza il contenitore desktop `codex-sandbox://*.web-sandbox.oaiusercontent.com` oltre ai contenitori HTTPS di ChatGPT (contratto embed 2026-10-01.1).

## Aggiornamento 1.6.7 — PED: stato e media via MCP

Allineato al catalogo `2026-10-02.1`, server `0.14.4`. `set_editorial_plan_review_status` accetta anche `draft` e, per l'approvazione senza `reviewer_name`, registra il nome dell'utente collegato. La descrizione di `attach_editorial_plan_asset` riporta il flusso completo di caricamento dei media nei PED (`create_asset_upload` con `scope_type=editorial_plan`, PUT, `finalize_asset_upload`, collegamento alla scheda), ripristinato lato server dalla migrazione `20261003100000`. La skill `ped-social` distingue le schede del PED dai contenuti social e descrive caricamento media e cambio di stato.

## Aggiornamento 1.6.8 — progetti affidati senza switch_agency

Allineato al catalogo `2026-10-03.1`, server `0.14.5`. Chi lavora per un'agenzia partner resta nella propria agenzia anche via MCP: `list_projects`, `list_tasks`, `list_clients` e `list_editorial_plans` includono i dati affidati da altre agenzie (campo `shared_from`), e ogni tool che riceve l'identificativo di una task, un progetto, un cliente o un PED affidato lavora da solo nell'agenzia proprietaria. `list_my_agencies` e `whoami` elencano queste agenzie in `partner_workspaces`; `switch_agency` verso di esse non serve e non cambia contesto. Quanto creato sui progetti affidati resta a nome e con il branding dell'agenzia che li ha affidati. La skill operativa lo spiega nella sezione sulla copertura.

## Aggiornamento 1.6.9 — stato Top, In linea, A rischio

Allineato al catalogo `2026-10-03.2`, server `0.15.0` (352 tool). Lo stato di clienti e progetti ha tre valori (Top, In linea, A rischio) e lo calcola Agency OS da ritardi, scadenze, fasi bloccate, fatture scadute oltre 30 giorni, meeting e segnali positivi. Nuovi tool: `get_health`, che legge un'entità o l'elenco dal più a rischio con motivi, segnali ed eventuale stato manuale, e `set_health`, che imposta lo stato a mano ed è riservato agli admin. `publish_entity_update` resta l'aggiornamento narrativo e non cambia più lo stato: `valid_until` e `recognized_for_days` tornano `null`. Le skill cliente, progetto e business lo spiegano.

## Aggiornamento 1.7.0 — responsabili e assegnatari separati

Allineato al catalogo `2026-10-03.3`, server `0.16.0` (352 tool). Una task ha due ruoli indipendenti, ciascuno con più persone: assegnatari (`assignee_ids`, eseguono) e responsabili (`responsible_ids`, seguono e rispondono senza dover eseguire). `assign_task` accetta `role` (`assignee`, `responsible`, `both`) e `user_ids`; `unassign_task` accetta `role` (`all`, `assignee`, `responsible`); `set_task_responsible` non rende più esecutori; `update_task` sostituisce solo il ruolo passato. `list_tasks` e `get_task` restituiscono `assignee_ids`, `responsible_ids` e `people` con nome e ruolo, e filtrano con `assignee_id`, `responsible_id`, `only_mine` + `my_role`. `list_projects` filtra per `responsible_id` e `member_id`, `list_clients` per `responsible_id` e `assignee_id`. `owner_id` è il primo responsabile e in scrittura vale come `responsible_ids`. La skill task lo spiega.

## Pannello completo e sessione persistente — 1.8.0

`render_task_workbench` apre tutta Agency OS nel pannello di Codex. La risorsa v5 (e gli alias precedenti) usa le pagine reali dell’app, con sidebar, cambio agenzia, dettagli e permessi invariati. Il collegamento iniziale crea una sessione dedicata; cookie Secure, SameSite=None e Partitioned la conservano nel dominio Agency OS. La riapertura ripristina l’ultima pagina senza ripetere il collegamento. Il logout del browser non revoca la sessione dedicata. Il contenitore deve supportare i cookie partizionati.

Il rinnovo OAuth è valido anche dopo la scadenza dell’access token, finché il refresh di 30 giorni è valido. Errori temporanei di rete o limite di richieste non revocano la connessione. Revoca esplicita, refresh scaduto e riuso restano bloccanti. Catalogo `2026-10-05.1`, server `0.16.2`: le risposte degli strumenti dichiarano `data` in forma compatta, e l'elenco degli strumenti pesa circa il 15% in meno.

## Report cliente — 1.9.0

Allineato al catalogo `2026-10-07.1`, server `0.17.0` (371 tool). Agency OS consegna al cliente il report dei risultati con un link (`/report/<token>`), come il PED: dataset con fonte e data di rilevazione, blocchi (copertina, numeri, sintesi, sezioni per servizio, grafici, tabelle, «Prossimo passo», priorità, note, fonti), visite e presa visione del cliente. Nuovi tool nel toolset `kpi`: `list_client_reports`, `get_client_report`, `create_client_report` (dal report precedente, da un modello o vuoto), `update_client_report`, `upsert_client_report_dataset`, `delete_client_report_dataset`, `set_client_report_blocks`, `add_`/`update_`/`move_`/`delete_client_report_block`, `check_client_report`, `publish_client_report` (con `confirm: true`), `regenerate_`/`disable_client_report_public_link`, `create_client_report_pdf_export`, `list_client_report_templates`, `save_client_report_template` e `import_client_report_artifact`. La skill `report-cliente` guida la sequenza e le regole redazionali.

## Report cliente più leggibile — 1.9.1

Catalogo `2026-10-07.2`, server `0.17.1`. Le sezioni accettano `summary` (una frase per chi scorre) e `verdict` (`up`, `stable`, `watch`). Per il cliente i blocchi dello stesso servizio diventano un capitolo nel colore della piattaforma, con il dettaglio dietro «Leggi l'analisi»; le priorità salgono dopo la sintesi. La skill `report-cliente` descrive la nuova struttura.

## Pagine di cliente e progetto — 1.10.0

Catalogo `2026-10-11.1`, server `0.18.0` (376 tool). Ogni cliente e ogni progetto ha i suoi documenti: pagine libere (appunti, brief, verbali) con sotto-pagine su un livello, scritte con un editor a blocchi. Nuovi tool nel toolset della Knowledge: `list_document_pages` (per `client_id` o `project_id`), `get_document_page`, `create_document_page` (su cliente, progetto o dentro una pagina con `parent_id`), `update_document_page` (il contenuto HTML si sostituisce per intero: leggere prima la pagina) e `archive_document_page`. I permessi sono quelli del cliente o del progetto. Lo stato «Evergreen» delle task ora si legge «Senza scadenza».

## Agenti AI nel Team — 1.11.0

Catalogo `2026-10-19.1`, server `0.18.1` (376 tool). Un'agenzia può avere agenti AI (su ChatGPT o Claude) che lavorano come collaboratori sui clienti assegnati: si creano in Team → Agenti AI e si collegano aggiungendo il connettore e scegliendo «Collega come: Agente …» nella schermata di consenso. `whoami` dice all'agente che è un agente (`user.is_ai_agent`) e `list_team_members` segna gli agenti con `is_ai_agent`. Il token di un agente non riceve gli scope solo admin né `dangerous:write`. Ogni agente ha una chat manuale con chi lo gestisce (`metadata.ai_agent_id`) dove scrive segnalazioni, errori e report con `post_chat_message`. La skill `agency-os-operations` ha la sezione «Se sei un agente AI».

## Date delle task — 1.12.0

Catalogo `2026-10-22.1`, server `0.18.2` (376 tool). In `create_task` e `update_task` la scadenza `due_date` è solo una data (`YYYY-MM-DD`): Agency OS la salva come mezzanotte UTC del giorno di Roma e la task è in ritardo dal giorno dopo. La lavorazione (`calendar_date` → `calendar_date_end`) inizia e finisce nello stesso giorno: una fine in un altro giorno risponde «La lavorazione inizia e finisce nello stesso giorno». La skill `task` lo spiega; niente più 18:00 come ora di scadenza.

## Stati delle task e ripetizione — 1.13.0

Catalogo `2026-10-28.1`, server `0.18.3` (376 tool). Lo stato `evergreen` non esiste più: gli stati sono `todo`, `in_progress`, `waiting`, `done`, `cancelled`, e `create_task` senza stato crea una task `todo` (prima `evergreen`). `evergreen` e `backlog` restano accettati come alias di `todo`, segnalati in `warnings[status_alias]`. La ripetizione è un'impostazione della task (simbolo ↻ nell'app), non uno stato: completata una task che si ripete, Agency OS crea subito la successiva. La skill `task` lo spiega.

## Strategia cliente — 1.14.0

Catalogo `2026-10-28.2`, server `0.18.4` (400 tool). Agency OS manda al cliente una strategia di marketing (Black Friday, lanci, saldi) con un link (`/strategia/<token>`): quattro sezioni a blocchi (Strategia generale, Meta e creative, Sito, Email), commenti su sezioni o singoli elementi, «Approva» / «Richiedi modifiche». Nuovi tool nel toolset `kpi`: `list_client_strategies`, `get_client_strategy`, `create_client_strategy` (da modello, dalla precedente, vuota o da blocchi), `update_client_strategy`, `archive_client_strategy`, `set_client_strategy_review_status`, `set_client_strategy_blocks`, `add_`/`update_`/`move_`/`delete_client_strategy_block`, `upsert_`/`delete_client_strategy_item`, `import_meta_structure_to_strategy` e `import_meta_results_to_strategy` (dati letti con il connettore Meta Ads), `check_client_strategy`, `publish_client_strategy`, `regenerate_`/`disable_client_strategy_public_link`, `list_`/`reply_`/`resolve_client_strategy_feedback`, `list_client_strategy_templates` e `save_client_strategy_template`. Invio, link, stato e scritture che sostituiscono o tolgono blocchi chiedono `confirm: true`. La nuova skill `strategia` guida la sequenza.

## Pagina completa nella strategia — 1.14.1

Catalogo `2026-10-28.3`, server `0.18.5` (400 tool). I blocchi della strategia accettano `page` (`{title?, html}`): il documento già impaginato che il cliente vede identico sul link, con commenti e approvazione sopra. La skill `strategia` lo spiega.

## Strategia con l'aspetto del documento — 1.14.2

Catalogo `2026-10-29.1`, server `0.18.6` (400 tool). Le strategie create con i blocchi si vedono come il documento di strategia dell'agenzia, generato dal tema: niente HTML da scrivere. Campi facoltativi nuovi: `eyebrow` e `badge` sui blocchi con titolo, `explainer_title` nell'apertura, `media` nei brief, `periods`/`period_key` nelle campagne email. La skill `strategia` spiega l'ordine dei blocchi che compone il documento.

## Rubrica delle persone (CRM) — 1.14.3

Catalogo `2026-10-29.2`, server `0.18.7` (406 tool). Agency OS ha una rubrica delle persone dell'agenzia (Risorse → Contatti), collegate a clienti e progetti con il ruolo nel rapporto e il contatto principale; non sono utenti dell'app. Nuovi tool nel toolset `clients`: `list_crm_people`, `get_crm_person`, `upsert_crm_person` (una persona per email: se esiste già e c'è un collegamento si collega quella), `link_crm_person`, `unlink_crm_person` e `archive_crm_person`. La skill `cliente` spiega come cercare prima di creare.

## Contatti dei clienti nella rubrica — 1.14.4

Catalogo `2026-10-29.3`, server `0.18.8` (406 tool). I referenti scritti con `create_client` e `update_client` (`contacts`, `contact_email`, `contact_phone`) entrano anche nella rubrica come persone collegate al cliente, con la stessa email che resta una persona sola; l'esito è nel campo `crm` della risposta.

## Relazione con i contatti — 1.15.0

Catalogo `2026-10-29.4`, server `0.19.0` (412 tool). Ogni persona della rubrica ha tono di voce, preferenze, note personali e ruolo nelle decisioni, uno storico di ciò che ci si dice e le analisi della relazione con le versioni. Nuovi tool nel toolset `clients`: `get_crm_person_relationship` (profilo, ultimo contatto, storico con i meeting, analisi), `list_crm_interactions`, `log_crm_interaction`, `update_crm_interaction`, `delete_crm_interaction` (con conferma) e `save_crm_person_insight`; `upsert_crm_person` accetta i campi della relazione. La skill `cliente` spiega come registrare un incontro e come dedurre.

## Contatti nei meeting — 1.15.1

Catalogo `2026-10-29.5`, server `0.19.1` (414 tool). Le persone della rubrica si collegano ai meeting di Agency OS: `set_crm_meeting_person` (collega o scollega) e `list_crm_meeting_people`. Il meeting entra nello storico del contatto e ne aggiorna l'ultimo contatto. La skill `cliente` lo ricorda quando si registra un meeting.

## Orario di lavorazione obbligatorio — 1.15.2

Catalogo `2026-10-29.6`, server `0.19.2`. `create_task` e `update_task` rifiutano un inizio di lavorazione senza la fine: la lavorazione ha sempre un orario. Le task vecchie senza fine restano modificabili negli altri campi. La skill `task` lo dice.

## Transcript lunghi — 1.16.1

Catalogo `2026-10-29.8`, server `0.19.4`. Un segmento del transcript può arrivare al limite del documento (2 milioni di caratteri) invece di 20.000: `replace_meeting_transcript` salva tutto in un solo segmento e un testo lungo rendeva il transcript illeggibile nell'app. `update_meeting` sposta anche il contatto principale quando cambiano `client_id` o `lead_id`.

## CRM Lead e Pipeline — 1.16.0

Catalogo `2026-10-29.7`, server `0.19.3`. Le fasi delle opportunità sono `new`, `first_meeting`, `quote`, `quote_presentation`, `won` e `lost`; quelle aperte avanzano da sole da meeting e preventivi collegati e si spostano anche a mano. `list_sales_opportunities`, `update_sales_opportunity`, `list_leads` e `update_lead_status` accettano le fasi nuove e convertono i nomi vecchi (`qualification` → `first_meeting`, `negotiation` → `quote`). Le skill `preventivo` e `agency-os-operations` lo spiegano.
