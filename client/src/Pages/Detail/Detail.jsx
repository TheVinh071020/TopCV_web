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
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(null);
  let { jobId } = useParams();
  let dispatch = useDispatch();
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
  // console.log(infoUser);

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
        createdAt: Date.now(),
      });
    }
  }, [infoUser, job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });

      const currentUser = await axiosConfig.get(`/users/${user.id}`);
      const currentPassword = currentUser.data.password;

      const { password, ...formDataWithoutPassword } = formData;

      const updateUser = await axiosConfig.patch(
        `/users/${user.id}`,
        formDataWithoutPassword
      );

      updateUser.data.password = currentPassword;

      const updatedUser = updateUser.data;

      const newApplication = {
        id: Number(jobId),
        jobName: job?.name,
        company: job?.company,
        avatar: job?.avatar,
        address: job?.address,
        salary: job?.salary,
        level: job?.level,
        experience: job?.experience,
        scale: job?.scale,
        status: job?.status,
        createdAt: Date.now(),
        userId: formData.id,
      };

      const isAlreadyApplied = updatedUser.applications.some(
        (application) => application.id === Number(jobId)
      );

      if (isAlreadyApplied) {
        toast.warn("Bạn đã ứng tuyển cho công việc này trước đó.");
        setOpen(false);
      } else {
        const updatedApplications = [
          ...updatedUser.applications,
          newApplication,
        ];
        const updatedUserWithApplications = {
          ...updatedUser,
          applications: updatedApplications,
        };

        const { password, ...updatedUserWithoutPassword } =
          updatedUserWithApplications;

        const updatedUserInfo = await axiosConfig.patch(
          `/users/${user.id}`,
          updatedUserWithoutPassword
        );
        updatedUserInfo.data.password = currentPassword;
        console.log(updatedUserInfo.data.password);
        console.log(currentPassword);
        setInfoUser(updatedUserInfo.data);
        dispatch({
          type: "ADD_APPLICATION_USER",
          payload: updatedUserInfo.data,
        });
        localStorage.setItem(
          "applications",
          JSON.stringify(updatedUserInfo.data)
        );
        setOpen(false);
        toast.success("Gửi đơn ứng tuyển thành công 👌");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setFormErrors(validationErrors);
      } else {
        console.error("Có lỗi xảy ra khi gửi đơn ứng tuyển:", error);
      }
    }
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
          <DetailBodyLeft job={job} setOpen={setOpen} />
        </div>
        <DetailBodyRight job={job} />
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
