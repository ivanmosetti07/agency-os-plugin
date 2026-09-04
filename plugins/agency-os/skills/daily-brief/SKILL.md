---
name: daily-brief
description: Prepara il brief operativo della giornata in forma fissa con chiusure, calendario, priorità, deleghe, agenti, scadenze, salute e riconciliazione in sola lettura fra second brain PARA e Agency OS. Usala per il rito quotidiano, per ri-emetterlo dopo che l'utente ha chiuso delle voci, o per capire blocchi e disallineamenti di oggi.
---

# Daily brief

Produci un brief verificabile senza applicare modifiche operative ad Agency OS: il brief legge, confronta e propone, non chiude, non rinvia, non ri-data e non scrive sul sistema condiviso. Parti dal contratto di output, poi raccogli soltanto ciò che una sua sezione stampa e stampa soltanto ciò che hai raccolto.

Leggi [riconciliazione.md](../agency-os-operations/references/riconciliazione.md), [metodo-para.md](../agency-os-operations/references/metodo-para.md), il contratto dei [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e i [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md).

Tre regole valgono su ogni passo. Una riga attesa resta un'ipotesi: si marca nella forma `⏳ <fatto atteso> (<fonte> · entro <G/M>)`, non chiude una voce, non sposta una scadenza, non toglie una riserva. Uno strumento che non vede un dato descrive sé stesso e non il mondo: scrivi il limite dello strumento, nomina chi lo sa invece di attribuire il fatto a una persona, e assegna esplicitamente la verifica. Ogni voce di lavoro vive in una sola sezione: altrove la si richiama, non la si ripete.

## Preparazione

Individua il vault dalla directory corrente o dai suoi file di governance, e leggi le istruzioni di radice e quelle ereditate. Se più vault sono plausibili o nessuno è accessibile, chiedi soltanto il percorso. Non chiedere all'utente file che il suo vault non ha. Nel fuso locale calcola oggi, ieri, sette giorni fa, la settimana ISO con il suo intervallo, l'indice del giorno dentro la settimana e l'ora di emissione. Se il vault dichiara oggi come non lavorativo, il brief si riduce all'intestazione, a una riga che lo dice e alla sola sezione di allineamento: niente priorità e niente deleghe, e le scadenze che cadono lì si propongono per una nuova data.

Per Agency OS scopri catalogo e schemi correnti a ogni esecuzione e non ricordare nomi di tool. Chiedi al catalogo i campi che ti servono e dichiara quelli che non espone, invece di dedurli.

## Forma dell'output

Emetti il brief e nient'altro: nessun preambolo, nessuna chiusura di cortesia, nessuna domanda finale, seconda persona singolare e tono diretto. Questo è lo scheletro, dove le parentesi angolari sono segnaposto, le quadre segnano un campo che compare solo a certe condizioni e sparisce dal testo emesso, e in una lista numerata le voci intermedie non mostrate seguono la forma della prima. Le righe vuote che vedi qui sono vincolanti quanto le parole.

```text
🗓️ DAILY BRIEFING - <giorno> <GG/MM/AAAA> · W<NN> giorno <N>[ · aggiornato h<HH:MM>]

✅ CHIUSO OGGI

* <voce chiusa perché lavorata> → <cosa libera e a chi passa>
* ⛔ <voce ritirata>, la premessa era falsa: <chi l'aveva prodotta>
* 🌙 <prodotto riflessivo del giorno prima>

💬 Giudizio: <cosa è costato davvero, cosa non si è mosso>

📅 SETTIMANA

* Oggi: restano <n> scadenze e <ore utili> prima delle <chiusura dichiarata>.
* <Gio> <G/M>: <impegno h<HH>-<HH>> (<persona>) · <marca> <impegno> · <origine del calendario se rilevante>.
* <Ven-dom>: <carico pianificato>, <scadenza collettiva> (<persona>).

⏪ IERI

* 🌙 <prodotto riflessivo del giorno prima>
* <residuo lasciato aperto> → <dov'è finito oggi>
* <previsione sulla capacità registrata ieri>: <com'è andata davvero>

💬 Giudizio: <cosa di ieri ha già tolto a oggi>

📋 DA FARE (mie) - Top 5 aggiornata

1. <marca> <nome della cosa> (<priorità>, <finestra>) - <perché è lì oggi>
2. <marca> <nome della cosa> (<priorità>, <finestra>) - <perché è lì oggi>
5. <marca> <nome della cosa> (<eredità obiettivo>) - salita in Top 5 al posto di <voce uscita>: <motivo>

💬 Giudizio: <cosa non si recupera se cade>

🤝 DELEGATE

* <persona>: <marca> <consegna di oggi> · <consegna> · <consegna>
* <persona>: <n> voci oggi + <arretrato>, scaduto dal <G/M>

💬 Giudizio: <chi è il collo di bottiglia e cosa sblocca>

🤖 AGENTI

* 🌙 `<agente>`: <cosa ha prodotto>
* 🤖 <agente>: <stato di oggi>. · 🤖 <agente>: <G/M>, <su cosa è bloccato>. · 🤖 `<agente>`: fermo dal <G/M>, <n> giorno.

<emoji dichiarata dal vault> <SEZIONE DI CONTENUTO>

* <titolo della voce> (<formato>, <destinazione>) · <cosa manca per chiuderla>

<testo integrale della voce, riportato com'è e mai riassunto>

⚠️ SCADENZE

* Oggi: <voce> · <voce> · <voce> (<persona>) · <voce> (<persona>, <quando>).
* Overdue con owner: <voce> (<persona>, dal <G/M>) · <voce> (<persona>, dal <G/M>).
* Overdue senza owner: <n>, <voce>, in scadenza oggi e di nessuno.
* ⏳ <fatto atteso> (<fonte> · entro <G/M>), non chiude <voce che ne dipende>.

🩺 HEALTH

Overall <livello>: <conteggio non verde> · <conteggio non verde>. ✅ <controllo risolto> (<causa che lo aveva acceso>)

🔄 ALLINEAMENTO

* <agenzia>: <n> allineati · solo-OS <entità> · solo-vault <entità> · aperte <n>.
* <agenzia>: <n> allineati · 🔴 <entità> <stato nel vault> e `<stato su Agency OS>` con <dettaglio> · aperte <n>.
* 🐛 <entità> (<identificativo>) su Agency OS è `<stato>`, il vault la dà <stato> fino al <G/M>. Da verificare prima di <conseguenza economica>.

💬 Giudizio: <le divergenze che valgono qualcosa>

📊 DASHBOARD: <cosa è cambiato> · §<sezione toccata> · alert <voce> da <livello> a <livello> · <metriche dichiarate dal vault> · peso <n> byte, <n> righe
```

**Spaziatura.** Cinque regole, nessuna eccezione. Una riga vuota prima di ogni titolo di sezione; l'intestazione è la prima riga del testo e non ne ha una prima, la riga vuota che la segue è quella che precede il primo titolo. Una riga vuota dopo ogni titolo di sezione, anche quando il corpo è prosa e non un elenco. Una riga vuota prima di ogni riga di giudizio. Una riga vuota prima della riga di chiusura. Dentro una sezione le voci sono invece contigue: mai una riga vuota fra due bullet, fra due righe numerate della classifica, né fra le due righe di prosa della salute, che sono un paragrafo solo. Mai due righe vuote di fila, mai spazi in coda, mai una riga vuota in cima o in fondo, un solo a capo finale. È la parte del formato che non si negozia: il giudizio chiude la sezione a cui appartiene e non ne apre un'altra, e senza la riga vuota che lo separa dal titolo seguente si legge come apertura della sezione dopo invece che come verdetto di quella che chiude. Un blocco di testo integrale fa eccezione soltanto al suo interno: una riga vuota prima e una dopo, e dentro restano le righe della fonte, che non si riformatta. Le righe vuote costano poco e sono la differenza fra un testo che si scorre e un muro che si salta: non toglierle per stare dentro il tetto di righe, taglia contenuto.

**Titoli e ordine.** Un titolo è emoji, spazio ed etichetta in maiuscolo, senza cancelletto, senza grassetto, senza corsivo e senza due punti, con al più un qualificatore fra parentesi in minuscolo e una coda introdotta da un trattino corto fra spazi. L'ordine è fisso: chiuso oggi, settimana, ieri, da fare, delegate, agenti, le sezioni di contenuto dichiarate dal vault, scadenze, health, allineamento, poi la riga di chiusura. Salta in silenzio le sezioni senza contenuto, senza scrivere che sono vuote. Chiuso oggi esiste soltanto sulle ri-emissioni, come il campo dell'ora nell'intestazione. Allineamento è l'unica sezione sempre presente. La riga di chiusura esce soltanto se hai scritto qualcosa in locale, ed è l'ultima riga del testo: non è un titolo anche se ne ha la forma, porta i due punti, tiene il contenuto sulla stessa riga e non ha una riga vuota dopo di sé.

**Voci.** Un bullet apre con asterisco e spazio a inizio riga, mai indentato, mai annidato, mai con trattino o pallino. Una voce sta su una riga sola, non va a capo e non supera i trecento caratteri: se sfora, togli fatti invece di spezzarla. Più fatti dentro la stessa voce si uniscono col punto mediano fra spazi, e l'elenco delle scadenze di oggi può portarne quanti ne servono, perché spezzarlo nasconde una voce. La forma tipica è asterisco, etichetta, due punti e contenuto, dove l'etichetta è un giorno, una persona, un'entità o una classe. L'unica sezione numerata è quella delle priorità, perché è una classifica: al più cinque voci, ciascuna come numero, marca, nome, qualificatori fra parentesi e la ragione dopo un trattino corto fra spazi, con le voci entrate e uscite dichiarate. La salute è prosa di una o due righe, senza bullet.

**Giudizio.** È una riga singola in chiaro, senza corsivo, che apre con l'emoji del fumetto, la parola Giudizio e i due punti, sta in fondo alla sezione e mai dentro un bullet. Va soltanto su chiuso oggi, ieri, da fare, delegate e allineamento. Settimana, agenti, scadenze, health e le sezioni di contenuto chiudono senza, perché sono elenchi e un verdetto su un elenco è per forza un riassunto. Da una a tre frasi che dicono cosa è a rischio, cosa non si recupera, chi è il collo di bottiglia e cosa l'utente sta evitando, e che attribuiscono a te le righe che descrivevano male il mondo. Mai compiacente e mai un riassunto: meglio nessun giudizio che un giudizio che ripete l'elenco.

**Segni e marcatori.** Il separatore interno è il punto mediano fra spazi. Il trattino corto ha tre usi distinti: fra spazi come stacco di frase, attaccato per un intervallo, attaccato per un identificatore composto. Mai il trattino lungo. Le citazioni stanno fra caporali «», il segno `§` prefissa attaccato una sezione citata altrove, la freccia semplice `→` segna una conseguenza o il passaggio fra due valori dello stesso conteggio, la freccia doppia `↔` il confronto fra i due sistemi, e il cambio di livello di un alert si scrive per esteso con le due emoji ai due estremi. Usa il backtick solo per identificatori tecnici, cioè id, identificativi di agenti e di controlli, valori di stato del gestionale ed espressioni di metrica, mentre un agente che ha un nome e non uno slug resta nudo, mai su persone, clienti, progetti, task o sezioni: le entità si chiamano per nome e l'identificativo entra fra parentesi una volta sola, quando serve per ritrovarle, perché un elenco di soli codici è il modo in cui una scadenza passa inosservata. Le emoji che aprono i titoli sono quelle dello scheletro e valgono come titolo solo a inizio riga seguite da un'etichetta in maiuscolo. Dentro le voci il nucleo delle marche è `⏳` fatto atteso, `⛔` voce ritirata, `🌙` prodotto riflessivo, `🐛` dato sospetto da verificare, `💶` voce economica, `🤖` agente, `🎥` videochiamata o lavorazione video, `🤝` incontro di persona; a questo nucleo il vault può aggiungere le sole marche delle proprie aree, dichiarandole. Due scale restano separate e non si mescolano: la salute usa `✅` `⚠️` `🔴`, gli alert usano `🟢` `🟠` `🔴`. Usa una marca per fatto, subito prima di ciò che qualifica e seguita da uno spazio, mai come decorazione.

**Date, numeri e misura.** La data completa compare soltanto nell'intestazione; altrove usa il relativo, oppure giorno e mese senza anno e senza zero iniziale. Un giorno futuro che apre una voce si abbrevia a tre lettere con l'iniziale maiuscola e dentro la frase resta minuscolo. Le settimane portano la sigla con due cifre, gli orari la lettera h attaccata, gli intervalli il trattino attaccato ai due estremi, mentre un orario dentro la frase resta nudo. Le migliaia usano il punto e gli importi il simbolo di valuta attaccato prima della cifra. Per un arretrato scrivi la data da cui lo è, per un fermo i giorni consecutivi. Il brief non supera le 70 righe, tetto 95: il conteggio comprende intestazione, righe vuote e riga di chiusura, ed esclude i blocchi di testo integrale. Sei elementi per sezione, sette in settimana perché il bullet di oggi si somma ai giorni restanti, e al più cinque priorità; se sfori taglia una sezione intera invece di limare le frasi.

## Le sezioni una per una

Chiuso oggi porta a bullet le voci chiuse e le decisioni prese dopo l'emissione precedente, con `⛔` sulle ritirate, e distingue sempre ciò che era lavoro da ciò che era solo una traccia mancante o una premessa falsa, perché solo il primo ha consumato la giornata. Settimana apre con oggi, le sue scadenze residue e le ore ancora utili, poi un bullet per ogni giorno restante che ha un impegno o una scadenza: i giorni vuoti si omettono e più giorni vuoti contigui stanno in un bullet solo. Ieri porta il prodotto riflessivo del giorno prima marcato `🌙`, i residui e la verifica delle previsioni sulla capacità, e si salta quando non c'è niente da verificare. Da fare porta fino a cinque cose dell'utente che decidono la giornata, in ordine di priorità, e si omette quando nessuna voce è dell'utente. Delegate porta un bullet per persona con le sue voci aperte e quella che sblocca un impegno già letto sui calendari. Agenti porta una riga di stato per processo automatico dichiarato dal vault, letta dal suo diario, e più agenti possono stare sulla stessa riga uniti dal punto mediano. Scadenze porta un bullet per classe, oggi, overdue con owner e overdue senza owner, e le due classi di scadute restano separate perché una scaduta senza responsabile non è scivolata a qualcuno, non è mai partita. Health porta il sommario, i livelli non verdi e i controlli risolti con la causa che li accendeva. Allineamento porta per agenzia gli allineati, i presenti solo su Agency OS, i presenti solo nel vault e le voci aperte, poi le divergenze di stato con `🔴` e i dati sospetti con `🐛`; se non ci sono divergenze lo dice in una riga, e se il connettore non risponde dichiara di non aver letto invece di dichiarare l'assenza di divergenze. La riga di chiusura è unica, con i campi uniti dal punto mediano.

Se il vault dichiara sezioni proprie di contenuto, come bozze da lavorare o interazioni da fare, inseriscile fra agenti e scadenze: riportano testo integrale, non portano giudizio e si saltano quando lo stato dichiarato del contenuto è già programmato o pubblicato. L'emoji che apre il titolo la dichiara il vault insieme alla sezione, e non può essere una di quelle dello scheletro né `💬`.

## Raccolta

1. **Emissione precedente.** Per chiuso oggi, per le entrate e le uscite dalla Top 5 e per il delta della riga finale, ricostruisci l'ultima emissione dalla sessione corrente e dalle viste locali che ha generato: servono Top 5, livello di ogni alert, previsioni sulla capacità e origine di ogni voce, perché senza non puoi dire cosa è entrato, cosa è uscito, quale alert è stato declassato e chi aveva prodotto la premessa di una voce ritirata. Se non c'è nessuna emissione precedente nella giornata, chiuso oggi non esiste e il campo dell'ora non compare.
2. **Lettura riflessiva del giorno prima.** Per ieri, per la sua riga `🌙` e per quella degli agenti, leggi stato, task, registri, decisioni e memoria dei pattern del giorno prima, e riporta soltanto le sezioni non vuote. Le domande aperte non si stampano come sezione: fino a tre bloccano le entità che nominano, che restano `⏳` con la fonte e il termine finché non risponde l'utente o una fonte primaria. Se l'emissione precedente ha registrato una previsione sulla capacità della giornata, verificala e riporta com'è andata senza addolcirla. Usa i disallineamenti soltanto per età e ricorrenza: il confronto lo fa il passo dedicato.
3. **Viste generate.** Per gli alert e per la riga finale, confronta la data delle viste locali con la sorgente più recente trovata per pattern, e verifica le priorità contro lo sprint, le righe di stato contro le fonti e gli alert contro gli ultimi sette giorni di registro.
4. **Calendari.** Per settimana e per le scadenze con orario, leggi tutti i calendari disponibili nella finestra da oggi ai giorni restanti e registra per evento data, orario, titolo, luogo, link riunione, organizzatore, risposte negative, calendario di origine e se è inserito a mano invece che sincronizzato. Segnala le sovrapposizioni e deriva le ore libere fino all'orario di chiusura dichiarato dal vault; se non è dichiarato, dillo invece di assumerlo. Un calendario vuoto o non letto non prova disponibilità.
5. **Agency OS.** Per da fare, delegate, scadenze e allineamento, elenca le agenzie accessibili e, per ciascuna, pagina statistiche, clienti, progetti, task, lead e preventivi chiedendo titolo, stato, priorità, scadenza, finestra pianificata, responsabile, assegnatari, avanzamento della checklist, progetto e cliente, e dichiara i campi che il server non espone. Registra limite, conteggio, cursore e saturazione, e propaga la saturazione a ogni numero che finisce nel testo. Riverifica gli aggregati precalcolati contro i conteggi per stato e il totale dichiarato. Deriva per persona il totale e quante voci scadono oggi, separa le scadute con responsabile da quelle senza, tieni la data da cui lo sono e distingui una scaduta mai iniziata da una in corso che sfora. Redigi importi e dati sensibili prima di qualunque fotografia locale; nel testo del brief una cifra che serve a decidere si nomina, purché venga da fonte primaria.
6. **Vault.** Per da fare, delegate, agenti, health e le sezioni di contenuto dichiarate, leggi registri, stato di radice, backlog di aree, clienti e progetti, obiettivi periodici e piani editoriali, e confronta il volume prodotto con l'avanzamento del piano che lo governa. Distingui le voci proprie dalle delegate leggendo il responsabile dichiarato: una voce senza responsabile è dell'utente, non di nessuno. Raggruppa le delegate per persona e lega ciascuna all'impegno che sblocca. Propaga a ogni voce della Top 5 l'obiettivo che eredita e segnala quelle che non ne hanno uno. Considera bozze soltanto i contenuti il cui stato dichiarato è aperto: il filtro è lo stato, non la cartella. Di ogni agente dichiarato dal vault leggi una riga dal suo diario e fermati lì: non aprire i suoi file di lavoro, non proporre correzioni dentro il suo perimetro, non contare i suoi debiti fra quelli del vault, e se il diario manca o è vecchio dillo invece di dedurne lo stato. Dal rapporto di salute prendi il sommario, i soli livelli non verdi e i controlli risolti rispetto all'esecuzione precedente con la causa che li aveva accesi; un controllo che fallisce perché gira fuori dalla macchina di riferimento o guarda un percorso non montato degrada a informazione.
7. **Allineamento.** Confronta clienti, progetti e deleghe per identità verificata e, per ogni agenzia, conta gli allineati, quelli presenti solo su Agency OS, quelli presenti solo nel vault e le voci aperte. Confronta stati e date, non la sola esistenza. Per ogni voce in sprint con responsabile diverso dall'utente, verifica la gemella in Agency OS. Tieni distinto un dato sospetto, da verificare prima di trarne una conseguenza economica, da una divergenza vera. Segnala le consegne recenti senza registrazione di pari data e proponi il testo già pronto senza scriverlo.
8. **Composizione e scritture locali.** Scegli le cinque voci per scadenza, priorità e irrecuperabilità, e dichiara quelle uscite e perché. Se le convenzioni del vault lo prevedono, salva la fotografia redatta e rigenera per intero le viste locali e lo stato di radice, rispettando i limiti dichiarati e senza inventarne; rileggi le prime righe di ogni file toccato e misurane peso e righe per la riga finale. Prima di emettere cancella gli alert che i passi di questo stesso run hanno già risolto e ricontrolla la spaziatura riga per riga contro le quattro regole. Non scrivere in Agency OS durante il brief.

Fai finire il brief alla riga della dashboard: la copertura per fonte e i dati non letti stanno accanto al conteggio che limitano oppure in coda a quella riga, non in un blocco a parte.
