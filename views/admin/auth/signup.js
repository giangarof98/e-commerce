const layout = require('../layout');
const {getError} = require('../../helpers');

module.exports = ({ req, errors }) => {
    return layout({content:`
        <div> 
            <h2>Id: ${req.session.userId} </h2>
            <form method="POST">
                <input name="email" placeholder='email' />
                ${getError(errors, 'email')}
                <input name="password" type="password" placeholder='password' />
                ${getError(errors, 'password')}
                <input name="passwordConfirm" type="password" placeholder='password confirmation' />
                ${getError(errors, 'passwordConfirm')}
                <button>SignUp</button>
            </form>
        </div>
        `});
}