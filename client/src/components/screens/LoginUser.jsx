import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosConfig } from "../../../src/axios/config";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

function LoginUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [company, setCompany] = useState([]);

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const getUser = async () => {
    axiosConfig
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompany = async () => {
    axiosConfig
      .get("/companies")
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log();

  useEffect(() => {
    getUser();
    getCompany();
  }, []);

  // Lấy giá  trị ô input
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  // console.log(formInput);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // Sự kiện click đăng nhập
  const handleSubmit = async (e) => {
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
      await axiosConfig
        .post("/login", formInput)
        .then((res) => {
          if (res.data.user.locked === false) {
            if (res.data.user.role === "User") {
              toast.success("Đăng nhập thành công 👌");
              dispatch({ type: "UPDATE_USER", payload: res.data.user });
              localStorage.setItem("user", JSON.stringify(res.data.user));
              localStorage.setItem(
                "token",
                JSON.stringify(res.data.accessToken)
              );
              navigate("/");
            } else if (res.data.user.role === "Company") {
              if (res.data.user.status === "Chờ xét duyệt") {
                toast.warning("Tài khoản của bạn đang chờ Admin xét duyệt");
              } else if (res.data.user.status === "Đã xét duyệt") {
                navigate("/admin-company");
                localStorage.setItem("company", JSON.stringify(res.data.user));
                localStorage.setItem(
                  "token",
                  JSON.stringify(res.data.accessToken)
                );
                toast.success("Đăng nhập Admin Company thành công 👌");
              }
            } else if (res.data.user.role === "Admin") {
              navigate("/admin");
              toast.success("Đăng nhập Admin thành công 👌");
            }
          } else if (res.data.user.locked === true) {
            toast.error("Tai khoan đã bị khóa, vui lòng liên hệ: 0936763839");
          }
        })
        .catch((err) => {
          if (err.response.data === "Incorrect password") {
            toast.error("Tài khoản hoặc mật khẩu chưa trùng khớp 🤯");
          }
        });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Trang chủ đăng nhập</title>
      </Helmet>
      <ToastContainer />
      <div className="img-login1">
        <div className="form-login">
          <h2>ĐĂNG NHẬP</h2>
          <div>
            <Form onSubmit={handleSubmit}>
              <CustomInput
                label={"Email"}
                type={"text"}
                name={"email"}
                value={formInput.email}
                handleInputChange={handleInputChange}
                formError={formError.email}
                placeholder={"Nhập email"}
              />
              <CustomInput
                label={"Nhập mật khẩu"}
                type={"password"}
                name={"password"}
                value={formInput.password}
                handleInputChange={handleInputChange}
                formError={formError.password}
                placeholder={"Nhập mật khẩu"}
                style={{ width: "150px" }}
              />
              <CustomButton
                type={"submit"}
                className={"btn-login"}
                variant={"primary"}
                label={"Đăng nhập"}
              />
            </Form>
          </div>
          <div className="buttonn">
            {/* <h4 className="btn-h4">
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
            </button> */}
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

export default LoginUser;
