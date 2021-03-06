const {check} = require('express-validator');
const userRepo = require('../../repositories/user');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({min:5, max:20})
        .withMessage('Must be between 5 and 40 characters'),
    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({min:1})
        .withMessage('1$ is the min'),
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom( async email => {
            const existingUser = await userRepo.getOneBy({email})
            if(existingUser){
                throw new Error('Email in use');
            }
        }),
    requirePassword: check('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirm: check('passwordConfirm')
        .trim()
        .isLength({min:4, max:20})
        .withMessage('Must be between 4 and 20 characters')
        .custom((passwordConfirm, {req}) => {
            if(passwordConfirm !== req.body.password){
                throw new Error('Password doesnt match')
            }
    }),
    requireExistingEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provided a valid email')
        .custom(async(email) => {
            const user = await userRepo.getOneBy({email})
            if(!user){
                throw new Error('Email not found')
            }
        }),
    requireExistingPassword: check('password')
        .trim()
        .custom(async(password,{req}) => {
            const user = await userRepo.getOneBy({email:req.body.email})
            if(!user){
                throw new Error('Invalid password');

            }
            const validPassword = await userRepo.comparePassword(
                user.password, 
                password
            );
            if(!validPassword){
                throw new Error('Invalid password');
            }
        })
}