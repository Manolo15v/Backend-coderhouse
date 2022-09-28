const express = require('express');
const productos = require('./modules/products')
const { json, urlencoded, static } = express;

const app = express();

const PORT = process.env.PORT || 3002;

app.use(json())
app.use(urlencoded({ extended: true }))

app.set('views', './views');

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index.pug');
})

app.use('/productos', productos);



const server = app.listen(PORT, () => {
    console.log(`Luchi el con Pug es aqui  http://localhost:${server.address().port}`);
})
