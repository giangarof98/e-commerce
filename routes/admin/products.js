const express = require('express');
const {validationResult} = require('express-validator');
const productsRepo = require('../../repositories/products')
const productsNewTemplate = require('../../views/admin/products/new')
const {requirePrice, requireTitle} = require('./validators')
const router = express.Router();

router.get('/admin/products',  (req,res) => {
    
});

router.get('/admin/products/new', (req,res) => {
    res.send(productsNewTemplate({}));
});

router.post('/admin/products/new', [requirePrice, requireTitle], (req,res) => {
    const errors = validationResult(req);
    console.log(errors)
    res.send('submited')
})



module.exports = router;