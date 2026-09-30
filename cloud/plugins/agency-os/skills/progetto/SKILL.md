---
name: progetto
description: Crea, consulta o modifica progetti Agency OS, risolvendo cliente o business, team, workflow, obiettivi, date e stato. Usala per schede progetto, avanzamento, membri e aggiornamenti periodici.
---

# Progetto

Leggi [campi e mutazioni](../agency-os-operations/references/campi-e-mutazioni.md) e i [controlli di sicurezza](../agency-os-operations/references/controlli-di-sicurezza.md). Scopri gli schemi correnti nei toolset `projects`, `clients`, `team`, `tasks` e `kpi`.

## Creare un progetto

Risolvi agenzia e cliente/business, cerca duplicati e precompila nome, descrizione, outcome, workflow, stato, date, team, owner, tag e KPI dai dati verificati. Un progetto deve avere un outcome e, quando il workflow lo richiede, una scadenza. Non inserire importi o condizioni economiche nel testo condiviso; usa preventivi e superfici amministrative.

Mostra l'anteprima completa. Se restano relazioni o campi obbligatori ambigui, chiedili in un unico messaggio. Dopo la creazione verifica ID, relazione col cliente, membri e visibilità.

## Modificare un progetto

Leggi progetto, membri, task aperte e riferimenti prima di costruire il delta. Non chiudere o archiviare assumendo una cascata: elenca prima task, preventivi, contratti e allegati collegati. Verifica poi la scheda realmente visibile ai collaboratori.

Il riquadro periodico “Aggiornamento” con semaforo, sintesi, blocchi e prossimi passi si pubblica con `publish_entity_update` (`entity_type: "project"`, semaforo e sintesi obbligatori): è la stessa scrittura del pannello web e la scheda la mostra come «Aggiornamento del responsabile» per sette giorni (`recognized_by_ui: true`, `valid_until`). Precompila i quattro campi dai fatti correnti e mostra l'anteprima prima di pubblicare; se la pubblicazione non riesce, consegna il blocco pronto e dichiaralo non pubblicato.
