import express, { json, urlencoded } from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import productsRoute from './modules/routes/products.js';
import messagesRoute from './modules/routes/messages.js';
import ProductsContainer from './modules/container/productsContainer.js';
import MessagesContainer from './modules/container/messagesContainer.js';
import config from './modules/config/configDb.js';


const PORT = 3000;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');


app.use('/', productsRoute)
app.use('/mensajes', messagesRoute)

const products = new ProductsContainer(config.mariaDb, 'products')
const messages = new MessagesContainer(config.sqlite3, 'messages')

const server = httpServer.listen(PORT, () => {
    console.log(`listen in http://localhost:${server.address().port}`);
});

io.on('connection', async socket => {
    console.log('Un cliente se a conectado');
    socket.emit('products', await products.getAll());
    socket.emit('messages', await messages.getAll());

    socket.on('client-product', async (data) => {
        await products.save(data);
        io.sockets.emit('products', await products.getAll());
    });

    socket.on('client-message', async (data) => {
        await messages.save(data);
        io.sockets.emit('messages', await messages.getAll());
    });
});




