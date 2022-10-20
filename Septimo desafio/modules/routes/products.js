import { Router } from 'express';
import ProductsContainer  from '../container/productsContainer.js';
import config from '../config/configDb.js'

const router = Router();

const products = new ProductsContainer(config.mariaDb, 'products')


router.get('', (req, res) => {
    res.render('pages/products');
});


router.post('/productos', (req, res) => {
    const product = req.body;
    products.save(product);
    res.status(201).redirect('/');
});

export default router;