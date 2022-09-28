const express = require('express');
const hbs = require('express-handlebars')
const productos = require('./modules/products');
const { json, urlencoded, static } = express;

const app = express();

const PORT = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layout.hbs'
}));

app.set('views', './views');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('index')
});

app.use('/productos', productos);

const server = app.listen(PORT, () => {
    console.log(`Luchi el con Handlebars es aqui http://localhost:${server.address().port}`);
});
