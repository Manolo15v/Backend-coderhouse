import knex from 'knex';
import faker from 'faker';
faker.locale = 'es'

export default class ProductsContainer {
    constructor(config, table) {
        this.knex = knex(config),
        this.table = table    
    }
    
    makeProducts() {
        const PRODS_LOT = 5;
        const productsFaker = [];
        for (let i = 1; i <= PRODS_LOT; i++) {
            const products = {
                id: i,
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: `${faker.image.imageUrl()}?${i}`
            }
            productsFaker.push(products);
        }

        return productsFaker
    }

    async save(data) {
        try {
            await this.knex(this.table).insert(data);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    async getAll() {
        try {
            return await this.knex.from(this.table).select('*');
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async disconnect() {
        this.knex.destroy()
    }
}