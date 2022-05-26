const express = require('express');
const userRepo = require('../../repositories/user');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {requireEmail, requirePassword, requirePasswordConfirm, requireExistingEmail, requireExistingPassword} = require('./validators');
const {check, validationResult} = require('express-validator');
const user = require('../../repositories/user');

const router = express.Router(); 

router.get('/signup', (req,res) => {
    res.send(signupTemplate({req}))
})

router.post('/signup', [requireEmail, requirePassword, requirePasswordConfirm], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(signupTemplate({req, errors}))
    }
    const {email, password, passwordConfirm} = req.body
    //create account
    const user = await userRepo.create({email, password});
    //store id inside cookies
    req.session.userId = user.id;
    res.send(`<div>created</div>`)
    
})

router.get('/signout', (req,res) => {
    req.session = null;
    res.send('You are logged out');
})

router.get('/signin', (req,res) => {
    res.send(signinTemplate({req}))
})

router.post('/signin', [requireExistingEmail, requireExistingPassword], async (req,res) => {
    const errors = validationResult(req);
    console.log(errors)
    const {email} = req.body;
    const user = await userRepo.getOneBy({email});

    req.session.userId = user.id;
    res.send('You are signed in')
})

module.exports = router;