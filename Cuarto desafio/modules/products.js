const express = require('express');
const products = require('./productsContainer')
const { Router } = express;

const router = Router();


router.get('/', (req, res) => {
    res.send(products.getAll())
})


router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = products.getById(id);
    if (product === false) {
        res.status(404).send(products.error)
    }

    res.status(302).send(product)
})

router.post('', (req, res) => {
    const product = req.body;
    const id =  products.save(product);
    res.status(201).send(`Luchi el id es ${id}`)
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