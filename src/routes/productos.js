const express = require('express');
const router = express.Router();

const { getProduct, products_uso, products_consumo, getProducts, postProduct, delProducts, putProducts } = require('../controllers/productsController')

router.get('/products_uso/:id',products_uso)
router.get('/products/:id', getProduct);
router.get('/products_consumo/:id',products_consumo);
router.get('/products', getProducts);
router.post('/products', postProduct);
router.put('/products/:id', putProducts)
router.delete('/products/:id', delProducts);

module.exports = router