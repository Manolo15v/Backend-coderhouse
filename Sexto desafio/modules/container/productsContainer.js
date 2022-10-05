class Container {
    constructor(products = []) {
        this.products = products,
            this.lastId = 1,
            this.error = { error: 'producto no encontrado' }
    }

    #productExists(id) {
        const product = this.products.find(product => product.id === parseInt(id));

        if (product) {
            return true
        }

        return false
    }

    save(data) {
        let { nombre, precio, urlImagen } = data;

        precio = parseInt(precio);

        if (this.products.length === 0) {
            this.products = [{ nombre, precio, urlImagen, id: this.lastId }];

            return this.lastId
        } else {
            this.lastId = this.products[this.products.length - 1].id + 1;
            this.products = [...this.products, { nombre, precio, urlImagen, id: this.lastId }];

            return this.lastId
        }
    }

    change(id, data) {
        const exists = this.#productExists(id)

        if (exists) {
            let { nombre, precio } = data;
            const productId = parseInt(id)
            precio = parseInt(precio);

            const indexProduct = this.products.indexOf(this.products.find(product => product.id === productId));

            this.products[indexProduct] = { nombre, precio, productId };
        }

        return exists
    }

    getAll() {
        return this.products
    }

    getById(id) {
        const exists = this.#productExists(id)

        if (exists) {
            const productFound = this.products.find(product => product.id === parseInt(id));
            return productFound
        }

        return exists
    }

    deleteById(id) {
        const exists = this.#productExists(id)

        if (exists) {
            const deletedProduct = this.products.indexOf(this.products.find(product => product.id === parseInt(id)));

            this.products.splice(deletedProduct, 1);

            return exists
        }

        return exists
    }

    deleteAll() {
        this.products = [];

        console.log("Productos borrados");
    }
}

const container = new Container([
    {
        nombre: "Terra Blade",
        precio: 50,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Screech_Psyduck-512.png',
        id: 1
    },
    {
        nombre: "Diamond Sword",
        precio: 1,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Sword-256.png',
        id: 2
    },
    {
        nombre: "Lancer Mk2, Assault Rifle",
        precio: 36,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Mask_Juggernaut-256.png',
        id: 3
    },
    {
        nombre: "Master Sword",
        precio: 1000,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Sword-256.png',
        id: 4
    },
    {
        nombre: "Portal Gun",
        precio: 220,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Mask_Juggernaut-256.png',
        id: 5
    },
    {
        nombre: "Blades of Chaos",
        precio: 80,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Graceful-256.png',
        id: 6
    },
    {
        nombre: "BFG 9000",
        precio: 560,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Graceful-256.png',
        id: 7
    },
    {
        nombre: "Master Ball",
        precio: 390,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Screech_Psyduck-512.png',
        id: 8
    },
    {
        nombre: "Gravity Gun",
        precio: 90,
        urlImagen: 'https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Mask_Juggernaut-256.png',
        id: 9
    }
]);

module.exports = container;