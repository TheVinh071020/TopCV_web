import React, { useEffect, useState } from "react";
import Header from "../../Component/Headers/Header";
import Footer from "../../Component/Footer/Footer";
import { Helmet } from "react-helmet";
import "./Detail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "antd";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

  // Lưu đơn ứng tuyển
  const renderUser = async () =>
    await axios
      .get(`http://localhost:8000/users/${user.id}`)
      .then((res) => {
        setInfoUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  console.log(infoUser);

  const renderJobs = async () => {
    await axios
      .get(`http://localhost:8000/jobs/${jobId}`)
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
        education: "",
        certification: "",
        createdAt: Date.now(),
      });
    }
  }, [infoUser, job]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (index) => {
    const updateUser = await axios.patch(
      `http://localhost:8000/users/${user.id}`,
      formData
    );
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
      const updatedApplications = [...updatedUser.applications, newApplication];
      const updatedUserWithApplications = {
        ...updatedUser,
        applications: updatedApplications,
      };

      const updatedUserInfo = await axios.patch(
        `http://localhost:8000/users/${user.id}`,
        updatedUserWithApplications
      );

      setInfoUser(updatedUserInfo.data);
      dispatch({ type: "ADD_APPLICATION_USER", payload: updatedUserInfo.data });
      setOpen(false);
      toast.success("Gửi đơn ứng tuyển thành công 👌");
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
            />
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
          <div className="job-detail__info">
            <h1 style={{ marginBottom: "15px" }} className="title">
              IT Software/Network
            </h1>
            <div className="info-section">
              <div className="info-sections">
                <div className="icon-section">
                  <i className="fa-solid fa-dollar-sign "></i>
                </div>
                <div className="content-section">
                  <div className="title">Mức lương</div>
                  <div className="value">{job?.salary} triệu</div>
                </div>
              </div>
              <div className="info-sections">
                <div className="icon-section">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="content-section">
                  <div className="title">Địa điểm</div>
                  <div className="value">{job?.address.city}</div>
                </div>
              </div>
              <div className="info-sections">
                <div className="icon-section">
                  <i className="fa-solid fa-hourglass-half"></i>{" "}
                </div>
                <div className="content-section">
                  <div className="title">Kinh nghiệm</div>
                  <div className="value">{job?.experience}</div>
                </div>
              </div>
            </div>
            <div className="box-apply-current">
              <div>
                <Button
                  className="btn-apply"
                  variant="outline-success"
                  type="primary"
                  onClick={() => setOpen(true)}
                >
                  <i
                    style={{ marginRight: "15px" }}
                    class="fa-regular fa-paper-plane"
                  ></i>
                  Ứng tuyển ngay
                </Button>
              </div>
            </div>
          </div>
          <div className="job-detail__box--left">
            <div className="job-detail__info-detail">
              <h2 className="job-detail__information-detail--title">
                Chi tiết tin tuyển dụng
              </h2>
            </div>
            <div className="job-detail__information-detail--content">
              <div className="job-description">
                <div className="job-description__item">
                  <h3>Mô tả công việc</h3>
                  <div className="job-description__item--content">
                    {job?.description.map((description, i) => (
                      <ul key={i}>
                        <li>{description}</li>
                      </ul>
                    ))}
                  </div>
                </div>
                <div className="job-description__item">
                  <h3>Yêu cầu ứng viên</h3>
                  <div className="job-description__item--content">
                    {job?.requirement.map((requirement, i) => (
                      <ul key={i}>
                        <li>{requirement}</li>
                      </ul>
                    ))}
                  </div>
                </div>

                <div className="job-description__item">
                  <h3>Quyền lợi</h3>
                  <div className="job-description__item--content">
                    {job?.benefit.map((bene, i) => (
                      <ul key={i}>
                        <li>{bene}</li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail__body-right">
          <div className="job-detail__company">
            <div className="company-name">
              <img src={job?.avatar} />
              <h3 className="company-name-label">{job?.company}</h3>
            </div>
            <div className="company-scale">
              <div className="company-title">
                <div>
                  <i class="fa-solid fa-user-group"></i>
                </div>
                <div>Quy mô</div>
              </div>
              <div className="company-value">{job?.personnel} nhân viên</div>
            </div>
            <div className="company-address">
              <div className="company-title">
                <i
                  style={{ fontSize: "18px", paddingRight: "3px" }}
                  class="fa-solid fa-location-dot"
                ></i>
                <div>Địa chỉ</div>
              </div>
              <div className="company-value">{job?.address.city}</div>
            </div>
          </div>
          <div className="job-detail__body-info">
            <h2 className="box-title">Thông tin chung</h2>
            <div className="box-general-content">
              <div className="box-general-group">
                <div className="group-icon">
                  <i
                    style={{ fontSize: "17px" }}
                    className="fa-solid fa-ranking-star"
                  ></i>
                </div>
                <div className="group-info">
                  <div className="group-info-title">Cấp bậc</div>
                  <div className="group-info-value">{job?.level}</div>
                </div>
              </div>
              <div className="box-general-group">
                <div className="group-icon">
                  <i
                    style={{ fontSize: "17px" }}
                    className="fa-solid fa-ranking-star"
                  ></i>
                </div>
                <div className="group-info">
                  <div className="group-info-title">Kinh nghiệm</div>
                  <div className="group-info-value">{job?.experience}</div>
                </div>
              </div>
              <div className="box-general-group">
                <div className="group-icon">
                  <i
                    style={{ fontSize: "17px" }}
                    className="fa-solid fa-ranking-star"
                  ></i>
                </div>
                <div className="group-info">
                  <div className="group-info-title">Số lượng tuyển</div>
                  <div className="group-info-value">{job?.scale}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
