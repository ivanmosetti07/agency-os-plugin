# Metodo PARA del second brain

## Struttura

La radice del vault usa:

```text
1_Progetti/
2_Aree/
3_Risorse/
4_Archivio/
```

La stessa struttura, con gli stessi prefissi, si ripete dentro ogni area e cliente. Un progetto ha outcome e scadenza; un'area è una responsabilità continuativa; una risorsa è conoscenza riutilizzabile; l'archivio conserva ciò che è chiuso nel proprio perimetro. L'archivio di un'area resta dentro quell'area.

Nel root di un'area rimangono soltanto file di governance. Documenti, strategie, knowledge e iniziative scendono nel bucket corretto.

## Governance

- `AGENTS.md`: regole operative specifiche della cartella; istruzioni e skill condivise vivono in `.agents/`, con le skill in `.agents/skills/`. Non creare `CLAUDE.md`, varianti di maiuscole o cartelle `.claude`; non ripristinare istruzioni ritirate.
- `MEMORY.md`: identità e conoscenza stabile.
- `INDEX.md`: navigazione orientata al compito.
- `STATE.md`: snapshot corrente.
- `TASKS.md`: backlog con `Now`, `Next`, `Later` e completati recenti.
- `DASHBOARD.md`: vista generata della radice; non si modifica a mano.

Ogni fatto ha un solo scope e una sola fonte di verità; gli altri file lo collegano invece di copiarlo.

## Naming e cronologia

Usa kebab-case minuscolo e date ISO. I contenuti usano, quando pertinenti, `DECISION-`, `MEMO-`, `SOP-`, `KB-`, `PLAN-`, `DRAFT-` o `REPORT-`; i file di governance non hanno prefisso.

I registri vivono in `3_Risorse/log/<AAAA-MM>/<AAAA-MM-GG>.md`. Le entry iniziano con la data; l'etichetta di provenienza viene dopo. Indici e contatori si rigenerano dal contenuto reale.

## Invarianti di sicurezza

- Non cancellare mai media o documenti binari. Spostali preservando il file; se devono uscire da Git, rimuovili soltanto dall'indice.
- Non eliminare mai `_Inbox/`. I materiali nuovi e ancora grezzi entrano lì e vengono triagiati entro sette giorni.
- Prima di spostare file, individua link Markdown, wikilink e riferimenti di frontmatter. Nel corpo i percorsi sono relativi al file; nel frontmatter e nei wikilink con slash sono relativi alla radice.
- Una migrazione finisce contando i residui e verificando i link, non contando soltanto i file spostati.
- Ogni scrittura esterna richiede un lotto leggibile e autorizzazione sul suo scope. Per operazioni Agency OS certe già autorizzate applica [riconciliazione.md](riconciliazione.md), senza un secondo consenso identico. Dubbi, nuovi effetti esterni, invii, pubblicazioni e permessi richiedono la decisione pertinente; rispetta comunque le conferme del server.
