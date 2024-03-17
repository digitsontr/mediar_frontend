"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const GoogleLoginSuccess = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userDataObject = JSON.parse(params.get("userData") || "{}");

    //console.log("user in google success :", userDataObject);
    //console.log("token in google success :", token);

    if (userDataObject && window.localStorage) {
      window.localStorage.user = JSON.stringify(userDataObject);
      window.localStorage.token = token;

      window.location.href = "/";
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <h3>Yönlendiriliyorsunuz...</h3>
      </div>
      <br />
      <br />
    </div>
  );
};

export default GoogleLoginSuccess;
