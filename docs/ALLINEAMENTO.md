# Allineamento con l'MCP

Il codice dell'MCP vive nel repository privato `Agency-OS`; questo repository distribuisce soltanto manifest, istruzioni e riferimenti non segreti.

Ogni modifica a endpoint, autenticazione, catalogo, nomi o schemi dei tool, risorse MCP Apps, profili, scope o workflow operativi richiede nello stesso intervento:

1. aggiornamento di `mcp-server/plugin-contract.json` nel repository sorgente;
2. aggiornamento di `contract/mcp-contract.json` in questo repository;
3. aggiornamento dei manifest o della skill quando cambia il comportamento osservabile;
4. stessa versione semantica nei manifest Claude e Codex;
5. esecuzione di `npm run check` e del controllo con `--source` da una checkout locale affiancata;
6. commit e push di entrambi i repository.

Non copiare codice server, variabili d'ambiente, token, identificativi tenant, dati cliente o snapshot reali. L'ID in `.app.json` è l'identificativo tecnico non segreto della connessione ChatGPT registrata; le credenziali restano nel servizio.
