// addUser.js (Register form componenti)
"use client";

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import useStore from "../../store/store";
import Link from "next/link";

const Register = () => {
  const { setUser } = useStore();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const login = async (formDataWithFile) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/auth/register",
        formDataWithFile
      );

      //console.log("DATA : ", response);

      if (response.status == 200) {
        window.location.href = "/login";
      } else {
        //window.alert("kayıt yapılırken hata")
      }
    } catch (error) {
      console.error("kayıt yapılırken hata oluştu:", error);

      window.alert("kayıt yapılırken hata");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("username", formData.username);
      formDataWithFile.append("password", formData.password);
      formDataWithFile.append("name", formData.name);
      formDataWithFile.append("email", formData.email);

      login(formDataWithFile);
    } catch (error) {
      console.error("giriş hatası:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
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
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Register;
