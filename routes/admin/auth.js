const { Router } = require('express');
const express = require('express');
const userRepo = require('../../repositories/user');

const router = express.Router(); 

router.get('/signup', (req,res) => {
    res.send(`
        <div> 
            <h2>Id: ${req.session.userId} </h2>
            <form method="POST">
                <input name="email" placeholder='email' />
                <input name="password" type="password" placeholder='password' />
                <input name="passwordConfirm" type="password" placeholder='password confirmation' />
                <button>SignUp</button>
            </form>
        </div>`)
})

router.post('/signup', async (req,res) => {
    const {email, password, passwordConfirm} = req.body
    const existingUser = await userRepo.getOneBy({email})
    if(existingUser){
        return res.send('Email in use');
    }
    if(password !== passwordConfirm){
        return res.send('Password must match')
    }

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
    res.send(`
    <div> 
        <form method="POST">
            <input name="email" placeholder='email' />
            <input name="password" type="password" placeholder='password' />
            <button>SignIn</button>
        </form>
    </div>
    `)
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