import React from "react";

const Register = () => {

    return (
        <>
            <div class="register-card">
                <h2>Registration</h2>
                <form>
                    <div class="form-group">
                        <input className="form-control" type="text" id="username" name="username" placeholder="Username" required />
                    </div>
                    <div class="form-group">
                        <input className="form-control" type="email" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div class="form-group">
                        <input className="form-control" type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    <div class="register-buttons">
                        <button className="register-button">Register</button>
                        <button className="register-login-button">Login</button>
                    </div>
                    {/* <button type="submit" className="register-submit-button">Register</button> */}
                </form>
            </div>

        </>
    )
}

export default Register;