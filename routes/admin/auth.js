const express = require('express');
const {handleError} = require('./middleware')
const userRepo = require('../../repositories/user');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {requireEmail, requirePassword, requirePasswordConfirm, requireExistingEmail, requireExistingPassword} = require('./validators');
const user = require('../../repositories/user');
//const {check, validationResult} = require('express-validator');

const router = express.Router(); 

router.get('/signup', (req,res) => {
    res.send(signupTemplate({req}))
})

router.post('/signup', [requireEmail, requirePassword, requirePasswordConfirm], handleError(signupTemplate), async (req,res) => {
    const {email, password} = req.body
    //create account
    const user = await userRepo.create({email, password});
    //store id inside cookies
    req.session.userId = user.id;
    res.redirect('/admin/products')
    
})

router.get('/signout', (req,res) => {
    req.session = null;
    res.redirect('/signin')
})

router.get('/signin', (req,res) => {
    res.send(signinTemplate({req}))
})

router.post('/signin', [requireExistingEmail, requireExistingPassword], handleError(signinTemplate), async (req,res) => {
    const {email} = req.body;
    const user = await userRepo.getOneBy({email});

    req.session.userId = user.id;
    res.redirect('/admin/products')
})

module.exports = router;