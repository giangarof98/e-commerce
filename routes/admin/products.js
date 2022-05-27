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

router.post('/admin/products/new', upload.single('image'), [requirePrice, requireTitle], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(productsNewTemplate({errors}))
    }
    const image = req.file.buffer.toString('base64');
    const {title,price} = req.body;
    await productsRepo.create({ title,price,image });
    //console.log(req.body);
    res.send('submited');
})



module.exports = router;