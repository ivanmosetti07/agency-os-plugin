# Sicurezza

Non aprire issue con token, output contenenti dati cliente, identificativi tenant o screenshot riservati. Revoca immediatamente una credenziale esposta e segnala il problema attraverso il canale privato del proprietario del repository.

Il plugin non contiene credenziali. L'autenticazione avviene tramite OAuth sul server `https://agency-os.it/mcp`, che applica scope, ruoli, membership e RLS a ogni chiamata.
