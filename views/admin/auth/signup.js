const layout = require('../layout')

module.exports = ({ req }) => {
    return layout({content:`
        <div> 
            <h2>Id: ${req.session.userId} </h2>
            <form method="POST">
                <input name="email" placeholder='email' />
                <input name="password" type="password" placeholder='password' />
                <input name="passwordConfirm" type="password" placeholder='password confirmation' />
                <button>SignUp</button>
            </form>
        </div>
        `});
}