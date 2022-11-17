import knex from "knex";
import config from "../src/config/config.js";

const sqliteClient = knex(config.sqlite3);

(async function() { try {
    await sqliteClient.schema.createTable('products', table => {
        table.increments('id'); 
        table.string('title'); 
        table.float('price');
        table.string('thumbnail');
    }); 
    
    console.log('Tabla de sqlite creada');

} catch (error) {
    console.log(`Error en  creacion tabla sqlite \n ${error}`);
    
} finally {
    sqliteClient.destroy()
}})();