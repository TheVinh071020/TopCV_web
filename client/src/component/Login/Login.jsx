import React, { useEffect, useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const errors = {};

    if (!formInput.email || !isEmailValid(formInput.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!formInput.password) {
      errors.password = "Nhập mật khẩu";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Lấy giá  trị ô input
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // Sự kiện click đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = { email: "", password: "" };
    if (!formInput.email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formInput.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!formInput.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (formInput.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setFormError(errors);

    if (Object.keys(errors).length !== 0) {
      axios
        .post("http://localhost:8000/login", formInput)
        .then((res) => {
          // console.log(res.data.user.locked);
          if (res.data.user.locked === false) {
            Swal.fire("Good job!", "Đăng nhập thành công", "success");
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setFormInput(res.data.user);
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response.data === "Incorrect password") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Tài khoản hoặc mật khẩu chưa trùng khớp",
            });
          }
        });
    }
  };

  return (
    <div>
      <div className="img-login1">
        <div className="form-login">
          <h2>ĐĂNG NHẬP</h2>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  value={formInput.email}
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
                  value={formInput.password}
                  onChange={handleInputChange}
                  className={formError.email ? "error-input" : ""}
                />
                {formError.password && (
                  <div className="error-feedback">{formError.password}</div>
                )}
              </Form.Group>

              <Button className="btn-login" variant="primary" type="submit">
                Đăng nhập
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
              <Link to="/register">
                <b>
                  <u>Đăng kí</u>
                </b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
