---
name: aggiorna-lavoro
description: Chiude o riallinea una sessione di lavoro aggiornando il second brain PARA e riconciliandolo con Agency OS. Usala per sistemare backlog, stati, inbox, registri e deleghe dopo il lavoro svolto.
---

# Aggiorna Lavoro

Aggiorna il vault come fonte personale e Agency OS come superficie condivisa. Le modifiche locali e quelle remote sono lotti distinti: nessuna scrittura esterna viene inclusa implicitamente.

Leggi [metodo-para.md](../agency-os-operations/references/metodo-para.md), [riconciliazione.md](../agency-os-operations/references/riconciliazione.md) e [campi-e-mutazioni.md](../agency-os-operations/references/campi-e-mutazioni.md).

## Flusso

1. Individua il vault, leggi le istruzioni di radice e scopri gli script di salute, dashboard, registro e riconciliazione già presenti. Se il vault non è univoco, chiedi il percorso.
2. Esegui i controlli offline. Blocca la chiusura quando le fonti canoniche sono scadute, la dashboard contiene zone manuali vietate o la fotografia Agency OS è vecchia.
3. Se la fotografia è vecchia, usa l'MCP per aggiornarla con copertura dichiarata e redazione alla frontiera; non lasciare che uno zero silenzioso significhi “non letto”.
4. Leggi il delta della sessione senza alterare modifiche estranee. Verifica scope dei file, duplicazioni di governance e formato dei registri.
5. Fai triage di `_Inbox/`. Precompila classificazione, destinazione, titolo e metadati dal contenuto e dalla struttura corrente. Se un elemento resta ambiguo, raccogli tutte le ambiguità in una sola domanda; non indovinare.
6. Aggiorna memoria stabile soltanto quando emerge conoscenza durevole. Aggiorna `STATE.md`, `TASKS.md` e registri nel loro scope; chiudi le task zombie superate da fatti già completati.
7. Riconcilia vault e Agency OS dopo le scritture locali. Prepara un lotto con entità, prima, proposta, prova e rischio. Per task delegate, la presenza soltanto nel vault è un disallineamento operativo.
8. Mostra il lotto remoto e ottieni approvazione sul contenuto esatto prima di eseguirlo. Precompila ogni campo disponibile e chiedi insieme soltanto quelli obbligatori mancanti.
9. Dopo l'applicazione, rileggi Agency OS, rigenera il confronto, la dashboard e lo stato di radice. Esegui di nuovo i controlli offline.
10. Se il vault usa Git e le sue istruzioni prevedono il commit di chiusura, crea un commit locale in italiano contenente soltanto i file della sessione. Non eseguire push manuali quando il vault usa una sincronizzazione propria.

Concludi distinguendo: aggiornamenti locali, lotto remoto applicato o ancora da approvare, copertura, verifiche e residui.
