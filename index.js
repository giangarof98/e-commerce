const express = require('express');
const cookieSession = require('cookie-session');
const userRepo = require('./repositories/user');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(cookieSession({
    keys: ['secret']
}))

app.get('/', (req,res) => {
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

// const bodyParser = (req, res, next) => {
//     if(req.method === 'POST'){
//         req.on('data', data => {
//             const parsed = data.toString('utf8').split('&');
//             const formData = {};
//             for(let pair of parsed){
//                 const [key, value] = pair.split('=');
//                 formData[key] = value;
//             }
//             req.body = formData;
//             next();
//         })
//     } else {
//         next()
//     }
// }

app.post('/', async (req,res) => {
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

const port = 3000;
app.listen(port, () => {
    console.log(`Serving, PORT: ${port}`)
})