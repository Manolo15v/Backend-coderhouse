const fs = require('fs')

class Container {
    constructor(filePath) {
        this.filePath = filePath
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
        console.log(products);

        if (products.length === 0) {
            await this.#writeFile([{ ...data, id: 1 }]);
            return 1
        } else {
            const id = products.at(-1).id + 1;

            await this.#writeFile([...products, { ...data, id: id }]);
            return id
        }
    }

    async getAll() {
        const products = await this.#readFile();
        console.log(products);
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

(async function() {
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


