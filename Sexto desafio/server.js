const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const productsRoute = require('./modules/routes/products')
const messagesRoute = require('./modules/routes/messages');
const products = require('./modules/container/productsContainer');
const messages = require('./modules/container/messagesContainer');


const { json, urlencoded, static } = express;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(static('public'));

app.use('/', productsRoute)
app.use('/mensajes', messagesRoute)

const server = httpServer.listen(PORT, () => {
    console.log(`listen in http://localhost:${server.address().port}`);
});

io.on('connection', async socket => {
    console.log('Un cliente se a conectado');
    socket.emit('products', products.getAll());
    socket.emit('messages', await messages.getAll());

    socket.on('client-product', (data) => {
        products.save(data);
        io.sockets.emit('products', products.getAll());
    });

    socket.on('client-message', (data) => {
        messages.save(data);
        io.sockets.emit('messages', async () => {
            await messages.getAll();
        });
    });
});

