import React, { useEffect, useState } from "react";
import Header from "../Headers/Header";
import Footer from "../Footer/Footer";
import "./Profile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  // console.log(user);
  // Lấy giá  trị ô input
  const [formInput, setFormInput] = useState({
    name: user.name,
    phone: "",
    email: user.email,
    password: "",
    address: "",
  });

  console.log(formInput);
  // load user theo id
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        setFormInput(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/users/${userId}`, formInput)
      .then((res) => {
        setFormInput(res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Helmet>
        <title>Thông tin cá nhân</title>
      </Helmet>
      <Header />
      <div className="main">
        <div className="main-left">
          <div>
            <h3>Cài đặt thông tin cá nhân</h3>
            <p>
              <span style={{ color: "red" }}>(*)</span> Các thông tin bắt buộc
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formInput.name}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Nhập Email"
                  value={formInput.email}
                  onChange={handleInputChange}
                  disabled={formInput.email !== ""}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  value={formInput.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Nhập địa chỉ"
                  value={formInput.address}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button
                style={{ width: "20%" }}
                className="btn-login"
                variant="success"
                type="submit"
              >
                Lưu
              </Button>
            </Form>
          </div>
        </div>
        <div className="main-right">
          <div className="profile-avatar">
            <img src="https://www.topcv.vn/images/avatar-default.jpg" alt="" />
          </div>
          <div>
            <div className="text-welcome">Chào bạn trở lại,</div>
            <div className="profile-fullname">{formInput.name}</div>
            <div>
              <span
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "2px 5px",
                  borderRadius: "2px",
                }}
              >
                Tài khoản đã xác thực
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
