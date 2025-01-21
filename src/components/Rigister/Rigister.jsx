import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Register() {
  const notify = (msg, type) => {
    toast[type](msg);
  };

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name min length is 3")
      .max(15, "Name max length is 15")
      .required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase.."),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "Password and repassword do not match"),
  });

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then((data) => {
          if (data.status === 201) {
            setIsLoading(false);
            notify("success", "success");
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            // alert(error.response.data.message);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  return (
    <>
      <Helmet>
        <title>Register </title>
      </Helmet>

      <div className="w-50 m-auto my-5">
        <h2>Register Now</h2>
        <form onSubmit={registerFormik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            type="text"
            className="form-control my-3"
            id="name"
            name="name"
          />
          {registerFormik.errors.name && registerFormik.touched.name ? (
            <div className="alert alert-danger">
              {registerFormik.errors.name}
            </div>
          ) : null}

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

          <label htmlFor="rePassword">Repassword</label>
          <input
            value={registerFormik.values.rePassword}
            onChange={registerFormik.handleChange}
            type="password"
            className="form-control my-3"
            id="rePassword"
            name="rePassword"
          />
          {registerFormik.errors.rePassword &&
          registerFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {registerFormik.errors.rePassword}
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
