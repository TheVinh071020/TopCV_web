import React, { useEffect, useState } from "react";
import CustomButton from "../../components/common/CustomButton";
import Form from "react-bootstrap/Form";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { axiosConfig } from "../../axios/config";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

function EidtCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    time: "",
    address: "",
    location: "",
    introduce: "",
    avatar: "",
  });

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const [initialCompanyData, setInitialCompanyData] = useState({});

  const getCompanyInfo = async () => {
    await axiosConfig
      .get(`/companies/${id}`)
      .then((res) => {
        setCompany(res.data);
        setInitialCompanyData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCompanyInfo();
  }, [id]);

  const isDataChanged = !Object.keys(company).every((key) => {
    return company[key] === initialCompanyData[key];
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value,
    });
  };

  const editProfile = async (e) => {
    e.preventDefault();
    const response = await axiosConfig.patch(`/companies/${id}`, company);
    toast.success("Cập nhật thông tin công ty thành công!");
    navigate("/admin-company/profile");
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
          <h1 className="titleee mb-4">Sửa thông tin công ty</h1>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              value={company.name}
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Tên công ty"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={company.email}
              name="email"
              type="text"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={company.phone}
              name="phone"
              type="phone"
              placeholder="Số điện thoại"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={company.time}
              name="time"
              type="text"
              placeholder="Thời gian làm việc"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={company.location}
              name="location"
              type="text"
              placeholder="Địa chỉ"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={company.address}
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
              value={company.introduce}
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
            {company.avatar && (
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
                  src={company.avatar}
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
              onClick={editProfile}
              disabled={!isDataChanged}
            />

            <Link to={"/admin-company/profile"}>
              <CustomButton className={"btn btn-danger"} label={"Close"} />
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EidtCompany;
