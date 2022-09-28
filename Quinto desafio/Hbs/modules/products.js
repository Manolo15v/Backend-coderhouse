const express = require('express');
const products = require('./productsContainer')
const { Router } = express;

const router = Router();


router.get('/', (req, res) => {
    let productsExists = true
    if(products.products.length === 0) {productsExists = false}
    res.render('products.hbs', { products: products.getAll(), productsExists })
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = products.getById(id);
    if (product === false) {
        res.status(404).send(products.error);
    }

    res.status(302).send(product);
});

router.post('', (req, res) => {
    const product = req.body;
    products.save(product);
    res.status(308).redirect('/')
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const product = req.query;
    const state = products.change(id, product);

    if (state === false) {
        res.status(404).send(products.error);
    }

    res.send('Producto cambiado con exito');
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const product = products.deleteById(id);

    if (product === false) {
        res.status(404).send(products.error);
    }
    res.send('Producto borrado con exito');
})

module.exports = router;