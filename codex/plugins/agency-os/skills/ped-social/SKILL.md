---
name: ped-social
description: Crea, importa o modifica piani editoriali social e relativi contenuti in Agency OS, precompilando canali, date, copy, formati, media, stato e approvazioni. Usala per PED social, calendario editoriale e contenuti collegati.
---

# Ped Social

PED significa piano editoriale. Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Scopri gli schemi correnti di `editorial`, `clients`, `projects`, `team` e `assets`.

## Creare un PED

Risolvi agenzia, cliente, progetto, periodo e canali. `editorial_plan` e `editorial_content` sono entità diverse: crea o risolvi prima il piano, poi collega i contenuti al suo ID. Precompila strategia, rubriche, frequenza, date, piattaforme, formati, copy, CTA, owner, stato, media e note dai materiali disponibili.

Non inventare date di pubblicazione, canali, destinatari, approvazioni o asset. Se il server non offre creazione multipla, prepara l'intero lotto ma importa un contenuto alla volta con chiave idempotente, verificando ogni ID. Se l'autorizzazione scade durante il lotto, fermati e chiedi di ri-autorizzare; non ripartire duplicando gli elementi già creati.

I post del PED sono schede `editorial_plan_item` (`create_editorial_plan_item`, `update_editorial_plan_item`), non contenuti social `editorial_content`: usa `create_editorial_content` solo se l'utente chiede il calendario social del progetto.

## Caricare i media dei post

Per un file locale: `create_asset_upload` con `scope_type=editorial_plan` e `scope_id` uguale all'ID del PED, carica il file con PUT sull'`upload_url` restituito, chiama `finalize_asset_upload` e infine `attach_editorial_plan_asset` con `asset_id` e `item_id` della scheda. Per un file già su Google Drive o Canva usa `add_editorial_plan_media_link`. Verifica con `get_editorial_plan` che ogni scheda abbia i suoi media.

## Stato del PED

`set_editorial_plan_review_status` imposta `draft`, `in_review`, `changes_requested` o `approved`. Per `approved` senza `reviewer_name` l'approvazione viene registrata a nome dell'utente collegato: chiedi conferma prima di approvare a nome del cliente.

## Modificare un PED

Leggi piano, contenuti, feedback, allegati e stato di revisione. Mantieni gli ID e applica delta puntuali. Pubblicazione, invio in revisione, rigenerazione di link e upload verso canali esterni sono azioni distinte che richiedono approvazione sul lotto esatto.

Non cancellare mai i media. Verifica il piano nella stessa vista usata dall'utente: un conteggio dell'entità sbagliata non prova che i contenuti siano comparsi.
