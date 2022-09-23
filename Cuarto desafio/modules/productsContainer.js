class Container {
    constructor(products = []) {
        this.products = products,
        this.lastId = 1,
        this.error = { error : 'producto no encontrado' }
    }

    #productExists(id) {
        const product = this.products.find(product => product.id === parseInt(id));

        if (product) {
            return true
        }

        return false
    }

    save(data) {
        let { nombre, precio } = data;

        precio = parseInt(precio);

        if (this.products.length === 0) {
            this.products = [{ nombre, precio, id: this.lastId }];

            return this.lastId
        } else {
            this.lastId = this.products[this.products.length - 1].id + 1;
            this.products = [...this.products, { nombre, precio, id: this.lastId }];

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
        id: 1
    },
    {
        nombre: "Diamond Sword",
        precio: 1,
        id: 2
    },
    {
        nombre: "Lancer Mk2, Assault Rifle",
        precio: 36,
        id: 3
    },
    {
        nombre: "Master Sword",
        precio: 1000,
        id: 4
    },
    {
        nombre: "Portal Gun",
        precio: 220,
        id: 5
    },
    {
        nombre: "Blades of Chaos",
        precio: 80,
        id: 6
    },
    {
        nombre: "BFG 9000",
        precio: 560,
        id: 7
    },
    {
        nombre: "Master Ball",
        precio: 390,
        id: 8
    },
    {
        nombre: "Gravity Gun",
        precio: 90,
        id: 9
    }
]);

module.exports = container;