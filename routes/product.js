const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts} = require('../controllers/products');

router.post("/addproducts", addProduct)
router.get("/all",  getAllProducts)


module.exports = router;
