import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Login() {
  const notify = (msg, type) => {
    toast[type](msg);
  };

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase.."),
  });

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem("token", data.data.token);
            setIsLoading(false);
            notify("success", "success");
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            // alert(error.response.data.message);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  return (
    <>
      <Helmet>
        <title>Log in</title>
      </Helmet>

      <div className="w-50 m-auto my-5">
        <h2>Login Now</h2>
        <form onSubmit={registerFormik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            type="text"
            className="form-control my-3"
            id="email"
            name="email"
          />
          {registerFormik.errors.email && registerFormik.touched.email ? (
            <div className="alert alert-danger">
              {registerFormik.errors.email}
            </div>
          ) : null}

          <label htmlFor="password">Password</label>
          <input
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            type="password"
            className="form-control my-3"
            id="password"
            name="password"
          />
          {registerFormik.errors.password && registerFormik.touched.password ? (
            <div className="alert alert-danger">
              {registerFormik.errors.password}
            </div>
          ) : null}

          {isLoading ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(registerFormik.isValid && registerFormik.dirty)}
              type="submit"
              className="btn bg-main text-white"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
