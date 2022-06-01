const express = require('express');
const cartRepo = require('../repositories/cart')
const router = express.Router();

router.post('/cart/products', async(req,res) => {
    let cart;
    if(!req.session.cartId){
        cart = await cartRepo.create({itemd:[]});
        req.session.cartId = cart.id;
    }else{
        cart = await cartRepo.getOne(req.session.cartId);
    }
    console.log(cart)
    res.send('added to card')
})

module.exports = router;