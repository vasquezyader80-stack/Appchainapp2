const app = {
    init() {
        this.updateUI();
    },
    initUser() {
        const name = document.getElementById('input-name').value;
        const saldo = document.getElementById('input-cacaos').value;
        if(name && saldo) {
            Auth.save(name, saldo);
            this.addHistory(`✅ Usuario ${name} registrado. Saldo: $${saldo}`);
            this.updateUI();
        }
    },
    buyProduct(id, price, name) {
        const user = Auth.get();
        if(user.cacaos >= price) {
            user.cacaos -= price;
            Auth.save(user.name, user.cacaos);
            
            // Lógica de Delivery 2027
            const tiempoEntrega = Math.floor(Math.random() * 5) + 1; 
            alert(`🚀 ¡Compra Exitosa!\nProducto: ${name}\n💰 Costo: $${price}\n🚚 Servicio a domicilio activado. Llega en ${tiempoEntrega} días a tu finca.`);
            
            this.addHistory(`🛒 COMPRA: ${name} (-$${price}). Envío en camino.`);
            this.updateUI();
        } else {
            alert("❌ Saldo insuficiente en tu cuenta nacional.");
        }
    },
    addHistory(msg) {
        const log = document.getElementById('history-log');
        if(log) {
            const entry = document.createElement('li');
            entry.innerHTML = `📌 ${msg}`;
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
                <div class="card" style="text-align:center; border-top: 4px solid #27ae60;">
                    <div style="font-size: 3rem;">${p.img}</div>
                    <h4>${p.name}</h4>
                    <p style="font-weight:bold; color:#2c3e50;">Precio: $${p.price}</p>
                    <button onclick="app.buyProduct(${p.id}, ${p.price}, '${p.name}')" 
                            style="background:#27ae60; width:100%; padding:10px; border-radius:5px; color:white; border:none;">
                        Pedir a Domicilio
                    </button>
                </div>
            `;
        });
    }
};
window.onload = () => app.init();
