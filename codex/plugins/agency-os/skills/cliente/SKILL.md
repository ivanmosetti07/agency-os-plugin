---
name: cliente
description: Crea, consulta o modifica clienti Agency OS con anagrafica, relazioni, stato, team e contesto precompilati. Usala per onboarding, aggiornamenti, archiviazione o pulizia di una scheda cliente.
---

# Cliente

Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e i [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Scopri tool e schemi correnti nei toolset `clients`, `leads`, `projects`, `team` e `knowledge`.

## Creare un cliente

Cerca prima duplicati con ragione sociale, nome, dominio, email e sinonimi. Verifica che non sia ancora un lead: `one_off` da solo non distingue un lead da un cliente acquisito; controlla flag, fase commerciale e riferimenti collegati.

Precompila agenzia, tipo, anagrafica, settore, contatti, owner, team, note operative e relazioni dai dati verificati. Non inserire importi o condizioni economiche nella scheda condivisa. Se restano obbligatori mancanti o più clienti omonimi, chiedi tutto insieme mostrando quanto già risolto. Dopo la creazione verifica ID, tipo, agenzia e assegnazioni.

## Modificare un cliente

Leggi cliente, lead, progetti, task, preventivi e contratti collegati. Applica soltanto il delta e non sovrascrivere note o contatti non citati. Prima di archiviare elenca i riferimenti ancora attivi: nessuna entità si chiude automaticamente a cascata.

Lo stato del cliente (Top, In linea, A rischio) lo calcola Agency OS da progetti, fatture scadute oltre 30 giorni, meeting e segnali positivi: leggilo con `get_health` (`entity_type: "client"`) e riporta il motivo. Lo stato manuale lo imposta solo un admin con `set_health`. Per il riquadro “Aggiornamento” usa `publish_entity_update` (`entity_type: "client"`), precompilando semaforo, sintesi, blocchi e prossimi passi e mostrando l'anteprima prima di pubblicare: la risposta deve dire `recognized_by_ui: true`, e non cambia lo stato. Se la pubblicazione non riesce, fornisci il testo pronto e non dichiararlo aggiornato.
