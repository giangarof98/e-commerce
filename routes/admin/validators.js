const {check} = require('express-validator');
const userRepo = require('../../repositories/user');

module.exports = {
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

}