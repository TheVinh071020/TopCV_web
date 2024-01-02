import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import HomePage from "./Pages/HomePage/HomePage";
import Profile from "./Pages/Profile/Profile";
import Detail from "./Pages/Detail/Detail";
import Recruitment from "./Pages/Recruitment/Recruitment";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";
import UnPrivateRouter from "./components/PrivateRouter/UnPrivateRouter";
import AdminPage from "./Admin/UserAdmin/AdminPage";
import UserAdmin from "./Admin/UserAdmin/UserAD/UserAdmin";
import AdminCompany from "./Admin/AdminCompany/AdminCompany";
import CompanyProfile from "./Pages/CompanyProfile/CompanyProfile";
import ProductCompany from "./Admin/AdminCompany/ProductCompany";
import EditJobCompany from "./Admin/AdminCompany/EditJobCompany";
import Company from "./Admin/UserAdmin/Company/Company";
import EidtCompany from "./Admin/AdminCompany/EidtCompany";
import ProfileCompany from "./Admin/AdminCompany/ProfileCompany";
import Applications from "./Admin/AdminCompany/Applications";
import CreatedCompany from "./Admin/AdminCompany/CreatedCompany";
import CreateJobCompany from "./Admin/AdminCompany/CreateJobCompany";

function App() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [navigate]);

  const [isUser, setIsUser] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "User") {
      setIsUser(true);
    }
    if (user && user.role === "Admin") {
      setIsCompany(true);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminPage />}>
          <Route path="/admin/user" element={<UserAdmin />} />
          <Route path="/admin/company" element={<Company />} />
        </Route>
        <Route path="/admin-company" element={<AdminCompany />}>
          <Route path="/admin-company/profile" element={<ProfileCompany />} />
          <Route
            path="/admin-company/create-profile"
            element={<CreatedCompany />}
          />
          <Route
            path="/admin-company/edit-profile/:id"
            element={<EidtCompany />}
          />
          <Route path="/admin-company/product" element={<ProductCompany />} />
          <Route path="/admin-company/create" element={<CreateJobCompany />} />
          <Route path="/admin-company/edit/:id" element={<EditJobCompany />} />
          <Route path="/admin-company/aplications" element={<Applications />} />
        </Route>
        <Route path="/company-profile" element={<CompanyProfile />} />
        {/* User */}
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
