'use client'

import { useState } from "react"

export default function SignUp() {
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const SignUpModal = () => {
        return (
            <form>
                <label htmlFor="first-name">
                    First Name: <input type="text" id="first-name" name="register_first_name" />
                </label>
                <label htmlFor="last-name">
                    Last Name: <input type="text" id="last-name" name="register_last_name" />
                </label>
                <label htmlFor="email">
                    Email: <input type="email" id="email" name="register_email" />
                </label>
                <label htmlFor="password">
                    Password: <input type="password" id="password" name="register_password" />
                </label>
                <label htmlFor="birthday">
                    Password: <input type="password" id="birthday" name="register_birthday" />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        )
    }

    return (
        <>
            {showSignUpModal && SignUpModal()}
            <button onClick={() => setShowSignUpModal(!showSignUpModal)}>Create New Account</button>
        </>
    )
}