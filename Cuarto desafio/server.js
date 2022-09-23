const express = require('express');
const productos = require('./modules/products')
const { json, urlencoded, Router, static } = express;

// Links del los endpoints para probar
// GET  - http://localhost:8080/api/productos           Todos los producto
// GET  - http://localhost:8080/api/productos/4             Producto por Id
// POST - http://localhost:8080/api/productos?nombre=Awp&precio=1000            Agregar producto 
// PUT -  http://localhost:8080/api/productos/2?nombre=Awp&precio=1000          Cambiar producto
// DELETE - http://localhost:8080/api/productos/6           Borra producto

const app = express();

const PORT = process.env.PORT || 8080;

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(static(__dirname + '/public'))



app.use('/api/productos', productos)

const server = app.listen(PORT, () => {
    console.log(`Luchi atr aqui http://localhost:${server.address().port}`);
})
