import React from "react";

const Login = () => {
    return (
        <>
            <div class="register-card">
                <h2>Login</h2>
                <form>
                    <div class="form-group">
                        <input className="form-control" type="text" id="username" name="username" placeholder="Enter your Username...." required />
                    </div>
                    <div class="form-group">
                        <input className="form-control" type="email" id="email" name="email" placeholder="Enter your Email...." required />
                    </div>
                    <div class="form-group">
                        <input className="form-control" type="password" id="password" name="password" placeholder="Enter your Password...." required />
                    </div>
                    <div class="login-buttons">
                        <button className="login-submit-button">Login Here</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login;