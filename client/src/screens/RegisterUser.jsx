import React, { useEffect, useState } from "react";
// import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

const isEmailValid = (email) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};
const isPasswordValid = (password) => {
  return /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(password);
};

function RegisterUser() {
  const navigate = useNavigate();

  // Lấy giá  trị ô input
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    locked: false,
    applications: [],
  });

  const [formError, setFormError] = useState({});

  const validateForm = () => {
    const errors = {};

    if (isEmptyValue(formRegister.name)) {
      errors.name = "Họ và tên không được để trống";
    }

    if (isEmptyValue(formRegister.email)) {
      errors.email = "Email không được để trống";
    } else if (!isEmailValid(formRegister.email)) {
      errors.email = "Mời nhập lại Email";
    }

    if (isEmptyValue(formRegister.password)) {
      errors.password = "Password không được để trống";
    } else if (!isPasswordValid(formRegister.password)) {
      errors.password =
        "Mật khẩu cần chứa ít nhất 6 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // console.log(formError);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  console.log(formRegister);
  // Sự kiện click đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await axios
        .post("http://localhost:8000/users", formRegister)
        .then((res) => {
          toast.success("Đăng ký tài khoản thành công 👌");
          navigate("/login");
        })
        .catch((err) => {
          if (err.response.data == "Email already exists") {
            toast.error("Email đã tồn tại. Vui lòng sử dụng email khác 🤯", {
              position: "top-right",
              autoClose: 3000,
              theme: "light",
            });
          }
        });
    } else {
      return formError;
    }
  };
  return (
    <div>
      <div className="img-login1">
        <div className="form-login">
          <h2>ĐĂNG KÝ</h2>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formRegister.name}
                  onChange={handleInputChange}
                  className={formError.name ? "error-input" : ""}
                />
                {formError.name && (
                  <div
                    className="error-feedback"
                    style={{ color: "red", borderColor: "red" }}
                  >
                    {formError.name}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Nhập email"
                  value={formRegister.email}
                  onChange={handleInputChange}
                  className={formError.email ? "error-input" : ""}
                />
                {formError.email && (
                  <div className="error-feedback">{formError.email}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formRegister.password}
                  onChange={handleInputChange}
                  className={formError.password ? "error-input" : ""}
                />
                {formError.password && (
                  <div className="error-feedback">{formError.password}</div>
                )}
              </Form.Group>

              <Button className="btn-login" variant="primary" type="submit">
                Đăng ký
              </Button>
            </Form>
          </div>
          <div className="buttonn">
            <p className="add">
              Bạn đã có tài khoản?
              <NavLink to="/login">
                <b>
                  <u>Đăng nhập</u>
                </b>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;