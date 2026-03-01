const Inventory = {
    // Estos productos aparecerán automáticamente
    defaultProducts: [
        { id: 1, name: "YaraVila Amidas (Fertilizante)", price: 1250, img: "🌱" },
        { id: 2, name: "Semilla Maíz Pioneer (Bolsa)", price: 3400, img: "🌽" },
        { id: 3, name: "Bomba de Riego Solar", price: 8900, img: "☀️" },
        { id: 4, name: "Dron de Fumigación T40", price: 15500, img: "🛸" }
    ],
    getAll() {
        // Esta línea une los productos de fábrica con los que tú registres
        const custom = JSON.parse(localStorage.getItem('agro_market')) || [];
        return [...this.defaultProducts, ...custom];
    },
    add(name, price) {
        const products = JSON.parse(localStorage.getItem('agro_market')) || [];
        products.push({ id: Date.now(), name, price: parseFloat(price), img: "📦" });
        localStorage.setItem('agro_market', JSON.stringify(products));
    },
    remove(id) {
        const products = JSON.parse(localStorage.getItem('agro_market')) || [];
        const updated = products.filter(p => p.id !== id);
        localStorage.setItem('agro_market', JSON.stringify(updated));
    }
};
