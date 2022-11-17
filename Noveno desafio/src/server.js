import express, { json, urlencoded } from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import productsRoute from './routes/products.route.js';
import messagesRoute from './routes/messages.route.js';

import ProductsContainer from './containers/productsContainer.js';
import MessagesContainer from './containers/messagesContainer.js';

import config from './config/config.js';
//-------//

const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/', productsRoute);
app.use('/mensajes', messagesRoute);


app.set('view engine', 'ejs');

const products = new ProductsContainer(config.sqlite3, 'products')
const messages = new MessagesContainer(config.filePath)

const server = httpServer.listen(PORT, () => {
    console.log(`listen in http://localhost:${server.address().port}`);
});

io.on('connection', async socket => {
    console.log('Un cliente se a conectado');


    socket.emit('products', await products.getAll());

    socket.on('client-product', async (data) => {
        await products.save(data);
        io.sockets.emit('products', await products.getAll());
    });


    socket.emit('messages', await messages.getAllNormalized());

    socket.on('client-message', async (data) => {
        await messages.save(data);
        io.sockets.emit('messages', await messages.getAllNormalized());
    });
});




