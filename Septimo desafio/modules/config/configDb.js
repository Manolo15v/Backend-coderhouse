export default {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: "../db/mydb.sqlite"
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'test'
        }
    }
}