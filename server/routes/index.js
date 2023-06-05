const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
require('dotenv').config()

//RazorPay Connection
const Instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

//Product Map
const products = new Map([
    [1, {name: "basic", price: 3999}],
    [2, {name: "starter", price: 8999}],
    [3, {name: "elite", price: 14999}]
])

router.post('/checkout-session', async (req,res)=>{

    let {packId} = req.body;

    const product = products.get(packId);

   const options = {
       amount: product.price,
       currency: "INR",
   };
   const order = await Instance.orders.create(options);

   res.send(order);
});

module.exports = router;
