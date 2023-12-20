import React, { useEffect, useState } from "react";
import Header from "../../Component/Layouts/Headers/Header";
import Footer from "../../Component/Layouts/Footer/Footer";
import "./Profile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { axiosConfig } from "../../axios/config";

function Profile() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  // Lấy giá  trị ô input
  const [formInput, setFormInput] = useState({
    name: user.name,
    phone: "",
    email: user.email,
    address: "",
    gender: "",
    applications: [],
  });

  // load user theo id
  useEffect(() => {
    axiosConfig
      .get(`/users/${userId}`)
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
    gender: "",
  });

  const isValidPhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
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
      gender: !formInput.gender ? "Vui lòng chọn giới tính." : "",
    };
    setValidationErrors(errors);
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
    await axiosConfig
      .patch(`/users/${userId}`, formInput)
      .then((res) => {
        dispatch({ type: "UPDATE_USER", payload: res.data });
        toast.success("Cập nhật thông tin thành công 👌");
        localStorage.setItem("user", JSON.stringify(res.data));
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
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select
                  name="gender"
                  value={formInput.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Form.Select>

                <div className="error-message" style={{ color: "red" }}>
                  {validationErrors.gender}
                </div>
              </Form.Group>
              <Button
                style={{ width: "20%", backgroundColor: "#f07e1d" }}
                className="btn-login"
                variant="success"
                type="submit"
              >
                Cập nhật
              </Button>
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
