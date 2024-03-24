// addUser.js (Register form componenti)
"use client";

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import useStore from "../../store/store";
import Link from "next/link";

const Login = () => {
  const { setUser } = useStore();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const login = async (formDataWithFile) => {
    try {
      window.localStorage.firstLogin = true;

      const response = await axios.post(
        "http://127.0.0.1:3000/auth/login",
        formDataWithFile
      );

      //console.log("DATA : ", response);

      if (response.status == 200 && window.localStorage) {
        window.localStorage.token = response.data.token;
        //console.log("user 1 : ", response.data.user.name);

        if (response.data && response.data.user) {
          window.localStorage.user = JSON.stringify(
            (response.data || {}).user || {}
          );

          setUser((response.data || {}).user || {});

          //console.log("user 11111111 : ");
        
          window.localStorage.firstLogin = true;
        
          window.location.href = "/";
        }
      } else {
        //window.alert("giriş yapılırken hata")
      }
    } catch (error) {
      //console.error("giriş yapılırken hata oluştu:", error);

      window.alert("giriş yapılırken hata");
    }
  };

  const loginViaGoogle = async () => {
    window.location.href = "http://127.0.0.1:3000/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("username", formData.username);
      formDataWithFile.append("password", formData.password);

      login(formDataWithFile);
    } catch (error) {
      console.error("giriş hatası:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
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
        <div className="col-md-6 offset-md-3">
          <br />
          <br />
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
                placeholder="Enter your username.."
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password.."
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Login
            </button>
          </form>

          <Link
            className="nav-link text-dark w-100 mt-3"
            href="/register"
            style={{ textAlign: "center" }}
          >
            Register
          </Link>
          <br />
          <h3
            className="nav-link text-dark w-100 mt-3"
            style={{ textAlign: "center" }}
            onClick={loginViaGoogle}
          >
            <img
              src="../../google.png" // Google logosunun yolu buraya eklenmeli
              alt="Sign in with Google"
              style={{
                width: "20px", // veya ihtiyacınıza göre ayarlayın
                height: "20px", // veya ihtiyacınıza göre ayarlayın
                verticalAlign: "middle", // Logo ve metni aynı hizada tutar
                marginRight: "8px", // Logonun ve metnin arasında boşluk bırakır
              }}
            />
            Sign in with Google
          </h3>
        </div>
      </div>
      <br />
      <br />

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
            Kvkk kapsamında tarafınıza iletilen uyarıları kabulü beyan
            ettiğinizi bildirir ve kutucuğu işaretleyerek kabul edersiniz.
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
