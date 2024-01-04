import React, { useEffect, useState } from "react";
import Header from "../../components/Layouts/Headers/Header";
import Footer from "../../components/Layouts/Footer/Footer";
import { Select, Space } from "antd";
import "./Recruitment.css";
import { Helmet } from "react-helmet";
import CustomButton from "../../components/common/CustomButton";
import { toast } from "react-toastify";
import { axiosConfig } from "../../axios/config";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";

function Recruitment() {
  const userCurrent = JSON.parse(localStorage.getItem("user"));
  const userName = userCurrent.name;

  const [searchParams, setSearchParams] = useSearchParams();
  const queryStatus = searchParams.get("status");

  const [valueStatus, setValueStatus] = useState("");

  const [applicationInfo, setApplicationInfo] = useState([] || null);

  // Lấy application theo user
  const getUserByApplication = async (status) => {
    const response = await axiosConfig.get(
      `/applications?userName=${userName}`
    );
    const userApplications = response.data;
    setApplicationInfo(userApplications);
  };

  // Lấy application theo lọc

  const getAppByFilter = async () => {
    const response = await axiosConfig.get(
      `/applications?userName_like=${userName}&&status_like=${queryStatus}`
    );
    const userApplications = response.data;
    setApplicationInfo(userApplications);
  };

  const filterByStatus = async (value) => {
    setValueStatus(value);
    setSearchParams({
      status: value,
    });
    await axiosConfig
      .get(`/applications?userName_like=${userName}&&status_like=${value}`)
      .then((res) => {
        console.log(res.data);
        setApplicationInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Xóa application
  const deleteApplication = async (id) => {
    const response = await axiosConfig.delete(`/applications/${id}`);
    getUserByApplication();
    toast.success("Đã xóa ứng tuyển thành công");
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn hủy?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApplication(id);
      }
    });
  };

  useEffect(() => {
    if (queryStatus) {
      setValueStatus(queryStatus);
      getAppByFilter();
    } else {
      getUserByApplication();
    }
  }, [searchParams, queryStatus]);

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
            <div className="box-select" style={{ display: "flex" }}>
              <Space wrap>
                <Select
                  defaultValue="Lọc trạng thái:"
                  style={{
                    width: 170,
                  }}
                  onChange={filterByStatus}
                  options={[
                    {
                      value: "",
                      label: "Trạng thái",
                    },
                    {
                      value: "Chờ liên hệ",
                      label: "Chờ liên hệ",
                    },
                    {
                      value: "Đã liên hệ",
                      label: "Đã liên hệ",
                    },
                  ]}
                />{" "}
              </Space>
            </div>
          </div>
          {applicationInfo?.length === 0 ? (
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
            applicationInfo?.map((item, i) => (
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
                      <div className="titles">
                        <div className="titless" width={{ width: "250px" }}>
                          Chức vụ : {item.level}
                        </div>
                      </div>
                      <div className="salary">
                        <CustomButton
                          onClick={() => confirmDelete(item.id)}
                          label={"Hủy"}
                          className={"btn btn-info"}
                          style={{ marginLeft: "60%" }}
                        />
                      </div>
                    </div>
                    <div className="info-detail-title">
                      <div className="titless">
                        Thời gian ứng tuyển :
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="info-detail-title">
                      <div className="titless">Trạng thái : {item.status}</div>
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
