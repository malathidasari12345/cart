const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./database/db')
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product')
app.use(cors())
app.use(express.json())
db()

app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes )

app.listen(5000,()=>{
    console.log("working")
})