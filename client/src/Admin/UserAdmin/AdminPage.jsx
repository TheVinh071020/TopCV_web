import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Layouts/SidebarAdmin/Sidebar";
import UserAdmin from "./UserAD/UserAdmin";

function AdminPage() {
  return (
    <div className="AdminPage">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar />
          <Outlet />
          {/* <UserAdmin /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
