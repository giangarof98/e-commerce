const express = require('express');
const userRepo = require('../../repositories/user');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {check, validationResult} = require('express-validator');
const match = require('nodemon/lib/monitor/match');

const router = express.Router(); 

router.get('/signup', (req,res) => {
    res.send(signupTemplate({req}))
})

router.post('/signup', [
        check('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('Must be a valid email')
            .custom( async (email)=> {
                const existingUser = await userRepo.getOneBy({email})
                if(existingUser){
                    throw new Error('Email in use');
                }
            }),
        check('password')
            .trim()
            .isLength({min:4, max:20})
            .withMessage('Must be between 4 and 20 characters'),
        check('passwordConfirm')
            .trim()
            .isLength({min:4, max:20})
            .withMessage('Must be between 4 and 20 characters')
            .custom((passwordConfirm, {req}) => {
                if(passwordConfirm !== req.body.password){
                    throw new Error('Password doesnt match')
                }
        }),
    ], async (req,res) => {
    const errors = validationResult(req);
    console.log(errors)
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

router.post('/signin', async (req,res) => {
    const {email,password} = req.body;
    const user = await userRepo.getOneBy({email});
    if(!user){
        return res.send('Email not found')
    }
    const validPassword = await userRepo.comparePassword(
        user.password, 
        password
    )
    if(!validPassword){
        return res.send('Invalid password')
    }

    req.session.userId = user.id;
    res.send('You are signed in')
})

module.exports = router;