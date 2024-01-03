// AdminGuard.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role === "Admin";
    const isCompany = user && user.role === "Company";

    if (isAdmin) {
      navigate("/admin");
      console.log("Admin");
    } else if (!isAdmin) {
      console.log("not admin");
    }
  }, [navigate]);

  return children;
};

export default AdminGuard;
