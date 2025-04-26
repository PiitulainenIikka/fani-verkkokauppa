

const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/random', productController.getRandomProducts);
router.get('/:id/stock', productController.getProductStockById);
router.get('/search/:search', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.getAllProducts);

module.exports = router;