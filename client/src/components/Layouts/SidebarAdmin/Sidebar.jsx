import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [textColor, setTextColor] = useState("blue");
  const handleClick = () => {
    setTextColor(textColor === "blue" ? "white" : "blue");
  };

  const linkStyle = {
    color: textColor,
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div
      style={{ backgroundColor: "rgb(40 40 40)" }}
      className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
    >
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href=""
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span style={{ color: "white" }} className="fs-5 d-none d-sm-inline">
            Admin
          </span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <Link to="/admin/user" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-people" />
              <span className="ms-1 d-none d-sm-inline">Users</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/company" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-grid" />
              <span className="ms-1 d-none d-sm-inline">Company</span>
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
              Admin
            </span>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li onClick={handleLogout}>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
