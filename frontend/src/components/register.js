import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

const Register = () => {
  const apiUrl = "http://localhost:4000/user";
  let isValid;
  let errorMessage;
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

  const userSchema = yup.object().shape({
    username: yup.string().min(3).required("Username is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|)(@\<{}>[\]/$!%*?:;.,=&_#~"'`^+-])[A-Za-z\d|)(@\<{}>[\]/$!%*?:;.,=&_#~"'`^+-]{8,16}$/,
        "Password should be strong"
      ),
  });

  const register = async (e) => {
    e.preventDefault();
    try {
      isValid = await userSchema.isValid(formData);
      const validity = await userSchema.validate(formData, {
        abortEarly: false,
      });
      console.log("fdsfsdfds");
      const createUser = await axios.post(`${apiUrl}/signup`, formData);
      console.log(createUser);
      navigate("/login");
    } catch (error) {
      //   console.log(error);
      errorMessage = error.inner((err) => ({ [err.path]: err.message }));
    }
  };

  return (
    <>
      <div class="register-card">
        <h2>Registration</h2>
        <form onSubmit={register}>
          <div class="form-group">
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleFormChange}
              value={formData.username}
              required
            />
          </div>
          <div class="form-group">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleFormChange}
              value={formData.email}
              required
            />
          </div>
          <div class="form-group">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleFormChange}
              value={formData.password}
              required
            />
          </div>
          <div class="register-buttons">
            <button className="register-button">Register</button>
            <Link to="/login">
              <button className="register-login-button">Login</button>
            </Link>
          </div>
          {/* <button type="submit" className="register-submit-button">Register</button> */}
        </form>
      </div>
    </>
  );
};

export default Register;
