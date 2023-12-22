import React from "react";
import Header from "../../components/Layouts/Headers/Header";
import Footer from "../../components/Layouts/Footer/Footer";
import { Select, Space } from "antd";
import "./Recruitment.css";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

function Recruitment() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const applicationInfo = useSelector(
    (state) => state.userReducer.applications.applications
  );

  return (
    <div>
      <Helmet>
        <title>Ứng tuyển</title>
      </Helmet>
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
          {applicationInfo === undefined ? (
            <div
              className="job-detail__box--left"
              style={{ width: "85%", marginLeft: "47px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>Chưa có đơn ứng tuyển nào</h4>
              </div>
            </div>
          ) : (
            applicationInfo.map((item, i) => (
              <div
                key={i}
                className="job-detail__box--left"
                style={{ width: "85%", marginLeft: "47px" }}
              >
                <div className="info-detail">
                  <div className="info-detail-img">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="body">
                    <div className="info-detail-title">
                      <div className="titles">
                        <div width={{ width: "250px" }}>{item.jobName}</div>
                      </div>
                      <div className="salary">
                        <div className="icon-salary">
                          <i class="fa-solid fa-dollar-sign"></i>
                        </div>
                        <div style={{ fontWeight: "bold" }}>
                          {item.salary} triệu
                        </div>
                      </div>
                    </div>
                    <div className="info-detail-title">
                      <div className="titless">Công ty: {item.company}</div>
                    </div>
                    <div className="info-detail-title">
                      <div className="titless">{item.level}</div>
                    </div>
                    <div className="info-detail-title">
                      <div className="titless">
                        Thời gian ứng tuyển:
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="info-detail-title">
                      <div className="titless">Trạng thái:{item.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recruitment;
