const express = require('express');
const cookieSession = require('cookie-session');

const authRouter = require('./routes/admin/auth');
const productRouter = require('./routes/admin/products');
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(cookieSession({
    keys: ['secret']
}));
app.use(authRouter);
app.use(productRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Serving, PORT: ${port}`)
})