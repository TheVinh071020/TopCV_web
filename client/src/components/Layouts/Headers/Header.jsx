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

function Header() {
  const handleContinue = () => {
    window.scrollTo(0, 0);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isUser, setIsUser] = useState(false);
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
            setUsers(res.data)
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

  // gotoProfile
  const gotoProfile = () => {
    if (isUser) {
      navigate("/profile");
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
  };

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("applications");
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
        <CustomButton
          className={"profile"}
          variant={"outline-success"}
          label={<i class="fa-solid fa-user"></i>}
          style={{ width: "40px" }}
          onClick={gotoProfile}
        />

        {isUser ? (
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
                marginLeft: "15px",
              }}
            >
              {users?.name}
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
              <CustomButton
                onClick={handleLogout}
                variant={"success"}
                style={{ backgroundColor: "#f07e1d" }}
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
                style={{ backgroundColor: "#f07e1d" }}
                variant={"success"}
                label={"Đăng nhập"}
              />
            </Link>
            <Link to="/register" style={{ width: "50%" }}>
              <CustomButton
                style={{ width: "73%", backgroundColor: "#f07e1d" }}
                variant={"success"}
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
