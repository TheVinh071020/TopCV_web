import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosConfig } from "../../../src/axios/config";
import { Helmet } from "react-helmet";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

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

  console.log(formError);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  // console.log(formRegister);
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
              <CustomInput
                label={"Name"}
                type={"text"}
                name={"name"}
                value={formRegister.name}
                handleInputChange={handleInputChange}
                formError={formError.name}
                placeholder={"Họ và tên"}
              />
              <CustomInput
                label={"Email"}
                type={"text"}
                name={"email"}
                value={formRegister.email}
                handleInputChange={handleInputChange}
                formError={formError.email}
                placeholder={"Nhập email"}
              />
              <CustomInput
                label={"Nhập mật khẩu"}
                type={"password"}
                name={"password"}
                value={formRegister.password}
                handleInputChange={handleInputChange}
                formError={formError.password}
                placeholder={"Nhập mật khẩu"}
                style={{ width: "150px" }}
              />
              <CustomInput
                label={"Nhập lại mật khẩu"}
                type={"password"}
                name={"confirmPassword"}
                value={formRegister.confirmPassword}
                handleInputChange={handleInputChange}
                formError={formError.confirmPassword}
                placeholder={"Nhập lại mật khẩu"}
                style={{ width: "150px" }}
                className={formError.email ? "error-input" : ""}
              />
              <CustomButton
                className={"btn-login"}
                variant={"primary"}
                type={"submit"}
                label={"Đăng ký"}
              />
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
