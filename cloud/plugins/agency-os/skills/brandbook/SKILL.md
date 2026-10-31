---
name: brandbook
description: Crea, compila, verifica e manda al cliente un brandbook in Agency OS (strategia di marca, valori, personalità, nome, tono di voce, logo, identità visiva, fotografia, animazioni, suono, social, applicazioni) con tavole HTML e media, e gestisce commenti e approvazione del cliente. Usala per brandbook, manuale d'identità, linee guida del brand e brand guidelines.
---

# Brandbook

Il brandbook è un documento a capitoli che il cliente apre con un link (`/brandbook/<token>`): commenta un capitolo o una singola voce e risponde «Approva» o «Richiedi modifiche». Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Gli strumenti sono nel toolset `clients`.

## Struttura

- **Capitoli** con `key` stabile, titolo, occhiello, introduzione e la nota «Fonte, approvatore, data» (`review_note`).
- **Voci** raggruppate per `group_title`, di quattro tipi:
  - `field`: testo in markdown, con `source` (da dove viene: workshop, documento, decisione);
  - `board`: tavola in HTML libero, con CSS, script e animazioni, che gira isolata nel documento;
  - `media`: un'immagine, un video o un audio della libreria, con didascalia;
  - `note`: una nota guida.
- **Tema**: colori (`accent`, `paper`, `ink`, `muted`, `line`), font di Google Fonts (`fontTitle`, `fontBody`), logo, copertina in HTML, piè di pagina; più CSS e script propri del brand.
- **Media**: si caricano dall'app (scheda Media dell'editor) e vanno sul Drive dell'agenzia in Cliente / Brandbook / titolo. Via MCP si leggono con `list_brandbook_media` e si citano con il segnaposto `{{media:<id>}}` in tavole, copertina e script, o con `media_id` nelle voci media.

## Sequenza

1. **Parti da qualcosa**: `list_brandbooks` con `client_id`. Poi `create_brandbook` dal modello standard (17 capitoli, circa 320 voci con le loro key), da un modello dell'agenzia (`list_brandbook_templates`, `start_from: saved_template`) o dalla struttura di un altro brandbook (`start_from: brandbook`).
2. **Leggi la struttura**: `get_brandbook` restituisce capitoli e voci con `id`, `key`, tipo e valori, i media con il segnaposto e la verifica. Le tavole lunghe arrivano troncate: `include_html: true` per leggerle intere.
3. **Compila**:
   - `set_brandbook_fields` per molte voci insieme, per `key` (es. `strategia-0-0` = Purpose). Le key sconosciute fanno fallire tutto con l'elenco.
   - `update_brandbook_item` per una voce per `item_id`, anche senza key (tavole, media, didascalie, gruppo, nascosta).
   - `add_brandbook_item` per voci nuove (in fondo al gruppo o dopo `after_item_id`); con `chapter_title` crea un capitolo nuovo.
   - `update_brandbook` per titolo, tema, CSS e script. Il tema si sostituisce intero: leggilo prima.
   Non inventare contenuti del brand: se un'informazione non c'è, lascia la voce vuota e dillo.
4. **Verifica**: il `check` di `get_brandbook`. Gli errori (voce media senza file, segnaposto di un media che non esiste più, nessun capitolo visibile) bloccano l'invio; le voci vuote sono avvisi.
5. **Chiedi conferma** alla persona mostrando titolo, cliente, avvisi e cosa vedrà il cliente. Solo dopo il sì esplicito: `publish_brandbook` con `confirm: true`. Restituisci il link.

## Tavole HTML

- Scrivi HTML completo della tavola, con le sue classi; gli stili comuni vanno nel CSS del brand (`custom_css`), gli script nelle tavole o in `custom_scripts`.
- Le tavole girano in un documento isolato: niente cookie, niente accesso ad Agency OS. Non caricare script da siti sconosciuti.
- Immagini e video non vanno incorporati in base64: carica il file dall'app e usa il segnaposto. Il salvataggio di un brandbook non può superare circa 2,9 MB.

## Dopo l'invio

- `list_brandbook_feedback` (con `status: open`) mostra i commenti con il punto commentato (`chapter:<id>`, `item:<id>` o `general`).
- Correggi il brandbook, poi `resolve_brandbook_feedback` con `reply` (la risposta compare sul link e chiude i commenti aperti di quel punto) o senza `reply` per segnarlo come gestito.
- Se il contenuto cambia dopo l'approvazione, il brandbook torna «In revisione».
- `disable_brandbook_link` chiude il link (con conferma); `remove_brandbook_item` toglie una voce (con conferma): per toglierla solo dal documento usa `hidden: true`.

## Regole redazionali

- Le key e gli id delle voci tengono agganciati i commenti del cliente: non cambiarli e non riusarli.
- Fuori dal testo per il cliente: note interne, costi, nomi di fornitori. Ciò che serve al team va in `internal_note` della voce o in `internal_notes` del brandbook.
- Ogni capitolo dice chi l'ha deciso e quando nella `review_note`.
- Scrivi per chi non lavora nel marketing: frasi corte, esempi concreti, niente gergo non spiegato.
