const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send(`
        <div> 
            <form method="POST">
                <input name="email" placeholder='email' />
                <input name="password" type="password" placeholder='password' />
                <input name="passwordConfirm" type="password" placeholder='password confirmation' />
                <button>SignUp</button>
            </form>
        </div>`)
})

app.post('/', (req,res) => {
    req.on('data', data => {
        const parsed = data.toString('utf8').split('&');
        const formData = {};
        for(let pair of parsed){
            const [key, value] = pair.split('=');
            formData[key] = value;
        }
        console.log(formData)
    })
    res.send(`<div>created</div>`)
    
})

const port = 3000;
app.listen(port, () => {
    console.log(`Serving, PORT: ${port}`)
})