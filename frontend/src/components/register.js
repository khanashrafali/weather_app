import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { signupSchema } from "../schemas";
import { toast, Flip } from "react-toastify";

const Register = () => {
  const apiUrl = "http://localhost:4000/user";
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const register = async (values, action) => {
    try {
      const createUser = await axios.post(`${apiUrl}/signup`, values);
      toast("User registered successfully.", {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        transition: Flip,
      });
      action.resetForm();
      navigate("/login");
    } catch (error) {
      toast(error.response.data.message, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        transition: Flip,
      });
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      onSubmit: register,
    });

  return (
    <>
      <div class="register-card">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <input
              className="form-control"
              type="text"
              autoComplete="off"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={values.username}
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
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
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
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <div className="form-error">{errors.password}</div>
            )}
          </div>
          <div class="register-buttons">
            <button type="submit" className="register-button">
              Register
            </button>
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
