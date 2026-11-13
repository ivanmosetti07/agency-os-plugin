---
name: pianifica
description: Trasforma un allineamento, transcript, recap, idee o elenco attività in un piano con progetto, task, ruoli, dipendenze e date su Agency OS. Usala per scomporre o ripianificare un risultato, prima in brainstorming e poi applicando il piano autorizzato; per modifiche puntuali usa task o progetto.
---

# Pianifica

Porta il contesto a un piano concreto, nuovo o dentro un progetto esistente. Mantieni outcome, nomi e fasi scelti dall'utente: aggiungi solo attività necessarie al risultato, senza sostituire la richiesta con un framework più complesso.

Leggi [agency-os-operations](../agency-os-operations/SKILL.md) per catalogo, copertura, permessi e verifiche. Per applicare il piano usa [progetto](../progetto/SKILL.md) e [task](../task/SKILL.md), senza duplicarne i contratti. Questa skill governa la costruzione del piano; quelle di entità governano le singole mutazioni.

## Ricostruisci il punto di partenza

- Accetta meeting o transcript, recap incollato, conversazione precedente, idee grezze e liste di cose da fare. Cerca e leggi le fonti indicate disponibili prima di chiedere informazioni recuperabili.
- Se viene richiesto l'ultimo allineamento, identifica l'ultimo meeting **pertinente** per data e argomento e leggi transcript e verbale completo disponibili, non solo titolo o sintesi troncata. Distingui data del meeting e data di aggiornamento. Se hai solo una fonte vecchia o parziale, dichiaralo.
- Separa decisioni esplicite, proposte e dati da confermare. Le correzioni successive dell'utente prevalgono sulle ipotesi precedenti; una possibilità discussa non diventa un requisito.
- Risolvi agenzia, cliente/business, progetto e persone. Cerca progetti e task esistenti anche con sinonimi e completa le pagine pertinenti prima di dichiarare assenze. Leggi checklist e relazioni delle task da trasformare: riusa gli ID indicati anziché cancellare e ricreare.
- Per eventi o date esterne verifica la fonte ufficiale corrente, distinguendo edizione e anno; uno snippet vecchio non prevale sulla pagina attuale. Usa link, mail o messaggi richiesti e accessibili in sola lettura, senza inventare URL, orari o partecipazioni. Se il canale non è accessibile, esplicita il limite.

## Usa i precedenti pertinenti

Prima di strutturare il piano consulta progetti, task e checklist analoghi già svolti, inclusi completati o archiviati quando utili e accessibili. Cerca per risultato, cliente/business e tipo di lavoro; leggi il dettaglio dei precedenti migliori, non soltanto titoli o checklist riassunte. Ricavane struttura, granularità delle task, ruoli, sequenza, dipendenze e prassi reali, considerando anche esiti e correzioni disponibili.

Mostra brevemente quali precedenti orientano la proposta e quali adattamenti servono oggi. Sono riferimenti, non decisioni attuali: prevalgono richiesta, correzioni e vincoli correnti. Non copiare automaticamente date, persone, prezzi, condizioni o soluzioni superate; non trasformare un'assegnazione storica in una responsabilità attuale. Riutilizza la struttura utile senza duplicare le task storiche, riaprire archivi o modificare i precedenti. Se non trovi precedenti o la lettura è parziale, dichiaralo e costruisci il piano dai dati disponibili.

## Costruisci e rivedi il piano in chat

Se è richiesto brainstorming, proposta o «non aggiornare Agency OS», resta in sola lettura fino a un'autorizzazione successiva. Presenta subito una proposta completa quando il contesto basta; non imporre domande per ogni fase. Chiedi solo ambiguità che cambiano il risultato, continuando le parti indipendenti.

Rendi reviewabili outcome e criterio di conclusione, progetto da creare/riusare, task da aggiornare/aggiungere, risultato di ogni task, sequenza e dipendenze, chi esegue e chi risponde, stato, scadenza e lavorazioni se richieste. Una tabella è utile per confrontare le righe. Evidenzia ipotesi e conflitti senza renderli fatti confermati.

I ruoli espliciti prevalgono: chi coordina o risponde non esegue automaticamente; una task può avere più esecutori e più responsabili. Se il responsabile di una nuova task manca, rendi visibile nel piano il default dello schema (per esempio il creatore); non assegnarlo tacitamente. Risolvi persone e ruoli per questa richiesta, senza trasferire nomi o preferenze da altri casi. Le nuove task future restano da fare salvo indicazioni diverse; non dichiararle in corso perché hai pianificato il lavoro.

