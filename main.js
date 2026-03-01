const app = {
    init() {
        this.updateUI();
    },
    initUser() {
        const name = document.getElementById('input-name').value;
        const saldo = document.getElementById('input-cacaos').value;
        if(name && saldo) {
            Auth.save(name, saldo);
            this.addHistory(`✅ Usuario ${name} registrado. Saldo inicial: $${saldo}`);
            this.updateUI();
        }
    },
    buyProduct(id, price, name) {
        const user = Auth.get();
        if(user.cacaos >= price) {
            user.cacaos -= price;
            Auth.save(user.name, user.cacaos);
            const dias = Math.floor(Math.random() * 3) + 1;
            alert(`🚀 ¡PEDIDO EN CAMINO!\nProducto: ${name}\n💰 Pagado: $${price}\n🚚 Entrega en: ${dias} días hábiles.`);
            this.addHistory(`🛒 COMPRA: ${name} (-$${price}). Envío programado.`);
            this.updateUI();
        } else {
            alert("❌ Saldo insuficiente en moneda nacional.");
        }
    },
    addHistory(msg) {
        const log = document.getElementById('history-log');
        if(log) {
            const entry = document.createElement('li');
            entry.style.padding = "8px";
            entry.style.borderBottom = "1px solid #eee";
            entry.innerHTML = `📌 <small>${new Date().toLocaleTimeString()}</small> - ${msg}`;
            log.prepend(entry);
        }
    },
    updateUI() {
        const user = Auth.get();
        document.getElementById('display-name').innerText = user.name || "Invitado";
        document.getElementById('display-cacaos').innerText = user.cacaos || "0";

        const market = document.getElementById('market-grid');
        if(market) {
            market.innerHTML = '';
            Inventory.getAll().forEach(p => {
                market.innerHTML += `
                    <div class="card" style="text-align:center; border-top: 4px solid #27ae60; padding:15px; margin:10px;">
                        <div style="font-size: 3rem; margin-bottom:10px;">${p.img}</div>
                        <h4 style="margin:5px 0;">${p.name}</h4>
                        <p style="font-weight:bold; color:#2c3e50; font-size:1.2rem;">$${p.price}</p>
                        <button onclick="app.buyProduct(${p.id}, ${p.price}, '${p.name}')" 
                                style="background:#27ae60; width:100%; padding:12px; border-radius:8px; color:white; border:none; font-weight:bold; cursor:pointer;">
                            Pedir a Domicilio
                        </button>
                    </div>
                `;
            });
        }
    }
};
window.onload = () => app.init();
