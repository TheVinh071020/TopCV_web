import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";

function Header() {
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

  // console.log(user);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
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
          <li>Việc làm</li>
          <li>Hồ sơ & CV</li>
          <li>Công ty</li>
          <li>Phát triển sự nghiệp</li>
        </ul>
      </div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="header-page">
        <Link to={"/profile"} style={{ width: "20%" }}>
          <Button variant="outline-success" className="profile">
            <i class="fa-solid fa-user"></i>
          </Button>
        </Link>
        {user ? (
          <Link
            style={{ width: "50%", color: "white", textDecoration: "none" }}
            to="/login"
          >
            <Button onClick={handleLogout} variant="success">
              Đăng xuất
            </Button>
          </Link>
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
              <Button variant="success">Đăng nhập</Button>
            </Link>
            <Link to="/register" style={{ width: "50%" }}>
              <Button style={{ width: "73%" }} variant="success">
                Đăng ký
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;