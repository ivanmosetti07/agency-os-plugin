---
name: preventivo
description: Crea, consulta o modifica preventivi Agency OS con cliente, voci, importi, validità, presentazione e stato precompilati quando verificabili. Usala anche per invio, link pubblico, accettazione e controllo delle anomalie di un preventivo.
---

# Preventivo

I preventivi appartengono alla superficie amministrativa. Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md), poi scopri schemi e impatto dei toolset `quotes`, `clients`, `leads`, `finance` e `assets`.

## Creare un preventivo

Risolvi agenzia, cliente o lead e cerca bozze equivalenti. Precompila intestazione, oggetto, voci, quantità, prezzi, ricorrenza, sconti, imposte, valuta, validità, modalità di presentazione, note e allegati soltanto da fonti verificate. Non inventare mai importi, aliquote, condizioni, scadenze o destinatari.

Calcola i totali soltanto secondo lo schema corrente e segnala qualsiasi divergenza fra campi economici. Mostra un riepilogo completo; chiedi insieme i soli obbligatori mancanti. La creazione della bozza non autorizza invio, pubblicazione o rigenerazione del link.

## Modificare un preventivo

Leggi record, voci, link e date di stato. Applica il delta minimo e ricalcola in modo verificabile. Invio, pubblicazione, accettazione manuale e rigenerazione del link sono azioni separate da confermare sul risultato esatto.

`accepted` non prova l'accordo se la data coincide con la prima visualizzazione. `sent` non prova l'invio senza data di invio e link attivo. Dopo ogni azione verifica la superficie pubblica o il timestamp pertinente senza esporre il link nel report se non richiesto.
