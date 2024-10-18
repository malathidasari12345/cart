const Product = require('../models/product')

// Function to add a single product
const addProduct = async (req, res) => {
    try {
        // console.log("Request Body:", req.body); 

        const { name, description, image, price } = req.body;

        // Validate the input
        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required." });
        }

        // Create a new product instance
        const product = new Product({
            name,
            description,
            image: image || null, 
            price: price || 0, 
        });

        // Save the product to the database
        const createdProduct = await product.save();
        return res.status(201).json({
            message: "Product added successfully",
            product: createdProduct,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};


// Function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        const length = products.length
        return res.status(200).json({
            totalProducts:length,
            products});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addProduct,
    getAllProducts, 
};
