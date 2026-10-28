---
name: strategia
description: Crea, compila, verifica e manda al cliente una strategia di marketing in Agency OS (Black Friday, lancio, saldi, piano di campagne) con offerta, fasi, budget, struttura Meta Ads, brief creativi, sito ed email, e gestisce commenti e approvazione del cliente. Usala per strategia cliente, piano promo, strategia Black Friday e per collegare campagne e risultati di Meta Ads alla strategia.
---

# Strategia cliente

La strategia è un documento a blocchi in quattro sezioni (Strategia generale, Meta e creative, Sito, Email) che il cliente apre con un link (`/strategia/<token>`): commenta una sezione o un singolo elemento (un'attività, un brief, un ad set, un'email) e risponde «Approva» o «Richiedi modifiche». Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Gli strumenti sono nel toolset `kpi`.

## Sequenza

1. **Parti da qualcosa**: `list_client_strategies` con `client_id`. Se il cliente ha già una strategia simile, `create_client_strategy` con `start_from: previous` (stessa struttura, senza id e risultati Meta, brief di nuovo «da produrre»). Altrimenti `start_from: template` con un modello di `list_client_strategy_templates` (`ecommerce_promo` per una promo e-commerce tipo Black Friday). Una strategia già scritta per intero si passa con `start_from: blocks`.
2. **Leggi la struttura**: `get_client_strategy` restituisce i blocchi per sezione con `id` e le `items` (chiave e titolo degli elementi). Nel modello la parte fissa (metodo, regole, controlli) è già scritta; la parte variabile del cliente (date, aliquote, importi, percorsi, campagne, brief) va compilata.
3. **Compila**: `upsert_client_strategy_item` per un elemento alla volta (con `merge: true` aggiorna solo i campi passati; per un ad set `parent_key` è la chiave della campagna), `update_client_strategy_block` per riscrivere un blocco intero (rimanda tutti i campi), `add_` / `move_` / `delete_client_strategy_block` per la struttura.
4. **Meta Ads**: Agency OS non legge Meta da solo. Leggi l'account con il connettore Meta Ads (campagne e ad set con id, budget, obiettivo; insights per spesa, acquisti e valore), poi:
   - `import_meta_structure_to_strategy` collega campagne e ad set ai blocchi «Campagne e ad set» (per `strategy_key`, per id già salvato o per nome). I budget di Meta sono in centesimi: passali in euro. `add_missing` aggiunge quello che manca, `overwrite_fields` sostituisce i valori della strategia.
   - `import_meta_results_to_strategy` salva la lettura dei risultati (con `read_at` e `period`) e la collega a campagne, ad set e brief che hanno quell'id.
   Non inventare numeri: se un dato non c'è, lascialo fuori e dillo.
5. **Verifica**: `check_client_strategy`. Gli errori (segnaposto `{{…}}` non compilati, id interni nel testo, budget che non torna col totale, ad set che non sommano la campagna, brief su ad set inesistenti) bloccano l'invio; gli avvisi (attività senza chi o data, conteggi dei brief) vanno letti.
6. **Chiedi conferma** alla persona mostrando titolo, cliente, avvisi e cosa vedrà il cliente. Solo dopo il sì esplicito: `publish_client_strategy` con `confirm: true`. Restituisci il link.

## Dopo l'invio

- `list_client_strategy_feedback` (con `status: open`) mostra i commenti con il nome dell'elemento commentato.
- Correggi la strategia, poi `reply_client_strategy_feedback` con `resolve: "Modifica fatta"` (o «Solo letto» se non serve cambiare nulla); `resolve_client_strategy_feedback` chiude senza rispondere.
- Se il contenuto cambia dopo l'approvazione, la strategia torna «Da approvare». Un'approvazione arrivata a voce o per email si segna con `set_client_strategy_review_status` (con `confirm: true`).
- `save_client_strategy_template` salva una strategia riuscita come modello dell'agenzia.

## Regole redazionali

- Le chiavi degli elementi (`T01`, `C1-A`, `C1-A-01`) tengono agganciati i commenti del cliente: non cambiarle e non riusarle.
- Fuori dal testo per il cliente: note interne, costi e margini non concordati, nomi di fornitori, id delle task. Ciò che serve al team va in `internal_note` del blocco o in `internal_notes` della strategia.
- Ogni attività ha chi e entro quando; ogni brief ha l'ad set (`ad_set_key`) a cui serve.
- Scrivi per chi non lavora nel marketing: spiega MER, ROAS e retargeting la prima volta.

Non eliminare strategie già mandate: archiviale (`archive_client_strategy`). Non rigenerare il link (`regenerate_client_strategy_public_link`) senza richiesta esplicita: il vecchio smette di funzionare.
