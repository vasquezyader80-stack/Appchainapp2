const Inventory = {
    // Estos son los productos que aparecerán SOLOS al cargar la app
    defaultProducts: [
        { id: 1, name: "YaraVila Amidas (Fertilizante)", price: 1250, img: "🌱" },
        { id: 2, name: "Semilla Maíz Pioneer (Bolsa)", price: 3400, img: "🌽" },
        { id: 3, name: "Bomba de Riego Solar", price: 8900, img: "☀️" },
        { id: 4, name: "Dron de Fumigación T40", price: 15500, img: "🛸" }
    ],
    getAll() {
        // Recupera productos creados por el usuario y los combina con los de fábrica
        const custom = JSON.parse(localStorage.getItem('agro_market')) || [];
        return [...this.defaultProducts, ...custom];
    },
    add(name, price) {
        const products = JSON.parse(localStorage.getItem('agro_market')) || [];
        products.push({ id: Date.now(), name, price: parseFloat(price), img: "📦" });
        localStorage.setItem('agro_market', JSON.stringify(products));
    }
};
