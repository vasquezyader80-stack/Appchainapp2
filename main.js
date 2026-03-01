const app = {
    init() { this.updateUI(); },
    initUser() {
        const name = document.getElementById('input-name').value;
        const saldo = document.getElementById('input-cacaos').value;
        if(name && saldo) {
            Auth.save(name, saldo);
            this.updateUI(); // Esto fuerza a dibujar el mercado
            alert("🚀 Sistema Agroindustrial Activado");
        }
    },
    buyProduct(id, price, name) {
        const user = Auth.get();
        if(user.cacaos >= price) {
            user.cacaos -= price;
            Auth.save(user.name, user.cacaos);
            const dias = Math.floor(Math.random() * 3) + 1;
            alert(`📦 COMPRA EXITOSA\n\nProducto: ${name}\n🚚 Entrega a domicilio en: ${dias} días.`);
            this.updateUI();
        } else {
            alert("❌ Saldo insuficiente en moneda nacional.");
        }
    },
    updateUI() {
        const user = Auth.get();
        document.getElementById('display-name').innerText = user.name || "---";
        document.getElementById('display-cacaos').innerText = user.cacaos || "0";

        const market = document.getElementById('market-grid');
        if(market) {
            market.innerHTML = ''; // Limpiamos para evitar duplicados
            Inventory.getAll().forEach(p => {
                market.innerHTML += `
                    <div class="card" style="text-align:center; margin:10px; padding:20px; border-top: 4px solid #27ae60;">
                        <div style="font-size: 3.5rem;">${p.img}</div>
                        <h4 style="margin:10px 0;">${p.name}</h4>
                        <p style="font-size:1.2rem; font-weight:bold; color:#2c3e50;">$${p.price}</p>
                        <button onclick="app.buyProduct(${p.id}, ${p.price}, '${p.name}')" 
                                style="background:#27ae60; color:white; border:none; width:100%; padding:12px; border-radius:8px; cursor:pointer; font-weight:bold;">
                            Pedir a Domicilio
                        </button>
                    </div>`;
            });
        }
    }
};
window.onload = () => app.init();
