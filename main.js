    registerProduct() {
        const n = document.getElementById('p-name').value;
        const p = document.getElementById('p-price').value;
        if(n && p) {
            Inventory.add(n, p);
            this.addHistory(`📦 Nuevo lote publicado: ${n} por ${p} Cacaos`);
            this.updateUI();
        }
    },
    addHistory(msg) {
        const log = document.getElementById('history-log');
        const entry = document.createElement('li');
        entry.innerHTML = `🕒 ${new Date().toLocaleTimeString()} - ${msg}`;
        log.prepend(entry); // Añade al inicio de la lista
    }
