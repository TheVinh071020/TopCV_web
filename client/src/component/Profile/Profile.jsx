import React, { useState } from "react";
import Header from "../Headers/Header";
import Footer from "../Footer/Footer";
import "./Profile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Profile() {
  // Lấy giá  trị ô input
  const [formInput, setFormInput] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Nhập Email"
                  value={formInput.email}
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
            <div className="profile-fullname">Vinh</div>
            <div>
              <span style={{backgroundColor:"gray", color:"white", padding:"2px 5px", borderRadius:"2px" }}>Tài khoản đã xác thực</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
