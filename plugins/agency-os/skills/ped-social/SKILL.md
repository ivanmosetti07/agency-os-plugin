---
name: ped-social
description: Crea, importa o modifica piani editoriali social e relativi contenuti in Agency OS, precompilando canali, date, copy, formati, media, stato e approvazioni. Usala per PED social, calendario editoriale e contenuti collegati.
---

# Ped Social

PED significa piano editoriale. Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Scopri gli schemi correnti di `editorial`, `clients`, `projects`, `team` e `assets`.

## Creare un PED

Risolvi agenzia, cliente, progetto, periodo e canali. `editorial_plan` e `editorial_content` sono entità diverse: crea o risolvi prima il piano, poi collega i contenuti al suo ID. Precompila strategia, rubriche, frequenza, date, piattaforme, formati, copy, CTA, owner, stato, media e note dai materiali disponibili.

Non inventare date di pubblicazione, canali, destinatari, approvazioni o asset. Se il server non offre creazione multipla, prepara l'intero lotto ma importa un contenuto alla volta con chiave idempotente, verificando ogni ID. Se l'autorizzazione scade durante il lotto, fermati e chiedi di ri-autorizzare; non ripartire duplicando gli elementi già creati.

## Modificare un PED

Leggi piano, contenuti, feedback, allegati e stato di revisione. Mantieni gli ID e applica delta puntuali. Pubblicazione, invio in revisione, rigenerazione di link e upload verso canali esterni sono azioni distinte che richiedono approvazione sul lotto esatto.

Non cancellare mai i media. Verifica il piano nella stessa vista usata dall'utente: un conteggio dell'entità sbagliata non prova che i contenuti siano comparsi.
