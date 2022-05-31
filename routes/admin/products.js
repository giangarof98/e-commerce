const express = require('express');
const multer = require('multer')

const {handleError, requireAuth} = require('./middleware')
const productsRepo = require('../../repositories/products')
const {requirePrice, requireTitle} = require('./validators')
const productsNewTemplate = require('../../views/admin/products/new')
const productsIndexTemplate = require('../../views/admin/products/index')
const productsEditTemplate = require('../../views/admin/products/edit')
const upload = multer({storage:multer.memoryStorage()});
const router = express.Router();

router.get('/admin/products', requireAuth, async (req,res) => {
    
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({products}))
});

router.get('/admin/products/new', requireAuth, (req,res) => {
    res.send(productsNewTemplate({}));
});

router.post('/admin/products/new', requireAuth, upload.single('image'), [requirePrice, requireTitle], handleError(productsNewTemplate), async (req,res) => {
    const image = req.file.buffer.toString('base64');
    const {title,price} = req.body;
    await productsRepo.create({ title,price,image });
    //console.log(req.body);
    res.redirect('/admin/products');
});

router.get('/admin/products/:id/edit', requireAuth, async (req,res) => {
    const product = await productsRepo.getOne(req.params.id);

    if(!product){
        return res.send('Product not found')
    }

    res.send(productsEditTemplate({ product }))
});

router.post('/admin/products/:id/edit', 
    requireAuth, 
    upload.single('image'), 
    [requirePrice, requireTitle], 
    handleError(productsEditTemplate, async (req, res) => {
        const product = await productsRepo.getOne(req.params.id);
        return {product};
    }), 
    async (req,res) => {
    const changes = req.body;

    if(req.file){
        changes.image = req.file.buffer.toString('base64')
    }

    try{
        await productsRepo.update(req.params.id, changes);
    } catch(error){
        return res.send('Could not find item')
    }

    res.redirect('/admin/products');
});

router.post('/admin/products/:id/delete', requireAuth, async (req,res) => {
    await productsRepo.delete(req.params.id);

    res.redirect('/admin/products')
})



module.exports = router;