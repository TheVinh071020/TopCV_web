import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UnPrivateRouter() {
  const isUser = localStorage.getItem("token") || "";
  const isAdmin = localStorage.getItem("admin") || "";
  const isCompany = localStorage.getItem("company") || "";

  // isUser ? <Outlet /> : <Navigate to={"/login"}
  if (isUser) {
    return isUser ? <Outlet /> : <Navigate to={"/login"} />;
  }
}

export default UnPrivateRouter;
