const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
require('dotenv').config();

//RazorPay Connection
const Instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

//Local Payment verification
let paymentSuccess = false;
let packName = '';
let userMail = '';

//Product Map
const products = new Map([
    [1, {name: "basic", price: 3999}],
    [2, {name: "starter", price: 8999}],
    [3, {name: "elite", price: 14999}]
])

router.post('/checkout-session', async (req, res) => {

    let {packId, cookieMail} = req.body;
    userMail = cookieMail;
    const product = products.get(packId);
    packName = product.name;
    const options = {
        amount: product.price,
        currency: "INR",
    };
    const order = await Instance.orders.create(options);
    console.log(order);
    res.json({
        name: product.name,
        order: order
    });
});

router.get('/get-api-key', (req, res) => {
    res.send(process.env.RAZORPAY_API_KEY);
});

router.post('/payment-success', (req, res) => {
    console.log(req.body);
    paymentSuccess = true;
    res.redirect('http://localhost:5000/payment-success');
});

router.get('/insert-pack', (req, res) => {
    if (paymentSuccess) {
        res.json({
                payment: true,
                packName: packName,
                mail: userMail
            }
        );
    } else {
        res.json({
            payment: false,
            packName: null
        });
    }
})

module.exports = router;
