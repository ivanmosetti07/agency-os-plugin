---
name: task
description: Crea, consulta o modifica task in Agency OS con progetto, cliente, responsabili, assegnatari, date, checklist, tag e stato precompilati quando ricavabili. Usala per qualunque operazione su una task o sulle sue attività collegate.
---

# Task

Leggi il contratto [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md). Scopri sempre tool e schema correnti nei toolset `tasks`, `projects`, `clients`, `team` e, se serve, `assets` o `notifications`.

## Aprire e consultare le task

Per richieste come “apri le mie task”, “mostra la board” o “vedi il calendario”, usa il workbench interattivo `render_task_workbench` dopo avere risolto l'agenzia. Mantieni i filtri richiesti dall'utente. Il pannello offre tabella ordinabile, board e calendario mensile con gli stessi filtri; non sostituirlo con una lista testuale quando la superficie interattiva è disponibile.

Scopri lo schema corrente tramite il catalogo. Se la connessione conserva uno schema precedente (per esempio un limite massimo di 30), chiama `execute_read_tool` con `name: "render_task_workbench"` e gli argomenti dello schema corrente, senza aggirare autenticazione o permessi. Il workbench carica le pagine successive: non descrivere la prima pagina come l'intero elenco. Se il caricamento è parziale, dichiaralo e usa il recupero disponibile.

## Persone: chi esegue e chi è responsabile

Una task ha due ruoli indipendenti, ciascuno con più persone: gli **assegnatari** (`assignee_ids`) la eseguono, i **responsabili** (`responsible_ids`) la seguono e ne rispondono senza doverla eseguire. Una persona può averne uno o entrambi. Una delega è un assegnatario: chi delega di solito resta responsabile. `owner_id` è solo il primo responsabile, da leggere e non da scrivere.

- In creazione indica entrambi i ruoli quando li conosci. Senza persone, chi crea esegue ed è responsabile; con i soli assegnatari, chi crea resta responsabile.
- Per aggiungere o togliere una persona usa `assign_task` / `unassign_task` con `role` (`assignee`, `responsible`, `both`; per togliere anche `all`). `update_task` sostituisce l'intero elenco del ruolo passato e lascia l'altro com'è.
- Per «le mie task» usa `list_tasks` con `only_mine` e `my_role` (`assignee` = da fare io, `responsible` = da seguire); per una persona `assignee_id` o `responsible_id`. Nelle risposte `people` dà nome e ruolo.

## Creare una task

1. Risolvi agenzia, cliente e progetto dal contesto e dalle relazioni; non scegliere fra omonimi.
2. Cerca duplicati per progetto, titolo, periodo e stato.
3. Precompila titolo, descrizione, stato, priorità, responsabili, assegnatari, date, slot di lavorazione, scadenza, tag, checklist e dipendenze usando richiesta, progetto e default dello schema.
   La scadenza (`due_date`) è solo una data, `YYYY-MM-DD`, senza orario: la task è in ritardo dal giorno dopo. La lavorazione (`calendar_date` → `calendar_date_end`) è una data con ora di inizio e ora di fine nello stesso giorno, in ora di Roma, e l'orario è obbligatorio: passa sempre entrambi (un inizio senza fine viene rifiutato), chiedendo l'orario se manca; una fine in un altro giorno viene rifiutata («La lavorazione inizia e finisce nello stesso giorno»), e spostando solo l'inizio la fine si ferma alle 23:59 se non ci sta. Non proporre più le 18:00 come ora di scadenza.
   Lo stato è uno fra `todo`, `in_progress`, `waiting`, `done`, `cancelled`; senza stato la task nasce `todo`. `evergreen` e `backlog` non esistono più: se arrivano diventano `todo` con l'avviso in `warnings[status_alias]`. La ripetizione non è uno stato ma un'impostazione della task (simbolo ↻ nel dettaglio dell'app): completata una task che si ripete, Agency OS crea da solo la successiva «Da fare». Non simulare una ripetizione creando a mano le copie future.
4. Non inventare assegnatari, date o priorità. Se manca un obbligatorio, mostra i campi già risolti e chiedi insieme soltanto quelli scoperti.
5. Mostra l'anteprima con chi esegue e chi è responsabile, crea con idempotenza quando disponibile e rileggi ID, progetto, `assignee_ids`, `responsible_ids` e timestamp.

Una task delegata deve essere visibile in Agency OS: una delega presente soltanto nel vault non è completata.

## Modificare una task

Leggi prima task, checklist, assegnatari e dipendenze. Conserva i campi non citati e invia il delta minimo. Per completarla usa il flusso dedicato se presente, precompila il report di completamento dai fatti osservati e chiedilo se obbligatorio ma non ricavabile. Stato `done` senza timestamp o prova non equivale a completamento.

Dopo ogni modifica rileggi la task e verifica il campo cambiato, assegnatari e responsabili effettivi e l'eventuale attività/notifica prodotta. Se viene menzionata una persona, risolvi l'utente e verifica che la notifica sia stata creata; non considerare `@nome` nel testo una prova di consegna.
