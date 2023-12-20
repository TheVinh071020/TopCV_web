import React from "react";
import "./Login.css";
import LoginUser from "../../Component/screens/LoginUser";

function Login() {
  const token = localStorage.getItem("token") || null;
  if (!token) {
    return <LoginUser />;
  } else {
    return <Navigate to="/" />;
  }
}

export default Login;
