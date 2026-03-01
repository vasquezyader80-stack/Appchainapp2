const app = {
    init() {
        this.updateUI();
    },
    initUser() {
        const name = document.getElementById('input-name').value;
        const cacaos = document.getElementById('input-cacaos').value;
        if(name && cacaos) {
            Auth.save(name, cacaos);
            this.addHistory(`✅ Finca "${name}" configurada con ${cacaos} Cacaos.`);
            this.updateUI();
        }
    },
    registerProduct() {
        const n = document.getElementById('p-name').value;
        const p = document.getElementById('p-price').value;
        if(n && p) {
            Inventory.add(n, p);
            this.addHistory(`📦 Producto publicado: ${n} (${p} Cacaos)`);
            this.updateUI();
        }
    },
    buyProduct(id, price, name) {
        const user = Auth.get();
        if(user.cacaos >= price) {
            user.cacaos -= price;
            Auth.save(user.name, user.cacaos);
            Inventory.remove(id);
            this.addHistory(`🛒 Compraste: ${name} por ${price} Cacaos`);
            this.updateUI();
        } else {
            alert("❌ Saldo insuficiente de Cacaos");
        }
    },
    addHistory(msg) {
        const log = document.getElementById('history-log');
        if(log) {
            const entry = document.createElement('li');
            entry.style.borderBottom = "1px solid #eee";
            entry.style.padding = "5px 0";
            entry.innerHTML = `<small>${new Date().toLocaleTimeString()}</small> | ${msg}`;
            log.prepend(entry);
        }
    },
    updateUI() {
        const user = Auth.get();
        document.getElementById('display-name').innerText = user.name;
        document.getElementById('display-cacaos').innerText = user.cacaos;

        const market = document.getElementById('market-grid');
        market.innerHTML = '';
        Inventory.getAll().forEach(p => {
            market.innerHTML += `
                <div class="card" style="border-left: 5px solid #2ecc71; margin-bottom: 10px;">
                    <h4>${p.name}</h4>
                    <p>Precio: 💰 ${p.price} Cacaos</p>
                    <button onclick="app.buyProduct(${p.id}, ${p.price}, '${p.name}')" style="background: #27ae60;">Comprar Ahora</button>
                </div>
            `;
        });
    }
};

window.onload = () => app.init();
