import { Router } from 'express';
import getProductsPage from '../controllers/products.controller.js'

const router = Router();

router.get('/', getProductsPage);


export default router;