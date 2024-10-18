const mongoose = require('mongoose');
const Cart = require('../models/cart');

// Function to add products to the cart
const addToCart = async (req, res) => {
    const products = req.body; // Assuming this is an array of product objects

    // Input validation
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Product array is required' });
    }

    try {
        let cart = await Cart.findOne();
        // Create a new cart if none exists
        if (!cart) {
            cart = new Cart({ products: [] });
        }

        // Process each product in the request
        for (const { productId, quantity } of products) {
            // Validate productId
            if (!productId) {
                return res.status(400).json({ error: 'Product ID is required for each item' });
            }
            // Find if the product already exists in the cart
            const existingProduct = cart.products.find(item => item.productId === productId);
            if (existingProduct) {
                existingProduct.quantity += (quantity || 1); // Increment by the specified quantity or 1
            } else {
                cart.products.push({ productId, quantity: quantity || 1 }); // Add new product
            }
        }

        await cart.save(); // Save the updated cart
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to get all products in the cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne(); // Retrieve the cart

        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json(cart); // Return the cart contents
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the functions
module.exports = {
    addToCart,
    getCart
};
