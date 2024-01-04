import React, { useEffect, useState } from "react";
import Header from "../../components/Layouts/Headers/Header";
import { Helmet } from "react-helmet";
import "./CompanyProfile.css";
import { axiosConfig } from "../../axios/config";
import PaginationPage from "../../components/common/PaginationPage";

function CompanyProfile() {
  const [companys, setCompanies] = useState([]);
  const [listJobs, setListJobs] = useState([]);
  const [total, setTotal] = useState(0);

  const companyLocal = JSON.parse(localStorage.getItem("user"));
  const companyName = companyLocal?.name;

  const getCompany = async () => {
    axiosConfig
      .get(`/companies?name_like=${companyName}`)
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListJobs = async (pageNumber, pageIndex) => {
    axiosConfig
      .get(
        `/jobs?_page=${pageNumber}&_limit=${pageIndex}&&company=${companyName}`
      )
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompany();
    getListJobs(1, 4);
  }, []);

  const [activePage, setActivePage] = useState(1);
  // Pagination
  let pageNumber = 4;
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    setActivePage(page);
    getListJobs(page, pageNumber);
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
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

            {listJobs.length > 0 &&
              listJobs.map((job, i) => (
                <div key={i} className="company-feature">
                  <div className="feature_item">
                    <div className="jobs">
                      <div className="nav1">
                        <div className="avatar">
                          <img src={job.avatar} alt="" />
                        </div>
                      </div>
                      <div className="nav2">
                        <div className="job_item1">
                          <h5
                            className="text-space"
                            style={{ fontSize: "17px", width: "400px" }}
                          >
                            {job.name}
                          </h5>
                          <div
                            className="text-space"
                            style={{ fontSize: "13px" }}
                          >
                            {job.company}
                          </div>
                        </div>
                        <div className="nav3">
                          <div className="job_item2">8 triệu</div>
                          <div className="job_item3">ha noi</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {listJobs ? (
          <div className="d-flex justify-content-center">
            <PaginationPage
              pageNumbers={pageNumbers}
              goToPage={goToPage}
              activePage={activePage}
            />
          </div>
          ) : (
            <></>
          )} 
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
