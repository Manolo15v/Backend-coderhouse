const fs = require('fs')

class Container {
    constructor(filePath) {
        this.filePath = filePath
        this.lastId = 1
    }

    async #readFile() {
        try {
            const res = await fs.promises.readFile(this.filePath, "utf-8");

            if (res.length === 0) {// Si el archivo esta vacio
                return res
            } else {
                const content = JSON.parse(res);

                return content
            }

        } catch (error) {
            console.log(error);
        }
    }

    async #writeFile(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data), "utf-8");
        } catch (error) {
            console.log(error);
        }
    }

    async save(data) {
        const products = await this.#readFile();

        if (products.length === 0) {
            await this.#writeFile([{ ...data, id: this.lastId }]);
            return this.lastId
        } else {
            this.lastId = products[products.length - 1].id + 1


            await this.#writeFile([...products, { ...data, id: this.lastId }]);
            return this.lastId
        }
    }

    async getAll() {
        const products = await this.#readFile();
        return products
    }

    async getById(id) {
        const products = await this.#readFile();
        const productFound = products.find(product => product.id = id);
        return productFound
    }

    async deleteById(id) {
        const products = await this.#readFile();

        const deletedProduct = products.indexOf(products.find(product => product.id === id));

        products.splice(deletedProduct, 1);

        await this.#writeFile(products);

        console.log("Producto borrado");
    }

    async deleteAll() {
        await this.#writeFile([]);

        console.log("Productos borrados");
    }
}

(async function () {
    const container1 = new Container("./productos.txt");

    const id = await container1.save({ nombre: "Awp", precio: 1000 });
    const products = await container1.getAll();
    const product = await container1.getById(5);

    console.log(`Producto agregado con el id ${id}`);
    console.log(products);
    console.log(product);

    // container1.deleteById(5);

    // container1.deleteAll();
})()

//posible solucion al id

//this.lastId = products.at(-1).id + 1; sugarsintax a products[products.length - 1].id + 1

//this.lastId = Math.random().toString(36).substring(2,12) id pseudoaleatorio de 10 caracteres