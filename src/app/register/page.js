// addUser.js (Register form componenti)
"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import * as Yup from "yup";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password_again: "",
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password_again: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
    }),
    onSubmit: (values) => {
      console.log("values : ", values);
      // Add your form submission logic here
    },
  });

  //const { values, handleChange, handleBlur, touched, errors } = formik;

  const [kvkkChecked, setKvkkChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setKvkkChecked(isChecked);

    console.log("KVKK CHECKED : ", isChecked);
  };

  const registerViaGoogle = async () => {
    if (kvkkChecked) {
      window.location.href = "http://127.0.0.1:3000/auth/google";
    } else {
      window.alert("Please check KVKK checkbox.");
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const register = async (formDataWithFile) => {
    try {
      window.localStorage.firstLogin = false;

      const response = await axios.post(
        "http://127.0.0.1:3000/auth/register",
        formDataWithFile
      );

      //console.log("DATA : ", response);

      if (response.status == 200) {
        window.localStorage.firstLogin = true;
        
        window.location.href = "/login";
      } else {
        window.alert("kayıt yapılırken hata")
      }
    } catch (error) {
      console.error("kayıt yapılırken hata oluştu:", error);

      window.alert("kayıt yapılırken hata");
    }
  };

  const handleSubmit = async (e) => {
    if (kvkkChecked) {
      e.preventDefault();

      const { name, value } = e.target;

      setFormData({ ...formData, [name]: value });

      console.log("form data :", formData);
      try {
        await formik.validateForm(); // Form validation'ını çalıştır

        if (formik.isValid) {
          const formDataWithFile = new FormData();

          formDataWithFile.append("username", formData.username);
          formDataWithFile.append("password", formData.password);
          formDataWithFile.append("name", formData.name);
          formDataWithFile.append("email", formData.email);
  
          console.log(formDataWithFile);

          register(formDataWithFile);
        } else {
          window.alert("Form validation failed. Please check your inputs.");
        }
      } catch (error) {
        console.error("giriş hatası:", error);
      }
    } else {
      window.alert("Please check KVKK checkbox.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <br />
          <br />
          <img
            src="../../db1.png" // Google logosunun yolu buraya eklenmeli
            alt="digitson"
            style={{
              width: "50%",
              height: "20%",
              margin: "auto", // Resmi yatayda ve dikeyde ortala
              display: "block", // Resmi blok element olarak görüntüle
            }}
          />

          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formik.values.username}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error text-danger">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formik.values.name}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error text-danger">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error text-danger">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error text-danger">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password Again</label>
              <input
                type="password"
                id="password_again"
                name="password_again"
                className="form-control"
                value={formik.values.password_again}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password_again && formik.errors.password_again ? (
                <div className="error text-danger">{formik.errors.password_again}</div>
              ) : null}
            </div>

            <br />
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Register
            </button>
          </form>

          <Link
            className="nav-link text-dark w-100 mt-3"
            href="/login"
            style={{ textAlign: "center" }}
          >
            Login
          </Link>

          <h3
            className="nav-link text-dark w-100 mt-3"
            style={{ textAlign: "center" }}
            onClick={registerViaGoogle}
          >
            <img
              src="../../google.png" // Google logosunun yolu buraya eklenmeli
              alt="Sign up with Google"
              style={{
                width: "20px", // veya ihtiyacınıza göre ayarlayın
                height: "20px", // veya ihtiyacınıza göre ayarlayın
                verticalAlign: "middle", // Logo ve metni aynı hizada tutar
                marginRight: "8px", // Logonun ve metnin arasında boşluk bırakır
              }}
            />
            Sign up with Google
          </h3>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center", alignItems: "center", color: "#888" }}>
        <h2 className="text-center">
          Kişisel Verilerin Korunması Kanunu (KVKK)
        </h2>
        <br />
        <p>
          Kullanıcı olarak, Kişisel Verilerin Korunması Kanunu ("KVKK")
          kapsamında sizlere bilgi vermek isteriz. Bu çerçevede, şu standart
          kuralları kabul ettiğinizi bildiririz:
        </p>
        Kişisel verileriniz güvenli bir şekilde saklanacak ve korunacaktır.
        Kişisel verileriniz yasal olmayan yollarla toplanmayacaktır. Hesabınızda
        yasadışı veya toplum kurallarına uymayan davranışlar tespit edildiğinde,
        hesabınız askıya alınabilir veya kapatılabilir.
        <p>
          KVKK bilgilendirme metni hakkında daha fazla bilgi almak için lütfen
          bizimle iletişime geçin.
        </p>
        <div className="form-check">
          <label className="form-check-label" htmlFor="kvkkAccepted">
            <input
              className="form-check-input"
              type="checkbox"
              id="kvkkAccepted"
              name="kvkkAccepted"
              checked={kvkkChecked}
              onChange={handleCheckboxChange}
            />
            Kvkk kapsamında tarafınıza iletilen uyarıları kabulü beyan
            ettiğinizi bildirir ve kutucuğu işaretleyerek kabul edersiniz.
          </label>
        </div>
      </div>
    </div>
  );
};

export default Register;
