import SignUpModal from "../components/SignUp"

export default function Landing() {
    const LoginRegisterForms = () => {
        return (
            <div id="login-register-square">
                <form>
                    <label htmlFor="email">
                        Email: <input type="email" id="email" name="login_email" />
                    </label>
                    <label htmlFor="password">
                        Password: <input type="password" id="password" name="login_password" />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <a href="#">Forgot Password?</a>
                <SignUpModal />
            </div>
        )
    }
    return (
        <>
            <div id="landing-left">
                <h1 className="text-3xl font-bold underline">Spacebook</h1>
                <div id="recent-logins">
                    {/* TODO: Remember logins from this device (localstorage?) */}
                </div>
            </div> 
            <div id="landing-right">
                <LoginRegisterForms />
            </div>
        </>
    )
}