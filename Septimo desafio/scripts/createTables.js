import knex from "knex";
import config from "../modules/config/configDb.js";

const sqliteClient = knex(config.sqlite3);

(async function() { try {
    await sqliteClient.schema.createTable('Messages', table => {
        table.string('email');
        table.string('mensaje');
        table.dateTime('fecha');
    });

    console.log('Tabla de sqlite3 creada');

} catch (error) {
    console.log("Error en tabla slite3");
    console.log(error);
} finally {
    sqliteClient.destroy()
}})()

const mariaDbClient = knex(config.mariaDb);

(async function() { try {
    await mariaDbClient.schema.createTable('products', table => {
        table.increments('id'); 
        table.string('nombre'); 
        table.integer('precio');
        table.string('urlImagen');
    }); 
    
    console.log('Tabla de mariaDb creada');

} catch (error) {
    console.log("Error en  creacion tabla mariaDb");
    console.log(error);
} finally {
    mariaDbClient.destroy()
}})();