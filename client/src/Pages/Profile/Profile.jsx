import React, { useEffect, useState } from "react";
import Header from "../../components/Layouts/Headers/Header";
import Footer from "../../components/Layouts/Footer/Footer";
import "./Profile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { axiosConfig } from "../../axios/config";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

function Profile() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  // Lấy giá  trị ô input
  const [formInput, setFormInput] = useState({
    name: user.name,
    phone: "",
    email: user.email,
    education: "",
    certification: "",
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
    education: "",
    certification: "",
    gender: "",
  });

  const isValidPhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maxValue = 225;

    const errors = {
      name: !formInput.name
        ? "Vui lòng nhập họ và tên."
        : formInput.name.length > maxValue
        ? `Tên không được vượt quá ${maxValue} ký tự.`
        : "",
      phone: !formInput.phone
        ? "Vui lòng nhập số điện thoại."
        : !isValidPhoneNumber(formInput.phone)
        ? "Số điện thoại không hợp lệ."
        : "",
      address: !formInput.address
        ? "Vui lòng nhập địa chỉ."
        : formInput.address.length > maxValue
        ? `Địa chỉ không được vượt quá ${maxValue} ký tự.`
        : "",
      education: !formInput.education
        ? "Vui là chọn học vấn"
        : formInput.education.length > maxValue
        ? `Học vấn không được viết quá ${maxValue} ký tự.`
        : "",
      certification: !formInput.certification
        ? "Vui là chọn chứng dụ"
        : formInput.certification.length > maxValue
        ? `Chứng dụ không được viết quá ${maxValue} ký tự.`
        : "",
      gender: !formInput.gender ? "Vui lòng chọn giới tính." : "",
    };
    setValidationErrors(errors);
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
    axiosConfig
      .get(`/users/${userId}`)
      .then((res) => {
        const currentUserData = res.data;
        const currentPassword = currentUserData.password;

        const { password, ...rest } = formInput;

        axiosConfig
          .patch(`/users/${userId}`, rest)
          .then((res) => {
            res.data.password = currentPassword;
            dispatch({ type: "UPDATE_USER", payload: res.data });
            toast.success("Cập nhật thông tin thành công 👌");
            localStorage.setItem("user", JSON.stringify(res.data));
          })
          .catch((err) => {
            console.log(err);
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
            <Form onSubmit={handleSubmit}>
              <CustomInput
                label={"Họ và tên"}
                type={"text"}
                name={"name"}
                placeholder={"Họ và tên"}
                value={formInput.name}
                handleInputChange={handleInputChange}
                formError={validationErrors.name}
              />
              <CustomInput
                label={"Email"}
                type={"text"}
                name={"email"}
                placeholder={"Nhập Email"}
                value={formInput.email}
                handleInputChange={handleInputChange}
                disabled={formInput.email !== ""}
              />
              <CustomInput
                label={"Số điện thoại"}
                type={"text"}
                name={"phone"}
                placeholder={"Nhập số điện thoại"}
                value={formInput.phone}
                handleInputChange={handleInputChange}
                formError={validationErrors.phone}
              />
              <CustomInput
                label={"Địa chỉ"}
                type={"text"}
                name={"address"}
                placeholder={"Nhập địa chỉ"}
                value={formInput.address}
                handleInputChange={handleInputChange}
                formError={validationErrors.address}
              />
              <CustomInput
                label={"Học vấn"}
                type={"text"}
                name={"education"}
                placeholder={"Nhập học vấn"}
                value={formInput.education}
                handleInputChange={handleInputChange}
                formError={validationErrors.education}
              />
              <CustomInput
                label={"Chứng chỉ"}
                type={"text"}
                name={"certification"}
                placeholder={"Nhập chứng chỉ"}
                value={formInput.certification}
                handleInputChange={handleInputChange}
                formError={validationErrors.certification}
              />
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
              <CustomButton
                style={{ width: "20%", backgroundColor: "#f07e1d" }}
                className={"btn-login"}
                variant={"success"}
                type={"submit"}
                label={"Cập nhật"}
              />
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
