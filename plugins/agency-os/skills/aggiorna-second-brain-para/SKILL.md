---
name: aggiorna-second-brain-para
description: Analizza la struttura corrente di un second brain PARA e aggiorna, riclassifica o riordina note e cartelle preservando media, link e governance. Usala per sistemare il vault esistente, fare triage o correggere drift strutturale.
---

# Aggiorna Second Brain Para

Leggi [metodo-para.md](../agency-os-operations/references/metodo-para.md). Parti sempre dalla struttura realmente presente: inventario, istruzioni ereditate, template, indici, link e stato Git. Se più vault sono plausibili, chiedi soltanto il percorso.

## Analisi

1. Identifica radice, bucket PARA, aree/clienti, progetti e archivi.
2. Trova file fuori scope, progetti senza outcome o scadenza, aree trattate come progetti, duplicazioni, gusci di governance, inbox vecchie, link rotti e contenuti chiusi ancora attivi.
3. Precompila per ogni elemento destinazione, nuovo nome, stato, link da aggiornare e motivazione usando le convenzioni del livello più vicino.
4. Se una classificazione resta ambigua, raggruppa tutte le domande necessarie in un unico messaggio. Non indovinare lo scope.

## Aggiornamento

Per una correzione puntuale già inequivoca, applica la modifica e verifica. Per una riorganizzazione ampia, mostra prima un piano di mosse con conteggi e impatto sui link.

- Sposta, non cancellare, media e documenti binari.
- Non eliminare `_Inbox/` né file di governance con contenuto unico.
- Non creare `CLAUDE.md` o `MEMORY.md` di puro boilerplate.
- Aggiorna percorsi Markdown, wikilink e frontmatter secondo le loro diverse basi.
- Mantieni l'archivio nel perimetro dell'area o cliente di origine.
- Preserva modifiche Git non pertinenti e usa operazioni recuperabili.

Rigenera indici e contatori dal contenuto reale, poi conta i residui della categoria corretta. Concludi con file mossi, link aggiornati, elementi lasciati invariati, ambiguità e verifica finale.
