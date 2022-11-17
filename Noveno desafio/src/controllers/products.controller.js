import ProductsContainer from '../containers/productsContainer.js';
import config from '../config/config.js'

const products = new ProductsContainer(config.sqlite3, 'products')

async function getProductsPage(req, res) {
    const newProducts = products.makeProducts()
    newProducts.forEach( async product => {
        await products.save(product)
    });
    res.render('pages/products');
}

export default getProductsPage  
