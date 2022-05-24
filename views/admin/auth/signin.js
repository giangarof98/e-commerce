module.exports = ({req}) => {
    return `
        <div> 
            <form method="POST">
                <input name="email" placeholder='email' />
                <input name="password" type="password" placeholder='password' />
                <button>SignIn</button>
            </form>
        </div>
    `
}