Con una deadline finale pianifica a ritroso, usando parallelismo dove le dipendenze lo permettono e tempo realistico per verifica e correzioni. Distingui ciò che deve essere pronto o avviato entro la data dai risultati successivi all'avvio. Non promettere vendite o altri risultati esterni entro la deadline, né comprimere durate a caso: mostra carico, conflitti e compromessi se il piano non è fattibile. Per un evento separa proposte, preparazione, logistica, partecipazione e follow-up: data evento e slot di preparazione non coincidono, e la presenza per tutta la durata non è implicita.

Recepisci correzioni mantenendo il resto del piano valido. Conserva esattamente i titoli richiesti e mostra il piano aggiornato, senza introdurre nuove priorità o riaprire decisioni già chiuse.

## Scadenze e lavorazioni

Pianifica slot solo per le persone per cui sono richiesti; per le altre mantieni le sole scadenze. Usa il timezone del contesto, esplicitandolo (Europe/Rome se quello richiesto); verifica giorno della settimana e date relative con il calendario reale.

Se l'utente delega la scelta di date, durate o orari («deducili tu»), stimali in base al lavoro e agli impegni verificati: non richiederli di nuovo né applicare una fascia unica a tutti. Prima di proporre disponibilità leggi task con lavorazioni e scadenze nelle agenzie accessibili pertinenti, calendari collegati e meeting **nativi Agency OS** nell'intervallo. Un calendario Google vuoto non prova l'assenza di meeting. Segui la paginazione, considera lavoro già impegnato e dipendenze, includi nel controllo anche le sessioni annotate nelle descrizioni/checklist; dichiara fonti non disponibili e copertura incompleta. Le durate sono stime basate su scope e materiali noti: se mancano asset o complessità, indica l'assunzione senza certificare la fattibilità. Se ripianifichi una task, considera il vecchio slot come sostituito solo nel piano, evitando di contarlo come nuovo lavoro sovrapposto.

Scopri le capability correnti prima della scrittura. Nel contratto attuale:

- `due_date` contiene solo `YYYY-MM-DD`, senza ora. «Mattina» o «entro le 13» va nella descrizione come vincolo di consegna, non come lavorazione della persona.
- `calendar_date` e `calendar_date_end` vanno sempre insieme, con inizio e fine nello stesso giorno; converti coerentemente il timezone al formato accettato dal server.
- La task espone una sola coppia di lavorazione. Se servono più sessioni, salva il primo slot nativo e le altre sessioni con data, ora e durata in descrizione/checklist; dichiarale annotate, non prenotate a calendario: il calendario nativo non protegge quelle fasce da altri impegni. Non creare un intervallo che attraversa la notte né copie della stessa task per simulare gli slot. Se il catalogo offre una capability multisessione, verificane schema e comportamento prima di usarla.

## Applica il lotto autorizzato e verifica

Una richiesta esplicita di applicare il piano concreto già discusso è autorizzazione sufficiente nello scope approvato, anche con una correzione di titolo: non chiedere un secondo sì identico. Se mancano autorizzazione o dati essenziali, mostra il lotto pronto e ferma solo le mutazioni interessate. La pianificazione di task per ads, invii o incontri non autorizza ad eseguire campagne, inviare email, messaggi o inviti esterni. Rispetta gli effetti nativi e le conferme server delle operazioni Agency OS.

Rileggi le entità prima di applicare il delta minimo, preservando storia e campi estranei. Se il dato corrente diverge dal piano approvato in modo sostanziale, chiarisci il conflitto prima di sovrascrivere. Crea il progetto solo quando serve; aggiorna le task da trasformare e crea solo quelle mancanti. Usa idempotenza quando disponibile; prima di riprendere un lotto interrotto riconcilia gli ID e le righe effettivamente salvate, senza ripetere alla cieca scritture dall'esito incerto. Nessuna cancellazione o rollback implicito.

Rileggi `list_projects` e `list_tasks` con copertura e dettaglio adeguati, integrando i getter per i campi omessi: verifica progetto, titoli, ruoli effettivi, scadenze, coppie di lavorazione, stato, checklist e dipendenze approvate. `success: true` non basta. Distingui applicato e verificato da parziale, fallito o ancora proposto; correggi solo discrepanze certe nello scope autorizzato.

Concludi in modo conciso con progetto creato/riusato, task create/aggiornate, link visibili ottenuti da fonti verificate e limiti residui, compresi slot solo annotati. Non dichiarare un pannello aperto senza averlo aperto e verificato. Agency OS resta la fonte delle task: un mirror nel second brain si fa solo quando pertinente o richiesto, senza imporre file personali, sincronizzazione GitHub o una nuova conferma fuori scope.
