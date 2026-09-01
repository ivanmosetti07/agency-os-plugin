---
name: agency-os-operations
description: Workflow generale e fallback per operazioni trasversali su Agency OS tramite MCP, inclusi finanza, contratti, chat, knowledge e allegati. Usala quando la richiesta attraversa più domini o non è coperta da una skill dedicata; per task, progetti, clienti, business, preventivi, meeting e PED preferisci la skill specifica.
---

# Operazioni Agency OS

Usa l'MCP Agency OS come superficie condivisa del lavoro dell'agenzia. Applica sempre i controlli di questo documento, anche quando una richiesta sembra semplice.

## 1. Classifica il risultato richiesto

Determina se l'utente chiede una lettura, una proposta o una scrittura.

- Per una lettura, non mutare dati.
- Per una proposta, prepara un lotto verificabile e fermati prima dell'applicazione.
- Per una scrittura, mostra prima il lotto e ottieni approvazione esplicita se non è già stata data sul contenuto esatto.
- Non ampliare una richiesta di diagnosi in una correzione.

## 2. Scopri il catalogo corrente

Non memorizzare nomi e schemi dei tool. Il catalogo è versionato e può cambiare.

1. Usa `list_toolsets` o `search_tools`.
2. Leggi `get_tool_schema` per i tool candidati.
3. Scegli l'executor coerente con l'impatto: lettura, scrittura o operazione critica.
4. Per operazioni critiche rispetta sempre scope, ruolo, `confirm` e conferme nominali richieste dal server.

## 3. Rendi esplicita la copertura

Per ogni lista o confronto registra almeno: agenzia, tipo di entità, limite richiesto, record restituiti, presenza di paginazione o saturazione e motivo di eventuali record non letti. Se una pagina arriva esattamente al limite, non dichiarare la copertura completa finché non hai seguito il cursore.

Quando lavori su più agenzie, passa l'identificativo dell'agenzia a ogni tool che lo supporta. Non interpretare `resource_not_found` come un problema di permessi prima di aver verificato il contesto agenzia.

Per Economics e Qonto, considera sempre indivisibile la coppia agenzia–conto collegato: risolvi prima l'agenzia attiva, non riusa risultati o identificativi ottenuti sotto un'altra agenzia e non sommare conti diversi. Se il conto selezionato è assente, chiuso o non verificabile, fermati con un errore esplicito; non scegliere un conto alternativo. Fatture e movimenti Qonto non attribuiti in modo deterministico restano esclusi da totali e analisi.

## 4. Distingui dichiarazioni e prove

Uno stato di successo non prova che la mutazione sia avvenuta. Cerca l'identificativo creato, `changed_fields`, il timestamp pertinente o una rilettura della superficie primaria.

- Una ricerca vuota non prova che il dato non esista: ripetila con il vocabolario dell'interfaccia e sinonimi ragionevoli.
- Non fondere numeri o affermazioni provenienti da passaggi distinti.
- Conserva avvertenze e grado di incertezza fino all'output finale.
- Se uno strumento non vede un dato, descrivi il limite dello strumento invece di attribuire il fatto a una persona.

## 5. Proteggi le superfici condivise

Clienti, progetti, task, meeting, chat, knowledge, asset ed editoriale possono essere letti da collaboratori autorizzati. Non inserire importi, condizioni economiche o segreti in testo libero su queste superfici.

Usa preventivi, finanza, contratti e lead per le informazioni amministrative. La spesa pubblicitaria può restare nella delivery quando è già visibile al cliente. Redigi i dati sensibili prima della persistenza, non con una pulizia successiva.

`qonto_id` è un campo di provenienza in sola lettura: non inviarlo nei tool di creazione o modifica di fatture. Solo il sincronizzatore Qonto può creare o aggiornare documenti marcati con un identificativo Qonto.

## 6. Applica le cautele operative

Leggi [campi-e-mutazioni.md](./references/campi-e-mutazioni.md) prima di creare o modificare qualunque entità. Precompila tutto ciò che è ricavabile senza ambiguità e chiedi in un solo messaggio i soli campi obbligatori rimasti scoperti.

Leggi [controlli-di-sicurezza.md](./references/controlli-di-sicurezza.md) prima di operare su preventivi, lead, spese, calendario o archiviazioni.

Per riconciliare Agency OS con un altro sistema, leggi [riconciliazione.md](./references/riconciliazione.md). La lettura, il confronto offline e il controllo di salute sono responsabilità separate.

## 7. Verifica dopo la scrittura

Rileggi la superficie che l'utente o il collaboratore vedrà davvero. Scegli un valore di prova che produca un risultato diverso dal default; un test che restituisce lo stesso esito anche quando la modifica manca non è una verifica.

Concludi indicando copertura, prove osservate, modifiche applicate, elementi non letti e prossima azione sicura.
