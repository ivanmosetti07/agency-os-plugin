# Controlli di sicurezza operativi

## Preventivi

- `accepted` non è prova sufficiente: confronta data di prima visualizzazione, data di accettazione e segnali di conferma disponibili.
- `sent` non è prova sufficiente: verifica data di invio e stato del link pubblico.
- Se due campi importo divergono, non scegliere quello più conveniente: segnala l'incoerenza senza propagare un totale non verificato.

## Lead e clienti

- `one_off` non distingue un lead da un cliente acquisito. Verifica anche flag lead, fase commerciale e riferimenti collegati.
- Prima di creare un cliente, cerca duplicati con nome, dominio, email e sinonimi.

## Spese

- Prima di creare una spesa ricorrente, verifica se un'integrazione bancaria la importa automaticamente.
- Usa una chiave idempotente stabile e verifica il record creato per evitare duplicati dopo retry.
- Per dati Qonto, risolvi l'agenzia e il suo conto collegato prima di leggere o riconciliare movimenti. Non usare il primo conto disponibile, non aggregare tutti i conti e non mantenere risultati dopo un cambio agenzia.
- Non includere nei totali transazioni o fatture prive di un collegamento deterministico al conto dell'agenzia attiva.
- Non impostare o modificare `qonto_id`: è riservato al sincronizzatore Qonto.

## Calendario e meeting

- Un calendario vuoto non prova che una giornata sia libera: dichiara quali calendari e finestre temporali sono stati letti.
- Un meeting presente in Agency OS può non essere ancora sincronizzato su un calendario esterno. Non dichiarare la sincronizzazione senza identificativo esterno o rilettura del calendario.

## Chiusure e archiviazioni

- Le entità non si chiudono necessariamente a cascata. Prima di archiviare o eliminare, elenca lead, preventivi, progetti, task, contratti e allegati che referenziano l'entità.
- Le eliminazioni definitive richiedono il flusso critico del server e una conferma nominale. Non aggirarlo.

## Scritture esterne

Invii, pubblicazioni, upload verso terzi, cambi di accesso e operazioni irreversibili richiedono una proposta leggibile e approvazione esplicita sul lotto esatto.
