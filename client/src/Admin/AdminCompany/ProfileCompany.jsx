import React, { useEffect, useState } from "react";
import CustomButton from "../../components/common/CustomButton";
import Form from "react-bootstrap/Form";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { axiosConfig } from "../../axios/config";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProfileCompany() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCompanyCreated, setIsCompanyCreated] = useState(false);
  const navigate = useNavigate();

  const isCompany = JSON.parse(localStorage.getItem("user")) || {};

  const [companyProfile, setCompanyProfile] = useState(null);

  const getCompanyProfile = async () => {
    if (isCompany.id) {
      const res = await axiosConfig.get(
        `/companies?email_like=${isCompany.email}`
      );
      setCompanyProfile(res.data[0]);
    }
  };
  const [formInput, setFormInput] = useState({
    userId: isCompany?.id,
    name: isCompany?.name,
    email: isCompany?.email,
    phone: "",
    time: "",
    personnel: "",
    address: "",
    location: "",
    introduce: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formInput.phone.trim()) {
      errors.phone = "Vui lòng nhập SĐT!";
      isValid = false;
    }
    if (!formInput.time.trim()) {
      errors.time = "Vui lòng nhập thời gian làm việc!";
      isValid = false;
    }
    if (!formInput.address.trim()) {
      errors.address = "Vui lòng nhập địa chỉ!";
      isValid = false;
    }
    if (!formInput.location.trim()) {
      errors.location = "Vui lòng nhập địa điểm!";
      isValid = false;
    }
    if (!formInput.introduce.trim()) {
      errors.introduce = "Vui lòng nhập giới thiệu!";
      isValid = false;
    }
    if (!formInput.personnel.trim()) {
      errors.personnel = "Vui lòng nhập nhân sự!";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axiosConfig.post("/companies", formInput);
        setCompanyProfile(response.data);
        localStorage.setItem("companys", JSON.stringify(response.data));
        toast.success("Tạo công ty thành công!");
        setIsCompanyCreated(true);
        setShowCreateModal(false);
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tạo công ty!");
      }
    }
  };

  const handleAvatarUpload = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          setFormInput((prev) => ({ ...prev, avatar: url }));
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

  useEffect(() => {
    getCompanyProfile();
  }, []);
  return (
    <div className="container">
      <h1>Thông tin công ty</h1>

      <div className="col m-3 d-flex justify-content-center  gap-3">
        <div className="col-2 align-items-center">
          {companyProfile?.userId ? (
            <CustomButton
              label={"Tạo công ty"}
              className={"btn btn-success"}
              onClick={() => navigate(`/admin-company/create-profile`)}
              disabled={true}
              style={{ display: "none" }}
            />
          ) : (
            <CustomButton
              label={"Tạo công ty"}
              className={"btn btn-success"}
              onClick={() => navigate(`/admin-company/create-profile`)}
            />
          )}
          {companyProfile?.userId ? (
            <div className="col mt-5">
              <CustomButton
                label={"Sửa thông tin"}
                className={"btn btn-primary"}
                onClick={() =>
                  navigate(`/admin-company/edit-profile/${companyProfile?.id}`)
                }
              />
            </div>
          ) : (
            <div className="col mt-5">
              <CustomButton
                label={"Sửa thông tin"}
                className={"btn btn-primary"}
                style={{ display: "none" }}
                onClick={() =>
                  navigate(`/admin-company/edit-profile/${companyProfile?.id}`)
                }
              />
            </div>
          )}
          {companyProfile?.avatar && (
            <div
              style={{
                width: "110px",
                height: "110px",
                border: "1px ridge",
                borderRadius: "20%",
                margin: "30px 0",
                backgroundColor: "#f1bbbb",
              }}
              className="d-flex align-items-center"
            >
              <img
                src={companyProfile?.avatar}
                alt="Uploaded Avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "20px",
                }}
              />
            </div>
          )}
        </div>
        <div className="col-md-8">
          <div style={{ width: "100%" }}>
            <ul style={{ width: "100%" }}>
              <li name="company" style={{ display: "flex", gap: "10px" }}>
                <p style={{ width: "145px" }}>Tên công ty:</p>
                {companyProfile ? (
                  <span style={{ width: "368px", wordBreak: "break-all" }}>
                    {companyProfile?.name}
                  </span>
                ) : (
                  <span style={{ width: "368px", wordBreak: "break-all" }}>
                    {isCompany?.name}
                  </span>
                )}
              </li>
              <li name="email" style={{ display: "flex", gap: "10px" }}>
                <p style={{ width: "145px" }}> Email:</p>
                {companyProfile ? (
                  <span style={{ width: "368px", wordBreak: "break-all" }}>
                    {companyProfile?.email}
                  </span>
                ) : (
                  <span style={{ width: "368px", wordBreak: "break-all" }}>
                    {isCompany?.email}
                  </span>
                )}
              </li>
              <li name="phone" style={{ display: "flex", gap: "10px" }}>
                <p style={{ width: "145px" }}>SĐT:</p>
                <span style={{ width: "368px", wordBreak: "break-all" }}>
                  {companyProfile?.phone}
                </span>
              </li>
              <li name="time" style={{ display: "flex", gap: "10px" }}>
                <p style={{ width: "145px" }}>Thời gian làm việc:</p>
                <span style={{ width: "368px", wordBreak: "break-all" }}>
                  {companyProfile?.time}
                </span>
              </li>
              <li name="personnel" style={{ display: "flex", gap: "10px" }}>
                <p style={{ width: "145px" }}>Nhân sự:</p>
                <span style={{ width: "368px", wordBreak: "break-all" }}>
                  {companyProfile?.personnel}
                </span>
              </li>
              <li name="location" style={{ display: "flex", gap: "10px" }}>
                <p style={{ width: "145px" }}>Địa chỉ:</p>
                <span style={{ width: "368px", wordBreak: "break-all" }}>
                  {companyProfile?.location}
                </span>
              </li>
              <li name="address" style={{ display: "flex", gap: "10px" }}>
                <p style={{ width: "145px" }}> Thành phố:</p>
                <span style={{ width: "368px", wordBreak: "break-all" }}>
                  {companyProfile?.address}
                </span>
              </li>
              <li name="introduce" style={{ display: "flex", gap: "10px" }}>
                <p style={{ width: "145px" }}>Giới thiệu công ty:</p>
                <span style={{ maxWidth: "360px" }}>
                  {companyProfile?.introduce}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <Form type="submit">
            <h1 className="titleee mb-4">Tạo Công ty</h1>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.name}
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
              {errors && <div className="error-feedback"> {errors.phone}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.time}
                name="time"
                type="text"
                placeholder="Thời gian làm việc"
              />
              {errors && <div className="error-feedback"> {errors.time}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.personnel}
                name="personnel"
                type="text"
                placeholder="Nhân sự"
              />
              {errors && (
                <div className="error-feedback"> {errors.personnel}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.location}
                name="location"
                type="text"
                placeholder="Địa chỉ"
              />
              {errors && (
                <div className="error-feedback"> {errors.location}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.address}
                name="address"
                type="text"
                placeholder="Thành phố"
              />
              {errors && (
                <div className="error-feedback"> {errors.address}</div>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3  d-flex"
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
            {errors && (
              <div className="error-feedback"> {errors.introduce}</div>
            )}
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
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProfileCompany;
