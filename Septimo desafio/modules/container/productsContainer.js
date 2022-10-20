import Container from './container.js';


export default class ProductsContainer extends Container{
    constructor(config, table) {
        super(config, table)
    }    

    async change(id, data) {
        try {
            await this.knex(this.table).where('id', id).update(data);

        } catch (error) {

            console.log(error);

        } finally {
            this.disconnect();
        }

        // const exists = this.productExists(id)

        // if (exists) {
        //     let { nombre, precio } = data;
        //     const productId = parseInt(id)
        //     precio = parseInt(precio);

        //     const indexProduct = this.products.indexOf(this.products.find(product => product.id === productId));

        //     this.products[indexProduct] = { nombre, precio, productId };
        // }

        // return exists
    }

    async getById(id) {
        try {
            return await this.knex.from(this.table).select('nombre, precio, urlImagen').where('id', id);

        } catch (error) {

            console.log(error);

        } finally {
            this.disconnect();
        }
    }

    async deleteById(id) {
        try {
            await this.knex.from(this.table).where('id', id).del();

        } catch (error) {

            console.log(error);

        } finally {
            this.disconnect();
        }
    }

    async deleteAll() {
        try {
            await this.knex.from(this.table).del();
        } catch (error) {

            console.log(error);

        } finally {
            this.disconnect();
        }

        console.log("Productos borrados");
    }
}
