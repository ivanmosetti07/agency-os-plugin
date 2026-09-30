# Campi precompilati e mutazioni

## Contratto dei campi

Prima di creare o modificare un'entità, leggi lo schema corrente con `get_tool_schema` e costruisci internamente una matrice con campo, valore, fonte e grado di certezza.

Precompila in quest'ordine:

1. valori espliciti nella richiesta;
2. valori correnti dell'entità, quando si tratta di una modifica;
3. relazioni già verificate in Agency OS;
4. dati non ambigui nel contesto o nel vault;
5. default dichiarati dallo schema o dal server.

Non sostituire mai un campo esistente con vuoto, `null` o un default soltanto perché non è stato citato. In modifica invia il delta minimo. In creazione ometti i campi opzionali sconosciuti affinché sia il server ad applicare i propri default.

Non inventare mai identificativi, agenzia, cliente, destinatari, assegnatari, date, importi, aliquote, condizioni legali, permessi o stato di pubblicazione. Un valore ricavato dal nome va prima risolto in un ID univoco. Se più risultati sono plausibili, chiedi quale usare.

Se restano campi obbligatori o ambiguità che cambiano il risultato, fai una sola domanda compatta che:

- mostra ciò che è già precompilato;
- elenca soltanto i dati mancanti;
- propone opzioni reali quando sono state lette dal sistema;
- non chiede informazioni recuperabili con una lettura disponibile.

## Creazione

1. Cerca duplicati con nome, relazioni, date e sinonimi pertinenti.
2. Scopri il tool di creazione e il suo schema corrente.
3. Risolvi le relazioni e prepara tutti i campi.
4. Mostra un riepilogo leggibile del record che verrà creato.
5. Se la richiesta non autorizza già quel contenuto esatto, fermati prima della scrittura.
6. Esegui con una chiave idempotente stabile quando supportata.
7. Rileggi il record e verifica ID, relazioni, timestamp e campi osservabili.

## Modifica

1. Risolvi l'entità senza affidarti al solo titolo.
2. Leggi il record corrente e le entità collegate che possono essere impattate.
3. Costruisci il delta minimo e segnala effetti collaterali o riferimenti non aggiornati a cascata.
4. Mostra prima/dopo per i soli campi modificati.
5. Esegui soltanto il lotto approvato.
6. Rileggi la superficie primaria che vedrà l'utente, usando una prova capace di fallire.

Una risposta `success` non basta: la prova è un ID creato, `changed_fields`, il timestamp pertinente o la rilettura del valore modificato.
