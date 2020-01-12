const productService = require('./products.service'); 
const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
   productService.getProducts(req, res);
});


router.get('/product/:code', (req, res) => {
   productService.getProductByCode(req, res);
});

router.post('/buyProductForUser', (req, res) => {
   productService.buyProduct(req, res);
});



module.exports=router;