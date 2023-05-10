import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { toast, Flip } from "react-toastify";
import { userLogin } from "../api/apiServices";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  // const apiUrl = "http://localhost:4000/user";
  const navigate = useNavigate();

  // const [formData, setFormData] = React.useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // const handleFormChange = (event) => {
  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       [event.target.name]: event.target.value,
  //     };
  //   });
  //   console.log({ formData });
  // };

  const login = async (values, action) => {
    // toastId.current = toast("logging...", { autoClose: false });
    try {
      const userLoggedIn = await userLogin(values);
      toast("User Logged In successfully.", {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        transition: Flip,
      });
      const decoded = jwtDecode(userLoggedIn.data.token);
      localStorage.setItem("user", JSON.stringify(userLoggedIn.data));
      localStorage.setItem("token", JSON.stringify(userLoggedIn.data.token));
      localStorage.setItem("EXPIRED_AT", decoded.exp);
      action.resetForm();
      window.dispatchEvent(new Event("loggedIn"));
      dispatch(logout(false));
      navigate("/dashboard");
    } catch (error) {
      toast(error.response.data.message, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        transition: Flip,
      });
      console.log(error);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      onSubmit: login,
    });

  return (
    <>
      <div class="register-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <input
              className="form-control"
              type="text"
              autoComplete="off"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Enter your Username...."
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <div className="form-error">{errors.username}</div>
            )}
          </div>
          <div class="form-group">
            <input
              className="form-control"
              type="email"
              autoComplete="off"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your Email...."
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <div className="form-error">{errors.email}</div>
            )}
          </div>
          <div class="form-group">
            <input
              className="form-control"
              type="password"
              autoComplete="off"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your Password...."
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <div className="form-error">{errors.password}</div>
            )}
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
