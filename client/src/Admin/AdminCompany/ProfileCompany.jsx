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

  const isCompany = JSON.parse(localStorage.getItem("company")) || {};

  const [companyProfile, setCompanyProfile] = useState(null);

  const getCompanyProfile = async () => {
    if (isCompany.id) {
      const res = await axiosConfig.get(
        `/companies?email_like=${isCompany.email}`
      );
      setCompanyProfile(res.data[0]);
    }
  };
  // console.log(companyProfile);
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
        console.log(response.data);
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
        <div className="col-md-6">
          {companyProfile?.avatar && (
            <div
              style={{
                width: "110px",
                height: "110px",
                border: "1px ridge",
                borderRadius: "20%",
                margin: "30px auto",
                backgroundColor: "red",
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
          <Form type="submit">
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                value={companyProfile?.name}
                name="company"
                type="text"
                placeholder="Tên công ty"
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                value={companyProfile?.email}
                name="email"
                type="text"
                placeholder="Email"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                value={companyProfile?.phone}
                name="phone"
                type="phone"
                placeholder="Số điện thoại"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                value={companyProfile?.time}
                name="time"
                type="text"
                placeholder="Thời gian làm việc"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                value={companyProfile?.personnel}
                name="personnel"
                type="text"
                placeholder="Nhân sự"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                value={companyProfile?.location}
                name="location"
                type="text"
                placeholder="Địa chỉ"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                value={companyProfile?.address}
                name="address"
                type="text"
                placeholder="Thành phố"
                disabled
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex "
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                value={companyProfile?.introduce}
                name="introduce"
                type="textarea"
                placeholder="Giới thiệu công ty"
                as="textarea"
                disabled
                rows={3}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="col ">
          {companyProfile?.userId ? (
            <CustomButton
              label={"Tạo công ty"}
              className={"btn btn-success"}
              onClick={() => setShowCreateModal(false)}
              disabled={true}
              style={{ display: "none" }}
            />
          ) : (
            <CustomButton
              label={"Tạo công ty"}
              className={"btn btn-success"}
              onClick={() => setShowCreateModal(true)}
            />
          )}
          {companyProfile?.userId ? (
            <div className="col mt-5">
              <CustomButton
                label={"Sửa thông tin"}
                className={"btn btn-primary"}
                onClick={() =>
                  navigate(
                    `/admin-company/create-profile/${companyProfile?.id}`
                  )
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
                  navigate(
                    `/admin-company/create-profile/${companyProfile?.id}`
                  )
                }
              />
            </div>
          )}
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
