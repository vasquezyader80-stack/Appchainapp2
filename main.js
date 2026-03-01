const app = {
    init() { this.updateUI(); },
    initUser() {
        const n = document.getElementById('input-name').value;
        const s = document.getElementById('input-cacaos').value;
        if(n && s) {
            Auth.save(n, s);
            this.updateUI();
        }
    },
    buyProduct(id, price, name) {
        const user = Auth.get();
        if(user.cacaos >= price) {
            user.cacaos -= price;
            Auth.save(user.name, user.cacaos);
            alert(`🚀 ¡Pedido Exitoso!\nLote: ${name}\n🚚 Envío a domicilio programado.`);
            this.updateUI();
        } else {
            alert("❌ Saldo insuficiente.");
        }
    },
    updateUI() {
        const user = Auth.get();
        document.getElementById('display-name').innerText = user.name || "---";
        document.getElementById('display-cacaos').innerText = user.cacaos || "0";
        const market = document.getElementById('market-grid');
        if(market) {
            market.innerHTML = '';
            Inventory.getAll().forEach(p => {
                market.innerHTML += `
                    <div class="card" style="text-align:center; padding:15px;">
                        <div style="font-size:3rem;">${p.img}</div>
                        <h4>${p.name}</h4>
                        <p><strong>$${p.price}</strong></p>
                        <button onclick="app.buyProduct(${p.id}, ${p.price}, '${p.name}')" style="background:#27ae60; color:white; border:none; padding:10px; width:100%; border-radius:5px; cursor:pointer;">Pedir a Domicilio</button>
                    </div>`;
            });
        }
    }
};
window.onload = () => app.init();
