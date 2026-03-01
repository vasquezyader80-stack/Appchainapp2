const Auth = {
    save(name, cacaos) {
        const userData = { name, cacaos: parseFloat(cacaos) };
        localStorage.setItem('agro_user', JSON.stringify(userData));
    },
    get() {
        return JSON.parse(localStorage.getItem('agro_user')) || { name: "Sin Registro", cacaos: 0 };
    }
};
