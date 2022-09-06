const express = require('express');
const router = express.Router();


const { getProduct, getProducts, postProduct, delProducts, putProducts } = require('../controllers/productsController')

router.get('/products/:id', getProduct);
router.get('/products', getProducts);
router.post('/products', postProduct);
router.put('/products/:id', putProducts)
router.delete('/products/:id', delProducts);

module.exports = router