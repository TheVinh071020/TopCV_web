import React from "react";
import Header from "../Headers/Header";
import Footer from "../Footer/Footer";
import { Select, Space } from "antd";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Detail.css";

function Detail() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <Helmet>
        <title>Tuyển nhân viên</title>
      </Helmet>
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
            <div className="box-select">
              <Space wrap>
                <Select
                  defaultValue="Lọc theo :"
                  style={{
                    width: 170,
                  }}
                  v
                  onChange={handleChange}
                  options={[
                    {
                      value: "Địa điểm",
                      label: "Địa điểm",
                    },
                    {
                      value: "Mức lương",
                      label: "Mức lương",
                    },
                  ]}
                />{" "}
              </Space>
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
                  <div className="value">8 triệu</div>
                </div>
              </div>
              <div className="info-sections">
                <div className="icon-section">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="content-section">
                  <div className="title">Địa điểm</div>
                  <div className="value">Hà Nội</div>
                </div>
              </div>
              <div className="info-sections">
                <div className="icon-section">
                  <i className="fa-solid fa-hourglass-half"></i>{" "}
                </div>
                <div className="content-section">
                  <div className="title">Kinh nghiệm</div>
                  <div className="value">Không yêu cầu</div>
                </div>
              </div>
            </div>
            <div className="box-apply-current">
              <div>
                <Button className="btn-apply" variant="outline-success">
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
                    <ul>
                      <li>aaa</li>
                      <li>aaa</li>
                      <li>aaa</li>
                      <li>aaa</li>
                    </ul>
                  </div>
                </div>
                <div className="job-description__item">
                  <h3>Yêu cầu ứng viên</h3>
                  <div className="job-description__item--content">
                    <ul>
                      <li>aaa</li>
                      <li>aaa</li>
                      <li>aaa</li>
                      <li>aaa</li>
                    </ul>
                  </div>
                </div>
                <div className="job-description__item">
                  <h3>Phẩm chất cá nhân</h3>
                  <div className="job-description__item--content">
                    <ul>
                      <li>aaa</li>
                      <li>aaa</li>
                      <li>aaa</li>
                      <li>aaa</li>
                    </ul>
                  </div>
                </div>
                <div className="job-description__item">
                  <h3>Quyền lợi</h3>
                  <div className="job-description__item--content">
                    <ul>
                      <li>aaa</li>
                      <li>aaa</li>
                      <li>aaa</li>
                      <li>aaa</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail__body-right">aa</div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
