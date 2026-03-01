const Inventory = {
    // Catálogo base con productos reales e iconos
    defaultProducts: [
        { id: 1, name: "YaraVila Amidas (Fertilizante)", price: 1250, img: "🌱" },
        { id: 2, name: "Semilla Maíz Pioneer (Bolsa)", price: 3400, img: "🌽" },
        { id: 3, name: "Bomba de Riego Solar", price: 8900, img: "☀️" },
        { id: 4, name: "Machete de Acero Pro", price: 450, img: "🗡️" }
    ],
    getAll() {
        const custom = JSON.parse(localStorage.getItem('agro_market')) || [];
        return [...this.defaultProducts, ...custom];
    },
    add(name, price) {
        const products = JSON.parse(localStorage.getItem('agro_market')) || [];
        products.push({ id: Date.now(), name, price: parseFloat(price), img: "📦" });
        localStorage.setItem('agro_market', JSON.stringify(products));
    }
};
