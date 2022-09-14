const express = require('express');
const Container = require('./container');

const app = express();
const container1 = new Container("./productos.txt");

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('<h1 style="color:#251A58">Hola ser de luz</h1>')
})

app.get('/productos', async (req, res) => {
    res.send(await container1.getAll())
})

app.get('/productoRamdon', async (req, res) => {
    const randomId = Math.round(Math.random() * (9 - 1) + 1); // id ramdon del 1 al 9
    const producto = await container1.getById(randomId);
    console.log(producto);
    res.send(producto)
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${server.address().port}`);
});
 