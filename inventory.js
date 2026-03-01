const Inventory = {
    // Productos precargados para que el mercado nunca esté vacío
    defaultProducts: [
        { id: 1, name: "Fertilizante YaraVila", price: 1250, img: "🌱" },
        { id: 2, name: "Semilla de Maíz Pioneer", price: 3400, img: "🌽" },
        { id: 3, name: "Bomba de Riego Solar", price: 8900, img: "☀️" },
        { id: 4, name: "Dron Fumigador T40", price: 15500, img: "🛸" }
    ],
    getAll() {
        // Combinamos los de fábrica con cualquier otro que registres manualmente
        const custom = JSON.parse(localStorage.getItem('agro_market')) || [];
        return [...this.defaultProducts, ...custom];
    },
    remove(id) {
        const products = JSON.parse(localStorage.getItem('agro_market')) || [];
        const updated = products.filter(p => p.id !== id);
        localStorage.setItem('agro_market', JSON.stringify(updated));
    }
};
  
