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
        }
    }

    async getById(id) {
        try {
            return await this.knex.from(this.table).select('nombre, precio, urlImagen').where('id', id);

        } catch (error) {

            console.log(error);

        }
    }

    async deleteById(id) {
        try {
            await this.knex.from(this.table).where('id', id).del();

        } catch (error) {

            console.log(error);

        }
    }

    async deleteAll() {
        try {
            await this.knex.from(this.table).del();
        } catch (error) {

            console.log(error);

        }

        console.log("Productos borrados");
    }
}
