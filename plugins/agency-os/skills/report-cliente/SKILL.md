---
name: report-cliente
description: Prepara, aggiorna, verifica e consegna il report dei risultati a un cliente in Agency OS (report mensile, trimestrale o di campagna con numeri, grafici, sezioni per servizio e priorità), partendo dal report precedente o da un modello. Usala per report cliente, report mensile, consegna risultati e link del report.
---

# Report cliente

Il report cliente è un documento a blocchi che il cliente apre con un link (`/report/<token>`), come il PED. Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Gli strumenti sono nel toolset `kpi`.

## Sequenza

1. **Leggi il report precedente**: `list_client_reports` con `client_id`, poi `get_client_report`. Struttura, fonti e testi del mese scorso sono la base.
2. **Crea il report**: `create_client_report` con `period_label` («Settembre 2026»), date e `comparison_label` («agosto 2026»). Con `start_from: auto` parte dal report precedente: stessi blocchi e dataset, righe e testi svuotati, i numeri scritti a mano diventano il confronto, il vecchio testo resta nella nota interna del blocco come traccia. Senza precedente usa `start_from: template` (`list_client_report_templates`). Un report già pronto in formato artifact.json si importa con `import_client_report_artifact`.
3. **Raccogli i dati** dalle fonti del cliente (Google Ads, Meta Ads, Analytics, newsletter, dashboard) senza inventare nulla. Se un numero non è verificabile, lascialo fuori e dillo.
4. **Carica i dataset**: `upsert_client_report_dataset`, uno per fonte e periodo, con `source_label`, `source_url` e `collected_at`. Le percentuali sono frazioni (0,4937 = 49,37%). Stessa `key` = sostituisce.
5. **Scrivi i blocchi**: `set_client_report_blocks` per tutta la sequenza, oppure `add_` / `update_` / `move_` / `delete_client_report_block` per correzioni puntuali. I numeri dei blocchi `kpi_group` citano i dataset con `ref` (`{dataset, column, row}`), così formato e variazione si calcolano da soli.
6. **Verifica**: `check_client_report`. Gli errori bloccano l'invio, gli avvisi vanno letti.
7. **Chiedi conferma** alla persona, mostrando titolo, periodo, avvisi e cosa vedrà il cliente. Solo dopo il sì esplicito: `publish_client_report` con `mark: ready` (link attivo) o `mark: sent` (consegnato) e `confirm: true`. Restituisci il link.

Il PDF si scarica con `create_client_report_pdf_export` (link firmato di 5 minuti, anche da bozza).

## Struttura consigliata

Copertina → «Il mese in numeri» (`kpi_group`, 3-4 numeri) → sintesi (`highlights`) → periodo e significato dei dati → una sezione per servizio (`section` con `service`), con grafico, tabella e «Prossimo passo» (`callout`) → priorità (`priorities`) → nota «Come leggere i dati» (`note`) → fonti (`sources`, automatico).

## Regole redazionali

- Ogni numero ha una fonte: nella card (`source`) o nel dataset che cita.
- Conserva le cautele: risultati negativi, limiti di attribuzione, interruzioni.
- Non sommare mai ricavi o acquisti di piattaforme diverse (Google Ads, Meta e Analytics si sovrappongono).
- Fuori dal report: note interne, nomi e email del team, fornitori, identificativi delle task, target non concordati. Ciò che serve al team va in `internal_note` o `internal_notes`, che il cliente non vede mai.
- Barre per i confronti, tabelle per la lettura esatta, linee solo con almeno 3 periodi; niente torte e niente curve interpolate.
- Testi chiari per chi non lavora nel marketing: spiega «attribuito», «ROAS», «organico» la prima volta.

Non cancellare report già inviati: archiviali. Non rigenerare il link (`regenerate_client_report_public_link`) senza richiesta esplicita: il vecchio smette di funzionare.
