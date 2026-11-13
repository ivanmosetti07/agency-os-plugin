# Uso delle skill Agency OS

Le skill possono attivarsi dal linguaggio naturale. In Codex si possono richiamare anche come `$nome-skill`; in Claude Code come `/agency-os:nome-skill` dopo l'installazione del plugin.

## Skill disponibili

| Skill | Scopo |
|---|---|
| `daily-brief` | Brief della giornata in forma fissa: chiusure, calendario, priorità, deleghe, agenti, scadenze, salute e riconciliazione Agency OS in sola lettura |
| `aggiorna-lavoro` | Chiusura sessione, backlog, registri e lotto di allineamento vault-Agency OS |
| `pianifica` | Da allineamenti, transcript o idee a un piano iterativo con progetto, task, ruoli, dipendenze, scadenze e slot richiesti; applica solo il lotto autorizzato |
| `task` | Task, checklist, assegnatari, date, attività e notifiche |
| `progetto` | Progetti, team, workflow, KPI e aggiornamento periodico |
| `cliente` | Clienti, onboarding, relazioni e archiviazione sicura |
| `business` | Business interni distinti dai clienti |
| `preventivo` | Preventivi, voci economiche, link, invio e verifiche di stato |
| `meeting` | Meeting, calendario, partecipanti, note, transcript e follow-up |
| `ped-social` | Piani editoriali, contenuti, media, revisioni e pubblicazione |
| `agency-os-operations` | Contratto generale per operazioni MCP non coperte dalle skill dedicate |

## Come crea un'entità

La skill legge il catalogo MCP e lo schema aggiornato, risolve agenzia e relazioni, cerca duplicati e precompila i campi usando richiesta, contesto, entità collegate e default dichiarati dal server. Mostra poi l'anteprima e crea soltanto il record autorizzato. La verifica finale usa ID, timestamp e rilettura della superficie primaria.

Esempio:

```text
Usa $task per creare una task dal resoconto di questo meeting.
```

Se progetto, owner e data sono già ricavabili, non vengono chiesti. Se manca una scadenza obbligatoria o ci sono due progetti omonimi, la skill mostra i valori già pronti e pone un'unica domanda sui soli campi irrisolti.

## Come modifica un'entità

La skill risolve e legge il record attuale, conserva i campi non citati, calcola il delta minimo e mostra il prima/dopo. Non invia mai campi vuoti per errore e non assume aggiornamenti a cascata. Dopo l'approvazione applica il lotto e rilegge la stessa superficie che vedrà l'utente.

Esempio:

```text
Usa $progetto per aggiornare lo stato dal resoconto della settimana, senza cambiare team e date.
```

Importi, condizioni legali, destinatari, assegnatari, permessi, date e identificativi non vengono inventati. Le scritture esterne, gli invii, le pubblicazioni e le operazioni critiche restano separati e richiedono approvazione esplicita sul contenuto esatto.

## Pianificare da un allineamento

```text
Usa $pianifica: parti dall'ultimo allineamento pertinente, riusa il progetto esistente e proponi qui task, ruoli e scadenze. Non aggiornare Agency OS finché rivediamo il piano.
```

La proposta consulta anche progetti, task e checklist precedenti pertinenti, compresi completati o archiviati accessibili: ne riprende struttura e prassi senza copiare decisioni, date o persone superate. Le correzioni aggiornano la bozza. Quando l'utente approva il piano concreto e chiede di applicarlo, la skill riusa le task esistenti, scrive solo il delta autorizzato e rilegge progetti e task. Se le lavorazioni richiedono più sessioni, distingue gli slot nativi da quelli solo annotati secondo le capability correnti. Non esegue le azioni future descritte nelle task e non richiede un mirror personale.
