import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {
  const isUser = localStorage.getItem("token") || "";

  return isUser ? <Navigate to={"/"} /> : <Outlet />;
}

export default PrivateRouter;
