const express = require('express');
const multer = require('multer')
const {validationResult} = require('express-validator');

const productsRepo = require('../../repositories/products')
const productsNewTemplate = require('../../views/admin/products/new')
const {requirePrice, requireTitle} = require('./validators')

const router = express.Router();
const upload = multer({storage:multer.memoryStorage()});

router.get('/admin/products',  (req,res) => {
    
});

router.get('/admin/products/new', (req,res) => {
    res.send(productsNewTemplate({}));
});

router.post('/admin/products/new', [requirePrice, requireTitle], upload.single('image'), (req,res) => {
    const errors = validationResult(req);
    console.log(req.file)
    //console.log(req.body);
    res.send('submited')
})



module.exports = router;