const express = require('express');
const products = require('../container/productsContainer');
const { Router } = express;

const router = Router();


router.get('', (req, res) => {
    res.render('pages/products');
});


router.post('/productos', (req, res) => {
    const product = req.body;
    products.save(product);
    res.status(201).redirect('/');
});

module.exports = router;