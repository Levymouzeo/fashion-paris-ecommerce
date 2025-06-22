const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/upload');

router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.post('/seed', productController.seedSampleProducts);
router.get('/:id', productController.getProductById);
router.post('/', auth, isAdmin, upload.single('image'), productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
