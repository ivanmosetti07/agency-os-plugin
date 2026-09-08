---
name: aggiorna-lavoro
description: Chiude o riallinea una sessione di lavoro aggiornando il second brain PARA e preparando la riconciliazione con Agency OS, senza scrivere sul sistema condiviso. Usala per sistemare backlog, stati, inbox, registri e deleghe dopo il lavoro svolto.
---

# Aggiorna lavoro

Aggiorna il vault come fonte personale e prepara ciò che riguarda Agency OS come superficie condivisa. Le modifiche locali e quelle remote sono lotti distinti: nessuna scrittura esterna viene inclusa implicitamente.

Leggi [metodo-para.md](../agency-os-operations/references/metodo-para.md), [riconciliazione.md](../agency-os-operations/references/riconciliazione.md), il contratto dei [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e i [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md).

## Quattro regole su ogni passo

**Un fatto atteso non è un fatto.** Una riga di registro o di stato che dichiara qualcosa come previsto, in arrivo o in attesa di conferma non chiude una voce, non sposta una scadenza e non toglie un piano di riserva. Si riscrive col suo marcatore di attesa, la fonte e il termine, e resta lì finché non risponde l'utente o una fonte primaria.

**Una domanda aperta blocca ciò che nomina.** Se il vault produce letture riflessive o revisioni che lasciano domande senza risposta, le entità citate da quelle domande sono ferme: si applicano solo le correzioni testuali, mai chiusure, ri-date o rimozioni.

**Ciò che scrive l'utente non si tocca.** I file di radice che il vault dichiara curati a mano — tipicamente la memoria stabile e il backlog di livello vault — si leggono per generare le viste e si modificano soltanto se l'utente cambia decisione. Scoprilo dalle istruzioni di radice invece di dedurlo dal nome del file, e in caso di dubbio chiedi prima di scrivere.

**I valori marcati si conservano.** Se il vault segna dentro i suoi file dei punti gestiti da un generatore di cifre canoniche, quei marcatori restano al loro posto: rigenerare una vista non li rimuove né li sostituisce a mano. Se il controllo delle cifre segnala valori oltre la loro data di validità, fermati: li riconferma l'utente, non si propagano.

## Flusso

1. **Riconoscimento.** Individua il vault, leggi le istruzioni di radice e quelle ereditate, e scopri gli script di salute, dashboard, registro e riconciliazione già presenti. Non chiedere all'utente file che il suo vault non ha. Se il vault non è univoco, chiedi soltanto il percorso.
2. **Controlli offline, prima di tutto.** Esegui i controlli di salute e conserva l'esito come baseline per la verifica finale. Bloccano la chiusura: le cifre canoniche scadute, le zone manuali ricomparse dentro una vista che il vault genera per intero, i file di radice curati rimasti senza le loro sezioni. Un controllo rosso si risolve in questo ciclo o si dichiara nel report, mai in silenzio.
3. **Fotografia di Agency OS, prima di scrivere.** Se la fotografia manca o è vecchia, aggiornala ora con l'MCP, dichiarando copertura, limiti, cursori e motivi di lettura incompleta. Farlo dopo non servirebbe: i passi seguenti chiudono task e riscrivono deleghe, e confrontarle con una fotografia vecchia equivale a non averla. Uno zero non dimostra assenza se non hai letto.
4. **Delta della sessione.** Leggi cosa è cambiato dall'ultima chiusura e i registri toccati, senza alterare modifiche estranee. Verifica scope dei file, duplicazioni di governance fra file diversi e formato delle voci di registro. Un registro cresciuto oltre il limite dichiarato dal vault è candidato all'archivio, non al taglio.
5. **Inbox.** Fai triage di quanto è in ingresso e portalo nella collocazione PARA giusta, con la sua voce nel registro di destinazione. Precompila classificazione, destinazione, titolo e metadati dal contenuto e dalla struttura corrente. Se qualcosa resta ambiguo, raccogli tutte le ambiguità in una sola domanda: non indovinare, e non inventare un registro nuovo dove ne esiste già uno.
6. **Memoria e backlog.** Aggiorna la memoria stabile soltanto quando emerge conoscenza durevole. Aggiorna stati, backlog e registri nel loro scope, rispettando i file curati dall'utente: chiudi le task superate da fatti già avvenuti, promuovi ciò che è maturato, e lega ogni voce nuova all'obiettivo che eredita o dichiarala operativa. Se il vault dichiara tetti di righe, di byte o finestre temporali, rispettali; se non li dichiara, non inventarli.
7. **Viste generate.** Rigenera per intero le viste che il vault genera — dashboard e stato di radice — partendo sempre dalla versione corrente e non da un modello, perché altri riti scrivono gli stessi file. Applica il generatore di cifre canoniche se esiste. Dichiara le voci uscite dalle viste invece di lasciarle sparire, e misura peso e righe di ogni file toccato per il report.
8. **Confronto, dopo le scritture locali.** Rigenera il confronto fra vault e Agency OS adesso, non prima: è qui che il disallineamento nasce davvero, perché hai appena chiuso task e riscritto deleghe e chi le esegue vede solo Agency OS. Per ogni voce in sprint passata a un responsabile diverso dall'utente, verifica che esista la gemella su Agency OS. Una task delegata presente soltanto nel vault è un disallineamento operativo.
9. **Lotto remoto, preparato e fermo lì.** Componi il lotto con entità, operazione, valore precedente, valore proposto, prova e rischio, e mostralo per intero. ⛔ **Questa skill non scrive su Agency OS**: l'applicazione è un atto separato, con la propria approvazione, e restringe volutamente il contratto generale descritto in [riconciliazione.md](../agency-os-operations/references/riconciliazione.md). Chiudere la propria giornata non può muovere la board di qualcun altro.
10. **Verifica.** Ripeti i controlli di salute e confronta con la baseline del passo 2. Ripara i riferimenti rotti con gli strumenti sicuri e automatici; quelli che rimuovono righe si usano soltanto su assenso esplicito dell'utente. Cancella gli avvisi che i passi di questo stesso ciclo hanno già risolto, invece di riportarli come aperti.
11. **Commit.** Se il vault usa Git e le sue istruzioni prevedono il commit di chiusura, crea un commit locale in italiano contenente soltanto i file della sessione, nel formato che il vault dichiara. Escludi i duplicati generati dalla sincronizzazione del sistema operativo. Non eseguire push manuali quando il vault ha una sincronizzazione propria, e non toccare le cartelle che il vault dichiara sensibili.

## Report

Chiudi con una nota breve, una riga per voce: salute prima e dopo, con i controlli rimasti rossi · file analizzati e aggiornamenti di sistema · triage in ingresso e memorie aggiunte · stati e backlog toccati, distinti per aree, clienti e progetti · viste rigenerate con peso e righe · età della fotografia Agency OS, disallineamento residuo e copertura non letta · lotto remoto pronto e in attesa di approvazione, mai applicato qui · commit e ramo · avvisi e decisioni ancora aperte.
