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

        if(products.length === 0) {
            await this.#writeFile([{...data, id: 1}]);
            console.log("Producto agregado con el id 1");
        }else{
            const id = products.at(-1).id + 1;

            await this.#writeFile([...products,{...data, id: id}]);
            console.log(`Producto agregado con el id ${id}`);
        }
    }

    async getAll() {
        const products = await this.#readFile();
        return products
    }

    async getById(id) {
        const products = await this.#readFile();
        return products.find(product => product.id = id);
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

const container1 = new Container("./productos.txt");

container1.save({ nombre: "Awp", precio: 1000 });
console.log(container1.getAll());
console.log(container1.getById(2));

// container1.deleteById(5);

// container1.deleteAll();


