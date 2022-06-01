const express = require('express');
const cookieSession = require('cookie-session');

const authRouter = require('./routes/admin/auth');
const AdminProductRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(cookieSession({
    keys: ['secret']
}));
app.use(authRouter);
app.use(AdminProductRouter);
app.use(productsRouter);
app.use(cartRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Serving, PORT: ${port}`)
})