import React from "react";
import Header from "../Headers/Header";
import Footer from "../Footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import { Select, Space } from "antd";
import "./HomePage.css";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function HomePage() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Helmet>
        <title>Trang chủ CareerBuilder</title>
      </Helmet>
      <Header />
      <div className="carousel">
        <Carousel>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Fseeker-banner%2F2023%2F12%2F11%2Fbanner-website-Xmas-06_170226725619.jpg&w=1920&q=75"
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Fseeker-banner%2F2023%2F12%2F11%2Fbanner-website-Xmas-07_170226691718.jpg&w=1920&q=75"
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Fseeker-banner%2F2023%2F12%2F11%2Fbanner-website-Xmas-07_170226691718.jpg&w=1920&q=75"
              alt=""
            />
          </Carousel.Item>
        </Carousel>
      </div>
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
        <div className="row feature_job">
          <div className="container row-detail ">
            <div className="feature_job_item">
              <div className="job">
                <div className="nav1">
                  <div className="avatar">
                    <img
                      src="https://cdn-new.topcv.vn/unsafe/200x/filters:format(webp)/https://static.topcv.vn/company_logos/cong-ty-tnhh-nha-hang-tung-dining-6389abcfe41f9.jpg"
                      alt=""
                    />
                  </div>
                  <div className="job_item1">
                    <h5>Công ty bla bla</h5>
                    <div style={{ fontSize: "13px" }}>Công ty bla bla</div>
                  </div>
                </div>
                <div className="nav2">
                  <div className="job_item2">8 triệu</div>
                  <div className="job_item3">Ha Noi</div>
                  <div className="job_item_btn">
                    <Link to={"/detail"}>
                      <Button variant="outline-info">Chi tiết</Button>
                    </Link>
                  </div>
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

export default HomePage;
{
}
