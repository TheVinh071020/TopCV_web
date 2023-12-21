import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UnPrivateRouter() {
  const isUser = localStorage.getItem("token") || "";

  return isUser ? <Outlet /> : <Navigate to={"/login"} />;
}

export default UnPrivateRouter;
