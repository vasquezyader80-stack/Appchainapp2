const Inventory = {
    getAll() { return JSON.parse(localStorage.getItem('agro_market')) || []; },
    add(name, price) {
        const products = this.getAll();
        products.push({ id: Date.now(), name, price: parseFloat(price) });
        localStorage.setItem('agro_market', JSON.stringify(products));
    }
};
