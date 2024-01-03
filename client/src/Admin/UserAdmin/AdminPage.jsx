import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../../components/Layouts/SidebarAdmin/Sidebar";
import { Helmet } from "react-helmet";

function AdminPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "Admin";

  return (
    <div className="AdminPage">
      <Helmet>Admin</Helmet>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
