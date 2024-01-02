import React, { useEffect, useState } from "react";
import Header from "../../components/Layouts/Headers/Header";
import Footer from "../../components/Layouts/Footer/Footer";
import { Helmet } from "react-helmet";
import "./Detail.css";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { axiosConfig } from "../../axios/config";
import DetailBodyRight from "../../components/Layouts/DetailBody/DetailBodyRight";
import DetailBodyLeft from "../../components/Layouts/DetailBody/DetailBodyLeft";

function Detail() {
  // Chia role user và company
  const [isUserRole, setIsUserRole] = useState(false);
  const [isCompanyRole, setIsCompanyRole] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "User") {
      setIsUserRole(true);
    }
    if (user && user.role === "Admin") {
      setIsCompanyRole(true);
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(null);
  let { jobId } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const [infoUser, setInfoUser] = useState(null);
  // Form input
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    education: "",
    certification: "",
    gender: "",
    avatar: "",
  });

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
      .required("Vui lòng nhập số điện thoại"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    education: yup.string().required("Vui lòng nhập học vấn"),
    certification: yup.string().required("Vui lòng nhập chứng chỉ"),
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    education: "",
    certification: "",
  });
  // Validate function
  const validateField = async (name, value) => {
    try {
      await schema.validateAt(name, { [name]: value });
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  // Lưu đơn ứng tuyển
  const renderUser = async () =>
    await axiosConfig
      .get(`/users/${user.id}`)
      .then((res) => {
        setInfoUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  const renderJobs = async () => {
    await axiosConfig
      .get(`/jobs/${jobId}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (infoUser && job) {
      setFormData({
        id: infoUser.id,
        name: infoUser.name,
        phone: infoUser.phone,
        email: infoUser.email,
        address: infoUser.address,
        education: infoUser.education,
        certification: infoUser.certification,
        gender: infoUser.gender,
        avatar: infoUser.avatar,
        createdAt: Date.now(),
      });
    }
  }, [infoUser, job]);

  const [hasApplied, setHasApplied] = useState(false);
  const [isOrderCreated, setIsOrderCreated] = useState(false);

  const handleSubmit = async (e) => {
    // Tạo đơn
    const newApplication = {
      jobId: Number(jobId),
      userId: formData.id,
      companyId: job?.companyId,
      userName: formData.name,
      userEmail: formData.email,
      userPhone: formData.phone,
      userAddress: formData.address,
      userAvatar: formData.avatar,
      education: formData.education,
      certification: formData.certification,
      gender: formData.gender,
      jobName: job?.name,
      company: job?.company,
      avatar: job?.avatar,
      address: job?.address,
      location: job?.location,
      salary: job?.salary,
      level: job?.level,
      experience: job?.experience,
      scale: job?.scale,
      createdAt: Date.now(),
      status: "Chờ xét duyệt",
    };

    const response = await axiosConfig.post("/applications", newApplication);
    setHasApplied(true);
    setIsOrderCreated(true);
    toast.success("Gửi đơn ứng tuyển thành công 👌");
    setOpen(false);
  };

  useEffect(() => {
    renderJobs();
    if (user) {
      renderUser();
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Tuyển nhân viên</title>
      </Helmet>

      <Modal
        title="Nhập thông tin ứng tuyển"
        visible={open}
        onCancel={() => setOpen(false)}
        width={900}
        style={{
          top: 130,
        }}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Gửi
          </Button>,
        ]}
      >
        <Row justify="space-evenly" align="middle">
          <Col
            span={10}
            xs={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            style={{ marginBottom: "15px" }}
          >
            <Input
              size="large"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Họ và tên"
            />
            {formErrors.name && (
              <span style={{ color: "red" }}>{formErrors.name}</span>
            )}
          </Col>
          <Col
            span={10}
            xs={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            style={{ marginBottom: "15px" }}
          >
            <Input
              size="large"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Số điện thoại"
            />
            {formErrors.phone && (
              <span style={{ color: "red" }}>{formErrors.phone}</span>
            )}
          </Col>
          <Col
            span={10}
            xs={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            style={{ marginBottom: "15px" }}
          >
            <Input
              width={80}
              size="large"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              disabled={formData.email !== ""}
            />
            {formErrors.email && (
              <span style={{ color: "red" }}>{formErrors.email}</span>
            )}
          </Col>
          <Col
            span={10}
            xs={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            style={{ marginBottom: "15px" }}
          >
            <Input
              width={80}
              size="large"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Địa chỉ"
            />
            {formErrors.address && (
              <span style={{ color: "red" }}>{formErrors.address}</span>
            )}
          </Col>
          <Col style={{ marginBottom: "15px", width: "89%" }}>
            <Input
              width={80}
              size="large"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Học vấn"
            />
            {formErrors.education && (
              <span style={{ color: "red" }}>{formErrors.education}</span>
            )}
          </Col>
          <Col style={{ marginBottom: "15px", width: "89%" }}>
            <Input
              width={80}
              size="large"
              name="certification"
              value={formData.certification}
              onChange={handleInputChange}
              placeholder="Chứng chỉ"
            />
            {formErrors.certification && (
              <span style={{ color: "red" }}>{formErrors.certification}</span>
            )}
          </Col>
        </Row>
      </Modal>
      <Header />
      <div className="list-feature-jobs">
        <div className="container">
          <div className="title">
            <h2>Việc làm tốt nhất</h2>
            <div className="box-label">
              <img
                src="	https://static.topcv.vn/v4/image/welcome/feature-job/label-toppy-ai.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container job-detail-body">
        <div className="job-detail__body-left">
          <DetailBodyLeft
            job={job}
            userId={user?.id}
            setOpen={setOpen}
            isUserRole={isUserRole}
            isCompanyRole={isCompanyRole}
            hasApplied={hasApplied}
            isOrderCreated={isOrderCreated}
          />
        </div>
        <DetailBodyRight job={job} />
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
