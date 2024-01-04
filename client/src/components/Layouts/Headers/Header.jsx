import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CustomButton from "../../common/CustomButton";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { axiosConfig } from "../../../axios/config";
import { Button } from "react-bootstrap";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [isUser, setIsUser] = useState(false);
  const [isUserRole, setIsUserRole] = useState(false);
  const [isCompanyRole, setIsCompanyRole] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "User") {
      setIsUserRole(true);
    } else if (user && user.role === "Company") {
      setIsCompanyRole(true);
    } else if (user && user.role === "Admin") {
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      setIsUserRole(true);
    }
  }, []);

  // Giải mã token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        axiosConfig
          .get(`/users/${decodedToken.sub}`)
          .then((res) => {
            setIsUser(true);
            setUsers(res.data);
          })
          .catch((err) => {
            setIsUser(false);
            console.log(err);
          });
      } catch (error) {
        setIsUser(false);
        console.log("Invalid token");
      }
    } else {
      setIsUser(false);
    }
  }, [dispatch]);

  const gotoProfile = () => {
    if (isUser) {
      if (users.role === "User") {
        navigate("/profile");
      } else if (users.role === "Company") {
        navigate("/company-profile");
      } else {
        Swal.fire({
          text: "Bạn cần phải đăng nhập",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Chuyển qua trang đăng nhập!",
              icon: "success",
            });
            navigate("/login");
          }
        });
      }
    }
  };

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("applications");
    localStorage.removeItem("company");
    navigate("/login");
  };

  const [companys, setCompanies] = useState([]);

  const companyLocal = JSON.parse(localStorage.getItem("user"));
  const companyName = companyLocal?.name;

  const getCompany = async () => {
    if (companyName) {
      axiosConfig
        .get(`/companies?name_like=${companyName}`)
        .then((res) => {
          setCompanies(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return null;
    }
  };
  useEffect(() => {
    getCompany();
  }, []);
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
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li>Việc làm</li>
          </Link>
          {isUserRole === true ? (
            <>
              <Link to={"/profile"} style={{ textDecoration: "none" }}>
                <li>Hồ sơ & CV</li>
              </Link>
              <Link to={"/recruitment"} style={{ textDecoration: "none" }}>
                <li>Đã ứng tuyển</li>
              </Link>
            </>
          ) : (
            <div onClick={gotoProfile}>
              <Link style={{ textDecoration: "none" }}>
                <li>Thông tin Công ty</li>
              </Link>
            </div>
          )}
        </ul>
      </div>
      <div className="header-page">
        {isUser ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              color: "black",
              textDecoration: "none",
            }}
          >
            {!companys.length > 0 ? (
              <div className="profile-user" onClick={gotoProfile}>
                {" "}
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "30%",
                  }}
                  src={users.avatar}
                  alt=""
                />
                <div style={{ marginLeft: "10px", fontFamily: "Tahoma" }}>
                  {users?.name}
                </div>
              </div>
            ) : (
              <div className="profile-user" onClick={gotoProfile}>
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "30%",
                  }}
                  src={companys[0]?.avatar}
                  alt=""
                />
                <div style={{ marginLeft: "10px", fontFamily: "Tahoma" }}>
                  {companys[0]?.name}
                </div>
              </div>
            )}
            <Link
              style={{
                width: "50%",
                color: "white",
                textDecoration: "none",
                marginLeft: "20px",
              }}
              to="/login"
            >
              <CustomButton
                onClick={handleLogout}
                variant={"outline-info"}
                style={{ backgroundColor: "#00d8ee", color: "black" }}
                label={"Đăng xuất"}
              />
            </Link>{" "}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              color: "white",
              marginLeft: "25px",
              textDecoration: "none",
            }}
          >
            <Link to="/login" style={{ width: "47%" }}>
              <CustomButton
                style={{ backgroundColor: "#00d8ee", color: "black" }}
                variant={"outline-info"}
                label={"Đăng nhập"}
              />
            </Link>
            <Link to="/register" style={{ width: "50%" }}>
              <CustomButton
                style={{
                  width: "73%",
                  backgroundColor: "#00d8ee",
                  color: "black",
                }}
                variant={"outline-info"}
                label={"Đăng ký"}
              />
            </Link>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Header;
