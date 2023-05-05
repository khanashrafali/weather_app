import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const apiUrl = "http://localhost:4000/user";
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleFormChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
    console.log({ formData });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const userLoggedIn = await axios.post(`${apiUrl}/login`, formData);
      console.log(userLoggedIn);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="register-card">
        <h2>Login</h2>
        <form onSubmit={login}>
          <div class="form-group">
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              placeholder="Enter your Username...."
              required
            />
          </div>
          <div class="form-group">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Enter your Email...."
              required
            />
          </div>
          <div class="form-group">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              placeholder="Enter your Password...."
              required
            />
          </div>
          <div class="login-buttons">
            <button className="login-submit-button">Login Here</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
