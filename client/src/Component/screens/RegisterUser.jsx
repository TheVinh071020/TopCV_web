import React, { useEffect, useState } from "react";
// import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosConfig } from "../../../src/axios/config";
import { Helmet } from "react-helmet";

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
const isConfirmPasswordValid = (password, confirmPassword) => {
  return password === confirmPassword;
};

function RegisterUser() {
  const navigate = useNavigate();

  // Lấy giá  trị ô input
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      errors.password = "Mật khẩu không được để trống";
    } else if (!isPasswordValid(formRegister.password)) {
      errors.password =
        "Mật khẩu cần chứa ít nhất 6 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }
    if (isEmptyValue(formRegister.confirmPassword)) {
      errors.confirmPassword = "Mật khẩu không được để trống";
    } else if (
      !isConfirmPasswordValid(
        formRegister.password,
        formRegister.confirmPassword
      )
    ) {
      errors.confirmPassword = "Mật khẩu không trùng khớp";
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
      await axiosConfig
        .post("/users", formRegister)
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
      <Helmet>
        <title>Trang chủ đăng ký</title>
      </Helmet>
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
                <Form.Label style={{ width: "150px" }}>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={formRegister.password}
                  onChange={handleInputChange}
                  className={formError.password ? "error-input" : ""}
                />
                {formError.password && (
                  <div className="error-feedback">{formError.password}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ width: "150px" }}>
                  Nhập lại mật khẩu
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formRegister.confirmPassword}
                  onChange={handleInputChange}
                  className={formError.confirmPassword ? "error-input" : ""}
                />
                {formError.confirmPassword && (
                  <div className="error-feedback">
                    {formError.confirmPassword}
                  </div>
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
