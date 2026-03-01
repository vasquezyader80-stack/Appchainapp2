const app = {
    init() { this.updateUI(); },
    updateUI() {
        const user = Auth.get();
        document.getElementById('display-name').innerText = user.name;
        document.getElementById('display-cacaos').innerText = user.cacaos;
        const grid = document.getElementById('market-grid');
        grid.innerHTML = Inventory.getAll().map(p => `<div class="product-item"><b>${p.name}</b><br>${p.price} 🍫</div>`).join('');
    },
    initUser() {
        Auth.save(document.getElementById('input-name').value, document.getElementById('input-cacaos').value);
        this.updateUI();
    },
    registerProduct() {
        Inventory.add(document.getElementById('p-name').value, document.getElementById('p-price').value);
        this.updateUI();
    }
};
document.addEventListener('DOMContentLoaded', () => app.init());
