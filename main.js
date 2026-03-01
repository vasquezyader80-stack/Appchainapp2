const app = {
    init() {
        this.updateUI();
    },
    initUser() {
        const name = document.getElementById('input-name').value;
        const saldo = document.getElementById('input-cacaos').value;
        if(name && saldo) {
            Auth.save(name, saldo);
            // Esto limpia cualquier error previo y dibuja todo de nuevo
            this.updateUI();
            alert("✅ Cuenta Activada. Bienvenido al Mercado Agroindustrial.");
        }
    },
    buyProduct(id, price, name) {
        const user = Auth.get();
        if(user.cacaos >= price) {
            user.cacaos -= price;
            Auth.save(user.name, user.cacaos);
            
            // Simulador de Entrega 2027
            const dias = Math.floor(Math.random() * 3) + 1;
            alert(`🚀 ¡PEDIDO CONFIRMADO!\n\nProducto: ${name}\n🚚 El servicio a domicilio llegará a tu finca en ${dias} días.\n💰 Saldo restante: $${user.cacaos}`);
            
            this.updateUI();
        } else {
            alert("❌ Saldo insuficiente para completar la compra y el envío.");
        }
    },
    updateUI() {
        const user = Auth.get();
        document.getElementById('display-name').innerText = user.name || "---";
        document.getElementById('display-cacaos').innerText = user.cacaos || "0";

        const market = document.getElementById('market-grid');
        if(market) {
            market.innerHTML = ''; // Limpia el mercado antes de dibujar
            Inventory.getAll().forEach(p => {
                market.innerHTML += `
                    <div class="card" style="text-align:center; border-top: 4px solid #27ae60; margin:10px; padding:15px;">
                        <div style="font-size: 3rem;">${p.img}</div>
                        <h4>${p.name}</h4>
                        <p style="font-weight:bold; color:#2c3e50;">$${p.price}</p>
                        <button onclick="app.buyProduct(${p.id}, ${p.price}, '${p.name}')" 
                                style="background:#27ae60; color:white; border:none; padding:10px; width:100%; border-radius:8px; cursor:pointer; font-weight:bold;">
                            Pedir a Domicilio
                        </button>
                    </div>
                `;
            });
        }
    }
};
window.onload = () => app.init();
