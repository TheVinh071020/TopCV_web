import React from "react";
import Header from "../../Component/Headers/Header";
import Footer from "../../Component/Footer/Footer";
import { Button, Select, Space } from "antd";
import "./Recruitment.css";

function Recruitment() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <Header />
      <div
        className="container job-detail-body"
        style={{
          width: "950px",
          marginTop: "8%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="job-detail__body-left" style={{ width: "100%" }}>
          <div
            className="job-detail__info"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 className="title">Công việc đã ứng tuyển</h1>
            <div className="box-select">
              <Space wrap>
                <Select
                  defaultValue="Trạng thái :"
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
          <div className="job-detail__box--left" style={{width: "85%", marginLeft: "47px" }}>
            <div className="info-detail">
              <div className="info-detail-img">
                <img
                  src="https://techviec.com/wp-content/uploads/2019/09/rikkeisoft-logo-1.png"
                  alt=""
                />
              </div>
              <div className="body">
                <div className="info-detail-title">
                  <h4 className="titles">Thuc tap sinh</h4>
                  <div className="salary">
                    <div className="icon-salary">
                      <i class="fa-solid fa-dollar-sign"></i>
                    </div>
                    <div style={{ fontWeight: "bold" }}>8 triệu</div>
                  </div>
                </div>
                <div className="info-detail-title">
                  <div className="titless">Cong ty</div>
                </div>
                <div className="info-detail-title">
                  <div className="titless">Thời gian ứng tuyển </div>
                </div>
                <div className="info-detail-title">
                  <div className="titless">Thuc tap sinh</div>
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

export default Recruitment;
