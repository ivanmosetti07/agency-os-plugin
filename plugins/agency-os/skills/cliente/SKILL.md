---
name: cliente
description: Crea, consulta o modifica clienti Agency OS con anagrafica, relazioni, stato, team e contesto precompilati. Usala per onboarding, aggiornamenti, archiviazione o pulizia di una scheda cliente.
---

# Cliente

Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e i [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Scopri tool e schemi correnti nei toolset `clients` (anche la rubrica delle persone, `*_crm_*`), `leads`, `projects`, `team` e `knowledge`.

## Creare un cliente

Cerca prima duplicati con ragione sociale, nome, dominio, email e sinonimi. Verifica che non sia ancora un lead: `one_off` da solo non distingue un lead da un cliente acquisito; controlla flag, fase commerciale e riferimenti collegati.

Precompila agenzia, tipo, anagrafica, settore, contatti, owner, team, note operative e relazioni dai dati verificati. Non inserire importi o condizioni economiche nella scheda condivisa. Se restano obbligatori mancanti o più clienti omonimi, chiedi tutto insieme mostrando quanto già risolto. Dopo la creazione verifica ID, tipo, agenzia e assegnazioni.

## Modificare un cliente

Leggi cliente, lead, progetti, task, preventivi e contratti collegati. Applica soltanto il delta e non sovrascrivere note o contatti non citati. Prima di archiviare elenca i riferimenti ancora attivi: nessuna entità si chiude automaticamente a cascata.

Lo stato del cliente (Top, In linea, A rischio) lo calcola Agency OS da progetti, fatture scadute oltre 30 giorni, meeting e segnali positivi: leggilo con `get_health` (`entity_type: "client"`) e riporta il motivo. Lo stato manuale lo imposta solo un admin con `set_health`. Per il riquadro “Aggiornamento” usa `publish_entity_update` (`entity_type: "client"`), precompilando semaforo, sintesi, blocchi e prossimi passi e mostrando l'anteprima prima di pubblicare: la risposta deve dire `recognized_by_ui: true`, e non cambia lo stato. Se la pubblicazione non riesce, fornisci il testo pronto e non dichiararlo aggiornato.

## Persone del cliente (rubrica)

Le persone del cliente (titolare, referenti, fornitori) stanno nella rubrica dell'agenzia, Risorse → Contatti, e non sono utenti dell'app: per il team usa i tool `team`. Prima di aggiungerne una cerca con `list_crm_people` (nome, email o `client_id`). Crea con `upsert_crm_person` passando `client_id` (o `project_id`) e `relation_role`: se l'email è già in rubrica collega la persona esistente invece di crearne un doppione (`reused: true`). Per collegare una persona già presente a un altro cliente o progetto usa `link_crm_person`; `is_primary: true` la segna come contatto principale. Togli un collegamento con `unlink_crm_person` e archivia chi non serve più con `archive_crm_person`. I referenti passati in `contacts` (e `contact_email`/`contact_phone`) a `create_client` o `update_client` entrano anche nella rubrica come persone collegate al cliente: controlla il campo `crm` della risposta. Chi esce dall'elenco resta in rubrica: scollegalo con `unlink_crm_person`.

## Relazione con una persona

Ogni persona ha un profilo di relazione: `tone_of_voice` (come parlargli e scrivergli), `preferences`, `personal_notes` (cose dette di persona da ricordare) e `decision_role`. Prima di scrivere a qualcuno o di preparare un incontro leggi `get_crm_person_relationship`: profilo, ultimo contatto, storico (note e meeting in cui la sua email era tra gli invitati) e analisi salvate.

Quando registri o chiudi un meeting di Agency OS, collega le persone della rubrica che c'erano con `set_crm_meeting_person` (`list_crm_meeting_people` per vedere chi c'è già): il meeting entra nel loro storico e nell'ultimo contatto. Dopo un contatto fuori dai meeting (meet di persona, telefonata, messaggio) registra cosa vi siete detti con `log_crm_interaction`: sintesi pulita, fatti, decisioni e impressioni, con `kind`, data e clima. Se emergono tono, preferenze o note personali nuove, aggiorna il campo con `upsert_crm_person` passando il testo completo (unisci il vecchio con il nuovo, non solo l'aggiunta) e dillo all'utente. Correggi con `update_crm_interaction`; `delete_crm_interaction` chiede conferma.

Per l'analisi leggi la relazione e salva con `save_crm_person_insight`: sintesi, come parlargli, tratti dedotti con il perché, rischi, prossime azioni con il perché e quando, bozza del prossimo messaggio. Distingui i fatti dalle deduzioni, non inventare e non annotare dati sensibili (salute, religione, politica) se non servono al lavoro. Le azioni consigliate restano un elenco: non creare task se l'utente non lo chiede.
