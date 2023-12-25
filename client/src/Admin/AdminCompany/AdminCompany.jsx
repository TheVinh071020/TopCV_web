import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ProductCompany from "./ProductCompany";

function AdminCompany() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="AdminPage">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div
            style={{ backgroundColor: "rgb(40 40 40)" }}
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span
                  style={{ color: "white" }}
                  className="fs-5 d-none d-sm-inline"
                >
                  Admin Company
                </span>
              </a>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li>
                  <Link
                    to="/admin-company/product"
                    className="nav-link px-0 align-middle"
                  >
                    <i className="fs-4 bi-grid" />
                    <span className="ms-1 d-none d-sm-inline">Products</span>
                  </Link>
                </li>

                <li>
                  <Link to="" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-table" />
                    <span className="ms-1 d-none d-sm-inline">Profile</span>
                  </Link>
                </li>
              </ul>
              <hr />
              <div className="dropdown pb-4">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    style={{ color: "white", fontSize: "20px" }}
                    className="fa-solid fa-user"
                  ></i>
                  <span
                    style={{ color: "white" }}
                    className="d-none d-sm-inline mx-1"
                  >
                    Admin Company
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark text-small shadow"
                  aria-labelledby="dropdownUser1"
                >
                  <li onClick={handleLogout}>
                    <a className="dropdown-item" href="#">
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminCompany;
