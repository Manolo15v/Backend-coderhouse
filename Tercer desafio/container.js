const fs = require('fs')

module.exports = class Container {
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
        const productFound = products.find(product => product.id === id);
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
        this.#writeFile([]);

        console.log("Productos borrados");
    }
}