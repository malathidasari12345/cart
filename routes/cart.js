const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cart');

router.post('/addtocart', addToCart );

router.get("/allcartitems", getCart)


module.exports = router;
