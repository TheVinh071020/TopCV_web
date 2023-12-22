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
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";
import UnPrivateRouter from "./components/PrivateRouter/UnPrivateRouter";
import AdminPage from "./Admin/AdminPage";
import UserAdmin from "./Admin/UserAdmin/UserAdmin";

function App() {
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
        <Route path="/admin" element={<AdminPage />}>
          <Route path="/admin/user" element={<UserAdmin />} />
        </Route>
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
