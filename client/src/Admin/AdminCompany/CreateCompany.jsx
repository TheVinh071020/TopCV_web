import React, { useState } from "react";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import Form from "react-bootstrap/Form";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { axiosConfig } from "../../axios/config";

function CreateCompany() {
  const isCompany = JSON.parse(localStorage.getItem("user"));

  const [formInput, setFormInput] = useState({
    userId: isCompany.id,
    name: isCompany.name,
    email: isCompany.email,
    phone: "",
    time: "",
    address: "",
    location: "",
    introduce: "",
    avatar: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const response = await axiosConfig.post("/companies", formInput);
  };
  const handleAvatarUpload = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          console.log(url);
          setFormInput((prev) => ({ ...prev, avatar: url }));
          // Cập nhật giá trị URL vào ô input chọn ảnh
          const inputElement = document.getElementById("avatarInput");
          if (inputElement) {
            inputElement.value = url;
          }
          toast.success("Upload ảnh thành công");
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };
  return (
    <div className="container ">
      <div className="col-md-8 offset-md-1">
        <Form type="submit">
          <h1 className="titleee mb-4">Tạo Công ty</h1>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              value={formInput.name}
              onChange={handleInputChange}
              name="company"
              type="text"
              placeholder="Tên công ty"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.email}
              name="email"
              type="text"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.phone}
              name="phone"
              type="phone"
              placeholder="Số điện thoại"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.time}
              name="time"
              type="text"
              placeholder="Thời gian làm việc"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.location}
              name="location"
              type="text"
              placeholder="Địa chỉ"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.address}
              name="address"
              type="text"
              placeholder="Thành phố"
            />
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex "
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              onChange={handleInputChange}
              value={formInput.introduce}
              name="introduce"
              type="textarea"
              placeholder="Giới thiệu công ty"
              as="textarea"
              rows={1}
            />
          </Form.Group>
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
            {formInput.avatar && (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px ridge ",
                  borderRadius: "20px",
                }}
                className="d-flex align-items-center"
              >
                <img
                  src={formInput.avatar}
                  alt="Uploaded Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20px",
                  }}
                />
              </div>
            )}
          </Form.Group>
          <div className="d-flex gap-3">
            <CustomButton
              className={"btn btn-success"}
              label={"Submit"}
              type={"submit"}
              onClick={updateProfile}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateCompany;
