# Riconciliazione con un sistema operativo personale

Mantieni tre attori separati:

1. Il connettore MCP legge Agency OS e produce una fotografia redatta.
2. Un processo offline confronta la fotografia con il sistema personale e genera differenze.
3. Un controllo di salute offline valuta età, copertura e blocchi.

La fotografia deve contenere versione del catalogo, data e ora, agenzie lette, limiti, cursori, conteggi per stato e motivi di copertura incompleta. Ogni stringa passa dalla redazione prima della scrittura su disco.

Una riconciliazione non applica modifiche direttamente. Produce un lotto con entità, operazione, valore precedente, valore proposto, prova e rischio. Solo un lotto approvato può essere eseguito.

Dopo l'esecuzione, rileggi Agency OS e rigenera il confronto. Una task delegata esistente soltanto nel sistema personale è un disallineamento operativo; una task chiusa da un fatto successivo va chiusa anche nel backlog, senza lasciarla attiva per inerzia.
