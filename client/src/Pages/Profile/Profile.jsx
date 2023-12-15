import React, { useEffect, useState } from "react";
import Header from "../../Component/Headers/Header";
import Footer from "../../Component/Footer/Footer";
import "./Profile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  console.log(user);
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

  // Validate form
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const isValidPhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const maxNameLength = 225;
    const maxAddressLength = 225;

    const errors = {
      name: !formInput.name
        ? "Vui lòng nhập họ và tên."
        : formInput.name.length > maxNameLength
        ? `Tên không được vượt quá ${maxNameLength} ký tự.`
        : "",
      phone: !formInput.phone
        ? "Vui lòng nhập số điện thoại."
        : !isValidPhoneNumber(formInput.phone)
        ? "Số điện thoại không hợp lệ."
        : "",
      address: !formInput.address
        ? "Vui lòng nhập địa chỉ."
        : formInput.address.length > maxAddressLength
        ? `Địa chỉ không được vượt quá ${maxAddressLength} ký tự.`
        : "",
    };
    setValidationErrors(errors);
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    axios
      .patch(`http://localhost:8000/users/${userId}`, formInput)
      .then((res) => {
        setFormInput(res.data);
        toast.promise(resolveAfter3Sec, {
          success: "Cập nhật thông tin thành công 👌",
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
            {/* <p>
              <span style={{ color: "red" }}>(*)</span> Các thông tin bắt buộc
            </p> */}
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
                <div className="error-message" style={{ color: "red" }}>
                  {validationErrors.name}
                </div>
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
                <div className="error-message" style={{ color: "red" }}>
                  {validationErrors.phone}
                </div>
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
                <div className="error-message" style={{ color: "red" }}>
                  {validationErrors.address}
                </div>
              </Form.Group>

              <Button
                style={{ width: "20%", backgroundColor: "#f07e1d" }}
                className="btn-login"
                variant="success"
                type="submit"
              >
                Lưu
              </Button>
              <ToastContainer />
            </Form>
          </div>
        </div>
        {/* <div className="main-right">
          <div className="profile-avatar">
            <img src="https://www.topcv.vn/images/avatar-default.jpg" alt="" />
          </div>
          <div>
            <div className="text-welcome">Chào bạn trở lại,</div>
            <div className="profile-fullname">{user.name}</div>
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
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
