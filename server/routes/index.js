const express = require('express');
const router = express.Router();
require('dotenv').config();


//Stripe Integration
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const packageMap = new Map([
        [1, {priceInINR: 14999, name: "Elite Pack"}],
        [2, {priceInINR: 3999, name: "Starter Pack"}]
    ]
)

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

//Checkout Session
router.post('/checkout-session', async (req,res)=>{
    let {packName, packPrice} = req.body;
    console.log(packName);
    console.log(packPrice);
});


module.exports = router;
