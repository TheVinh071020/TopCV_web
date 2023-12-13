import React, { useEffect, useState } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

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

function Register() {
  const navigate = useNavigate();

  // Lấy giá  trị ô input
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    application: [],
    locked: false,
  });

  const [formError, setFormError] = useState({});

  const { name, email, password } = formRegister;

  const validateForm = () => {
    const errors = {};

    if (isEmptyValue(formRegister.name)) {
      errors.name = "Nhập tên là cần thiết";
    }

    if (isEmptyValue(formRegister.email)) {
      errors.email = "Nhập Email là cần thiết";
    } else if (!isEmailValid(formRegister.email)) {
      errors.email = "Mời nhập lại Email";
    }

    if (isEmptyValue(formRegister.password)) {
      errors.password = "Nhập Password là cần thiết";
    } else if (!isPasswordValid(formRegister.password)) {
      errors.password =
        "Mật khẩu cần chứa ít nhất 6 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  console.log(formError);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  // Sự kiện click đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await axios
        .post("http://localhost:8000/users", formRegister)
        .then((res) => {
          console.log(res.data);
          Swal.fire("Good job!", "Đăng ký thành công!", "success");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return formError;
    }
  };

  return (
    <div>
      <div className="img-login1">
        <div className="form-login">
          <h2>ĐĂNG KÍ</h2>
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
            <h4 className="btn-h4">
              <b>Hoặc tiếp tục với</b>
            </h4>
            <button className="btn-8">
              <span>
                <i className="fa-brands fa-facebook-f"></i> Đăng nhập bằng
                facebook
              </span>
            </button>
            <button className="btn-9">
              <span>
                <i className="fa-brands fa-apple"></i> Đăng nhập bằng apple
              </span>
            </button>
            <button className="btn-10">
              <span>
                <i className="fa-brands fa-google"></i> Đăng nhập bằng google
              </span>
            </button>
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

export default Register;
