import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  const handleContinue = () => {
    window.scrollTo(0, 0);
  };

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userLogin = JSON.parse(localStorage.getItem("user")) || {};
  const userId = userLogin.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="header-container">
      <div className="header-img">
        <Link to="/">
          <img
            src="https://static.careerbuilder.vn/themes/careerbuilder/img/logo.png"
            alt=""
          />
        </Link>
      </div>
      <div className="header-nav">
        <ul>
          <Link
            onClick={handleContinue}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            <li>Việc làm</li>
          </Link>
          <Link
            onClick={handleContinue}
            to={"/profile"}
            style={{ textDecoration: "none" }}
          >
            <li>Hồ sơ & CV</li>
          </Link>
          <Link
            onClick={handleContinue}
            to={"/recruitment"}
            style={{ textDecoration: "none" }}
          >
            <li>Đã ứng tuyển</li>
          </Link>
        </ul>
      </div>
      <div className="header-page">
        <Link to={"/profile"} style={{ width: "20%" }}>
          <Button variant="outline-success" className="profile">
            <i class="fa-solid fa-user"></i>
          </Button>
        </Link>
        {user ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              color: "black",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "50%",
                color: "black",
                textDecoration: "none",
              }}
            >
              {user?.name}
            </div>
            <Link
              style={{
                width: "50%",
                color: "white",
                textDecoration: "none",
                marginLeft: "20px",
              }}
              to="/login"
            >
              <Button
                onClick={handleLogout}
                variant="success"
                style={{ backgroundColor: "#f07e1d" }}
              >
                Đăng xuất
              </Button>
            </Link>{" "}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Link to="/login" style={{ width: "47%" }}>
              <Button style={{ backgroundColor: "#f07e1d" }} variant="success">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register" style={{ width: "50%" }}>
              <Button
                style={{ width: "73%", backgroundColor: "#f07e1d" }}
                variant="success"
              >
                Đăng ký
              </Button>
              <ToastContainer />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
