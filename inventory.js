const Inventory = {
    // Estos productos son los que aparecen sin que tú hagas nada
    defaultProducts: [
        { id: 1, name: "YaraVila Amidas", price: 1250, img: "🌱" },
        { id: 2, name: "Semilla Maíz Pioneer", price: 3400, img: "🌽" },
        { id: 3, name: "Bomba de Riego Solar", price: 8900, img: "☀️" },
        { id: 4, name: "Dron de Fumigación T40", price: 15500, img: "🛸" }
    ],
    getAll() {
        const custom = JSON.parse(localStorage.getItem('agro_market')) || [];
        return [...this.defaultProducts, ...custom];
    },
    remove(id) {
        const products = JSON.parse(localStorage.getItem('agro_market')) || [];
        const updated = products.filter(p => p.id !== id);
        localStorage.setItem('agro_market', JSON.stringify(updated));
    }
};
