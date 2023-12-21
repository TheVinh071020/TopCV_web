import React from "react";
import "./Register.css";
import RegisterUser from "../../components/screens/RegisterUser";

function Register() {
  const token = localStorage.getItem("token") || null;
  if (!token) {
    return <RegisterUser />;
  } else {
    return <Navigate to="/" />;
  }
}

export default Register;
