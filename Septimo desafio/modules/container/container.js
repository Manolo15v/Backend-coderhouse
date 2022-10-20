import knex from 'knex';

export default class Container {
    constructor(config, table) {
        this.knex = knex(config),
        this.table = table    
    }
    
    async disconnect() {
        this.knex.destroy()
    }

    
    async save(data) {
        try {
            await this.knex(this.table).insert(data);

        } catch (error) {
            console.log(error);

        } finally {
            this.disconnect();
        }
    }

    async getAll() {
        try {
            return await this.knex.from(this.table).select('*');

        } catch (error) {

            console.log(error);

        } finally {
            this.disconnect();
        }
    }
}