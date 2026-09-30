---
name: task
description: Crea, consulta o modifica task in Agency OS con progetto, cliente, owner, assegnatari, date, checklist, tag e stato precompilati quando ricavabili. Usala per qualunque operazione su una task o sulle sue attività collegate.
---

# Task

Leggi il contratto [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md). Scopri sempre tool e schema correnti nei toolset `tasks`, `projects`, `clients`, `team` e, se serve, `assets` o `notifications`.

## Aprire e consultare le task

Per richieste come “apri le mie task”, “mostra la board” o “vedi il calendario”, usa il workbench interattivo `render_task_workbench` dopo avere risolto l'agenzia. Mantieni i filtri richiesti dall'utente. Il pannello offre tabella ordinabile, board e calendario mensile con gli stessi filtri; non sostituirlo con una lista testuale quando la superficie interattiva è disponibile.

Scopri lo schema corrente tramite il catalogo. Se la connessione conserva uno schema precedente (per esempio un limite massimo di 30), chiama `execute_read_tool` con `name: "render_task_workbench"` e gli argomenti dello schema corrente, senza aggirare autenticazione o permessi. Il workbench carica le pagine successive: non descrivere la prima pagina come l'intero elenco. Se il caricamento è parziale, dichiaralo e usa il recupero disponibile.

## Creare una task

1. Risolvi agenzia, cliente e progetto dal contesto e dalle relazioni; non scegliere fra omonimi.
2. Cerca duplicati per progetto, titolo, periodo e stato.
3. Precompila titolo, descrizione, stato, priorità, owner, assegnatari, date, slot di lavorazione, scadenza, tag, checklist e dipendenze usando richiesta, progetto e default dello schema.
4. Non inventare assegnatari, date o priorità. Se manca un obbligatorio, mostra i campi già risolti e chiedi insieme soltanto quelli scoperti.
5. Mostra l'anteprima, crea con idempotenza quando disponibile e rileggi ID, progetto, assegnatari e timestamp.

Una task delegata deve essere visibile in Agency OS: una delega presente soltanto nel vault non è completata.

## Modificare una task

Leggi prima task, checklist, assegnatari e dipendenze. Conserva i campi non citati e invia il delta minimo. Per completarla usa il flusso dedicato se presente, precompila il report di completamento dai fatti osservati e chiedilo se obbligatorio ma non ricavabile. Stato `done` senza timestamp o prova non equivale a completamento.

Dopo ogni modifica rileggi la task e verifica il campo cambiato, gli assegnatari effettivi e l'eventuale attività/notifica prodotta. Se viene menzionata una persona, risolvi l'utente e verifica che la notifica sia stata creata; non considerare `@nome` nel testo una prova di consegna.
