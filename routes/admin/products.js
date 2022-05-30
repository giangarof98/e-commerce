const express = require('express');
const multer = require('multer')

const {handleError} = require('./middleware')
const productsRepo = require('../../repositories/products')
const productsNewTemplate = require('../../views/admin/products/new')
const {requirePrice, requireTitle} = require('./validators')
const productsIndexTemplate = require('../../views/admin/products/index')

const router = express.Router();
const upload = multer({storage:multer.memoryStorage()});

router.get('/admin/products', async (req,res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({products}))
});

router.get('/admin/products/new', (req,res) => {
    res.send(productsNewTemplate({}));
});

router.post('/admin/products/new', upload.single('image'), [requirePrice, requireTitle], handleError(productsNewTemplate), async (req,res) => {
    const image = req.file.buffer.toString('base64');
    const {title,price} = req.body;
    await productsRepo.create({ title,price,image });
    //console.log(req.body);
    res.redirect('/admin/products');
})



module.exports = router;