import React, { useEffect, useState } from "react";
import Header from "../../Component/Headers/Header";
import Footer from "../../Component/Footer/Footer";
import { Helmet } from "react-helmet";
import "./Detail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Col from "react-bootstrap/Col";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { Col, Row } from "antd";

function Detail() {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);

  const [job, setJob] = useState(null);
  let { jobId } = useParams();

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
  // console.log(job?.requirement);

  useEffect(() => {
    renderJobs();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Tuyển nhân viên</title>
      </Helmet>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        with={900}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin ứng tuyển của bạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-2">
            <Col>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Email address"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Email address"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal
        title="Nhập thông tin ứng tuyển của bạn"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={900}
        style={{
          top: -130,
        }}
      >
        <Row justify="space-evenly" align="middle">
          <Col
            span={10}
            xs={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            style={{ marginBottom: "15px" }}
          >
            <Input size="large" placeholder="Họ và tên" />
          </Col>
          <Col
            span={10}
            xs={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            style={{ marginBottom: "15px" }}
          >
            <Input size="large" placeholder="Số điện thoại" />
          </Col>
          <Col
            span={10}
            xs={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            style={{ marginBottom: "15px" }}
          >
            <Input width={80} size="large" placeholder="Email" />
          </Col>
          <Col
            span={10}
            xs={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            style={{ marginBottom: "15px" }}
          >
            <Input width={80} size="large" placeholder="Địa chỉ" />
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
                  // onClick={handleShow}
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
