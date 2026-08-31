# Uso delle skill Agency OS

Le skill possono attivarsi dal linguaggio naturale. In Codex si possono richiamare anche come `$nome-skill`; in Claude Code come `/agency-os:nome-skill` dopo l'installazione del plugin.

## Skill disponibili

| Skill | Scopo |
|---|---|
| `daily-brief` | Dream giornaliero, calendario, vault e riconciliazione Agency OS in sola lettura |
| `aggiorna-lavoro` | Chiusura sessione, backlog, registri e lotto di allineamento vault-Agency OS |
| `task` | Task, checklist, assegnatari, date, attività e notifiche |
| `progetto` | Progetti, team, workflow, KPI e aggiornamento periodico |
| `cliente` | Clienti, onboarding, relazioni e archiviazione sicura |
| `business` | Business interni distinti dai clienti |
| `preventivo` | Preventivi, voci economiche, link, invio e verifiche di stato |
| `meeting` | Meeting, calendario, partecipanti, note, transcript e follow-up |
| `ped-social` | Piani editoriali, contenuti, media, revisioni e pubblicazione |
| `crea-second-brain-para` | Creazione e classificazione di contenuti nel vault PARA |
| `aggiorna-second-brain-para` | Analisi e riordino della struttura PARA esistente |
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
