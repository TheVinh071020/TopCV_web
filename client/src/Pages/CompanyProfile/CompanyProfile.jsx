import React, { useEffect, useState } from "react";
import Header from "../../components/Layouts/Headers/Header";
import { Helmet } from "react-helmet";
import "./CompanyProfile.css";
import { axiosConfig } from "../../axios/config";

function CompanyProfile() {
  const [companys, setCompanies] = useState([]);

  const companyLocal = JSON.parse(localStorage.getItem("user"));
  const companyId = companyLocal?.id;

  const getCompany = async () => {
    axiosConfig
      .get(`/companies?userId_like=${companyId}`)
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(companys);
  useEffect(() => {
    getCompany();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Thông tin Công ty</title>
      </Helmet>
      <Header companys={companys} />
      <div className="container job-detail-body" style={{ marginTop: "5%" }}>
        <div className="job-detail__body-left">
          <div className="job-detail__body-left">
            <div className="job-detail__info">
              <h1 style={{ marginBottom: "15px" }} className="title">
                Giới thiệu Công ty
              </h1>

              <p className="box-apply-current">{companys[0]?.introduce}</p>
            </div>
            <div className="job-detail__info">
              <h1 style={{ marginBottom: "15px" }} className="title">
                Tuyển dụng
              </h1>
            </div>
            <div className="company-feature">
              <div className="feature_item">
                <div className="jobs">
                  <div className="nav1">
                    <div className="avatar">
                      <img
                        src="https://techviec.com/wp-content/uploads/2019/09/rikkeisoft-logo-1.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="nav2">
                    <div className="job_item1">
                      <h5 style={{ fontSize: "15px" }}>aa</h5>
                      <div style={{ fontSize: "13px" }}>aa</div>
                    </div>
                    <div className="nav3">
                      <div className="job_item2">8 triệu</div>
                      <div className="job_item3">ha noi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="job-detail__body-right">
          <div className="job-detail__company">
            <div className="company-name">
              <img src={companys[0]?.avatar} />
              <h3 className="company-name-label">{companys[0]?.name}</h3>
            </div>

            <div className="company-address">
              <div className="company-title">
                <i
                  style={{ fontSize: "18px", paddingRight: "3px" }}
                  class="fa-solid fa-location-dot"
                ></i>
                <div>Địa chỉ</div>
              </div>
              <div className="company-value">
                {companys[0]?.location}, {companys[0]?.address}
              </div>
            </div>
            <div className="company-address">
              <div className="company-title">
                <i
                  style={{ fontSize: "18px", paddingRight: "3px" }}
                  class="fa-solid fa-phone"
                ></i>
                <div>Liên hệ</div>
              </div>
              <div className="company-value">{companys[0]?.phone}</div>
            </div>
            <div className="company-address">
              <div className="company-title">
                <i
                  style={{ fontSize: "18px", paddingRight: "3px" }}
                  class="fa-solid fa-envelope"
                ></i>
                <div>Email</div>
              </div>
              <div className="company-value">{companys[0]?.email}</div>
            </div>
          </div>
          {/* <div className="job-detail__body-info">
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
                  <div className="group-info-value">{companys[0]?.level }</div>
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
                  <div className="group-info-value"></div>
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
                  <div className="group-info-value"></div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
