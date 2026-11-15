# Uso delle skill Agency OS

Le skill possono attivarsi dal linguaggio naturale. In Codex si possono richiamare anche come `$nome-skill`; in Claude Code come `/agency-os:nome-skill` dopo l'installazione del plugin.

## Skill disponibili

| Skill | Scopo |
|---|---|
| `daily-brief` | Brief della giornata in forma fissa: chiusure, calendario, priorità, deleghe, agenti, scadenze, salute e riconciliazione Agency OS in sola lettura |
| `aggiorna-lavoro` | Chiusura sessione, backlog, registri, lotto autorizzato vault-Agency OS e consegna completa con Daily Brief, DREAM e domande deduplicate |
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

La skill risolve e legge il record attuale, conserva i campi non citati, calcola il delta minimo e mostra il prima/dopo. Non invia mai campi vuoti per errore e non assume aggiornamenti a cascata. Entro l'autorizzazione già concessa applica il lotto e rilegge la stessa superficie che vedrà l'utente.

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

## Metodo operativo predefinito

Un progetto per servizio ricorrente, con nome `<Cliente> — <Servizio>` e date del contratto verificato; progetti distinti per lavori una tantum e un Generale per il trasversale. Una task per consegna e checklist per i passaggi, senza duplicare i periodi delle ricorrenze native. I modelli di servizio non autorizzano nuove attività: si adattano a contratto, precedenti e decisioni correnti. Le istruzioni locali possono sostituire questo standard.

«Analizza la task e iniziamo» recupera prima il contesto completo. «Materiale inviato, attendo feedback» mantiene la task esistente in attesa, senza dichiararla approvata o conclusa. Una nuova data di feedback ripianifica le dipendenze solo se confermata o se la scelta delle date è delegata.

Il Daily Brief legge e propone sempre senza scrivere. Aggiorna-lavoro esegue prima le scritture autorizzate e conclude con report, brief completo, DREAM separata e una sola raccolta di domande. In assenza di fonti DREAM ne dichiara il limite; un gate bloccante non impedisce di consegnare il brief dalle fonti verificabili.

## Scenari di accettazione 1.25.0

Review delle istruzioni, senza scritture su account reali:

| Richiesta e contesto | Comportamento atteso |
|---|---|
| Cliente con Social e Meta Ads, contratto verificato e progetto Social esistente | Riusa Social, propone il solo progetto Meta mancante; nessun progetto per mese né copia dello storico |
| Sito una tantum per lo stesso cliente | Progetto distinto con outcome e scadenza, non task generica nel servizio Social |
| PED inviato, feedback senza data, programmazione dipendente | Mantiene ID della task, distingue attesa e completamento; nessuna data di feedback inventata o spostamento a cascata |
| Feedback fissato e delega a ripianificare | Legge successori, propone date e conflitti, applica il delta autorizzato e rilegge task e dipendenze |
| Check settimanale ricorrente | Usa la ricorrenza nativa e il periodo nel titolo, senza creare quattro copie future |
| Daily Brief dopo una sessione con modifiche autorizzate | Il brief non scrive; propone i delta residui e dichiara dati non letti |
| Aggiorna-lavoro con gate rosso, fonte DREAM mancante e dubbio ripetuto | Sospende i passi bloccati, consegna report e brief verificabile, dichiara DREAM non disponibile e stampa il dubbio una volta sola alla fine |
| Budget ADS già visibile nella delivery | Non perpetua l'eccezione; propone separazione amministrativa senza bonifica implicita |
| Meeting senza prova del collegamento calendario | Dichiara sincronizzazione non confermata e controlla il ponte, senza creare un duplicato Google |
| Scheda PED modificata dopo approvazione, link già attivo | Verifica stato e versione, non assume reset automatico; non rigenera il link e controlla i dati esposti |

Questi scenari documentano la review del comportamento prescritto; non equivalgono a test live dei tool o al caricamento delle skill in ogni host.
