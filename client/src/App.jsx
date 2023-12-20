import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import HomePage from "./Pages/HomePage/HomePage";
import Profile from "./Pages/Profile/Profile";
import Detail from "./Pages/Detail/Detail";
import Recruitment from "./Pages/Recruitment/Recruitment";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./Component/PrivateRouter/PrivateRouter";
import UnPrivateRouter from "./Component/PrivateRouter/UnPrivateRouter";
// import { jwtDecode } from "jwt-decode";

function App() {
  // Giải mã token
  // const token = localStorage.getItem("token");
  // const decodedToken = jwtDecode(token);
  // console.log(decodedToken);

  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route element={<UnPrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/detail/:jobId" element={<Detail />} />
        <Route path="/recruitment" element={<Recruitment />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
