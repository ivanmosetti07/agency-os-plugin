---
name: presentazioni
description: Crea e aggiorna in Agency OS workshop e corsi fatti di presentazioni HTML (moduli, lezioni, slide, copione del docente), carica i file sul Drive del progetto, modifica i testi delle slide e delle note e prepara link pubblico e codice iframe. Usala per workshop, corsi, lezioni, slide HTML e presentazioni da condividere o incorporare in un sito.
---

# Presentazioni

In Marketing → Presentazioni ogni presentazione è di un cliente e di un suo progetto. I file finiscono sul Drive del progetto, in Presentazioni / titolo / modulo / lezione. Leggi [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Gli strumenti sono nel toolset `clients`.

## Cos'è cosa

- **Workshop**: una sola presentazione. Nasce con la sua lezione: l'id è in `decks[0]` di `get_presentation`.
- **Corso**: moduli → lezioni. Ogni lezione è una presentazione.
- **Presentazione**: una pagina HTML autonoma (JS, CSS, font e immagini dentro il file, a volte con file relativi accanto come `assets/…`). Si carica così com'è e il link la mostra identica, in un iframe isolato. Non riscriverla per «adattarla».
- **Copione del docente** (`role: "script"`): un HTML per lezione, visibile solo al team, mai dal link.

## Sequenza

1. **Trova o crea**:
   - `list_presentations` con `client_id`;
   - poi `create_presentation` con `kind` (`workshop` o `course`), `title`, `client_id` e `project_id` (il progetto deve essere di quel cliente).
2. **Struttura del corso**:
   - `create_presentation_module` per ogni modulo;
   - `create_presentation_lesson` con `module_id` e titolo; lo slug del link si ricava dal titolo;
   - `reorder_presentation_items` per l'ordine.
3. **Carica le slide**:
   - **HTML fino a 3 MB senza file accanto**: `upload_presentation_html` con `deck_id` e `html`.
   - **File più grandi o con cartelle**:
     1. `create_presentation_upload` con l'elenco `files` (`path` relativo, `size` in byte);
     2. `PUT` di ogni file sul suo `upload_url`;
     3. `finalize_presentation_upload` con gli stessi `files`.

     Un solo `.zip` viene scompattato. Se in radice ci sono più HTML, indica `entry_path`.
   - **Copione**: lo stesso, con `role: "script"`.
   Ogni caricamento crea una versione nuova della lezione.
4. **Testi**: per correggere parole senza toccare la grafica:
   1. `get_presentation_texts` (testi numerati `n` per slide e note del docente per slide);
   2. `update_presentation_texts` con `version` (quella letta), `texts` (`{"12": "nuovo testo"}`) e/o `notes` (`{"3": {"speechRaw": "…"}}`).

   Il resto del file resta identico. I testi creati dagli script non compaiono: per quelli serve un nuovo caricamento.
5. **Versioni**: `list_presentation_versions` e `restore_presentation_version`, che crea una versione nuova uguale a quella scelta.
6. **Condividi**:
   - `set_presentation_sharing` con `public` (link), `embed` (iframe in altri siti) e `show_notes` (note del docente nel link; di base no);
   - `get_presentation_share` restituisce il link del workshop o del corso, il link di ogni lezione e i codici iframe;
   - chiedi alla persona se le note del docente devono vedersi prima di accenderle.

## Regole

- Prima di caricare chiedi il cliente e il progetto giusti: decidono la cartella Drive.
- Non togliere né riscrivere script, stili o immagini dell'HTML: la presentazione deve restare identica.
- `regenerate_presentation_link` rompe il link e gli iframe già incollati, `delete_presentation_lesson` e `delete_presentation_module` tolgono lezioni: chiedi conferma e passa `confirm: true` solo dopo il sì esplicito. I file restano comunque sul Drive.
- Le note del docente e il copione sono materiale interno: nel link pubblico solo se la persona lo chiede.
