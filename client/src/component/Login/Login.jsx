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
  console.log(users);

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
    const user = users.find(
      (user) =>
        // console.log(user.password === formInput.password)
        user.email === formInput.email && user.password === formInput.password
    );
    console.log(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setFormInput(user);
      //  navigate("/");
      Swal.fire("Good job!", "Đăng Nhập Thành Công!", "success", "OK").then(
        (result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text: "Tài khoản hoặc mật khẩu không trùng khớp !!",
      });
    }
  };

  return (
    <div>
      <div className="img-login1">
        <div>
          <img className="anh" src="../src/img/topcvimg.png" alt="" />
        </div>
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
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formInput.password}
                  onChange={handleInputChange}
                />
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
