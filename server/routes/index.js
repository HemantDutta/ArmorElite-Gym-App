const express = require('express');
const router = express.Router();
require('dotenv').config();

//Stripe Integration
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

//Checkout Session
router.post('/checkout-session', async (req, res) => {
    let {packName, packPrice} = req.body;
    console.log(packName);
    console.log(packPrice);
    const packageMap = new Map([
        [1, {packName: packName, packPrice: packPrice}]
    ]);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card','paypal'],
            mode: 'payment',
            success_url: "http://localhost:5000/payment-success",
            cancel_url: "http://localhost:5000/payment-cancel"
        })
        res.send(session.url);
    } catch (e) {
        console.log(e.message);
    }
});


module.exports = router;
