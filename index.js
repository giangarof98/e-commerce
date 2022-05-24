const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth')
const app = express();


app.use(express.urlencoded({extended:true}));
app.use(cookieSession({
    keys: ['secret']
}));
app.use(authRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Serving, PORT: ${port}`)
})