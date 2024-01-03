import React, { useEffect, useState } from "react";
import Header from "../../components/Layouts/Headers/Header";
import Footer from "../../components/Layouts/Footer/Footer";
import "./Profile.css";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { axiosConfig } from "../../axios/config";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { schema } from "../../components/common/ValidateForm";

function Profile() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  console.log(user);

  const [initialFormInput, setInitialFormInput] = useState({
    name: user.name,
    phone: "",
    email: user.email,
    education: "",
    certification: "",
    address: "",
    gender: "",
    avatar: "",
    applications: [],
  });

  // Lấy giá trị ô input
  const [formInput, setFormInput] = useState({ ...initialFormInput });

  // load user theo id
  useEffect(() => {
    axiosConfig
      .get(`/users/${userId}`)
      .then((res) => {
        setInitialFormInput(res.data);
        setFormInput(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });

    setIsFormChanged(true);
  };

  // Validate form
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formInput, { abortEarly: false });

      axiosConfig
        .get(`/users/${userId}`)
        .then((res) => {
          const currentUserData = res.data;
          const currentPassword = currentUserData.password;

          const { password, ...rest } = formInput;
          rest.applications = [];
          axiosConfig
            .patch(`/users/${userId}`, rest)
            .then((res) => {
              res.data.password = currentPassword;
              dispatch({ type: "UPDATE_USER", payload: res.data });
              toast.success("Cập nhật thông tin thành công 👌");
              localStorage.setItem("user", JSON.stringify(res.data));
              setInitialFormInput(res.data);
              setIsFormChanged(false);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
    }
  };
  console.log(validationErrors);
  const handleAvatarUpload = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          setFormInput((prev) => ({ ...prev, avatar: url }));
          localStorage.setItem("avatar", url);
          const inputElement = document.getElementById("avatarInput");
          if (inputElement) {
            inputElement.value = url;
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
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
              <Form.Group
                className="d-flex justify-content-between w-100"
                controlId="formGroupPassword"
              >
                <CustomInput
                  label={"Họ và tên"}
                  type={"text"}
                  name={"name"}
                  placeholder={"Họ và tên"}
                  value={formInput.name || ""}
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
              </Form.Group>
              <CustomInput
                label={"Số điện thoại"}
                type={"text"}
                name={"phone"}
                placeholder={"Nhập số điện thoại"}
                value={formInput.phone || ""}
                handleInputChange={handleInputChange}
                formError={validationErrors.phone}
              />
              <CustomInput
                label={"Địa chỉ"}
                type={"text"}
                name={"address"}
                placeholder={"Nhập địa chỉ"}
                value={formInput.address || ""}
                handleInputChange={handleInputChange}
                formError={validationErrors.address}
              />
              <CustomInput
                label={"Học vấn"}
                type={"text"}
                name={"education"}
                placeholder={"Nhập học vấn"}
                value={formInput.education || ""}
                handleInputChange={handleInputChange}
                formError={validationErrors.education}
              />
              <CustomInput
                label={"Chứng chỉ"}
                type={"text"}
                name={"certification"}
                placeholder={"Nhập chứng chỉ"}
                value={formInput.certification || ""}
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
                style={{ width: "20%", backgroundColor: "#00d8ee" }}
                className={"btn-login"}
                variant={"success"}
                type={"submit"}
                label={"Cập nhật"}
              />
            </Form>
          </div>
        </div>
        <div className="main-right">
          <div className="profile-avatar">
            {formInput.avatar ? (
              <img src={formInput.avatar} alt="" />
            ) : (
              <img
                src="https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg"
                alt=""
              />
            )}
          </div>
          <div>
            <div className="text-welcome">Chào bạn trở lại,</div>
            <div className="profile-fullname">{user.name}</div>
            <div>
              <Form.Group
                className="d-flex justify-content-between mb-3 w-100"
                controlId="formGroupPassword"
              >
                <Form.Group className="col-md-6" controlId="formGroupPassword">
                  <Form.Control
                    onChange={handleAvatarUpload}
                    name="avatar"
                    type="file"
                    placeholder="Avatar"
                  />
                </Form.Group>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
