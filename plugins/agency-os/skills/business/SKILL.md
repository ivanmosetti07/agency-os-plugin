---
name: business
description: Crea, consulta o modifica business interni in Agency OS, distinguendoli dai clienti e precompilando governance, owner, team, obiettivi e stato. Usala quando l'entità è un business dell'agenzia e non un cliente esterno.
---

# Business

Un business può condividere il toolset `clients`, ma deve mantenere il tipo corretto. Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md), poi scopri gli schemi correnti di `clients`, `projects`, `team`, `kpi` e `state`.

## Creare un business

Verifica agenzia e tipo `business`, cerca omonimi e precompila nome, descrizione, settore, owner, team, obiettivi, stato e relazioni. Non trasformare implicitamente un cliente in business e non inventare KPI o target. Raccogli in una sola domanda gli obbligatori non ricavabili, mostra l'anteprima e verifica dopo la creazione ID, tipo e visibilità.

## Modificare un business

Leggi prima business, progetti, membri e attività collegate. Conserva i campi non richiesti, applica il delta minimo e verifica la scheda primaria. Prima di archiviare mostra tutti i riferimenti attivi.

L'“Aggiornamento” periodico con semaforo, sintesi, blocchi e prossimi passi si pubblica con `publish_entity_update` (`entity_type: "client"`, semaforo e sintesi obbligatori): è la stessa scrittura del pannello web e risponde `recognized_by_ui: true`. Precompilalo dai fatti osservati e mostra l'anteprima prima di pubblicare; una versione senza semaforo (`update_entity_state` con il solo `content`) non aggiorna la scheda e non va dichiarata pubblicata.
