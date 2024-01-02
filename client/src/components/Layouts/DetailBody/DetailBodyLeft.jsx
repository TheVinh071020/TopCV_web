import React, { useEffect, useState } from "react";
import { Modal, Input, Button } from "antd";
import { toast } from "react-toastify";
import { axiosConfig } from "../../../axios/config";

const DetailBodyLeft = ({
  job,
  userId,
  setOpen,
  isUserRole,
  isOrderCreated,
  hasApplied,
}) => {
  const jobId = job?.id;
  const [hasAppliedForJob, setHasAppliedForJob] = useState(false);

  const getApplicationsByJobId = async (jobId, userId) => {
    try {
      const response = await axiosConfig.get(`/applications?jobId=${jobId}`);
      const applications = response.data;
      const hasApplied = applications.some(
        (application) => application.userId === userId
      );
      setHasAppliedForJob(hasApplied);
    } catch (error) {
      console.error("Error fetching applications by jobId: ", error);
      setHasAppliedForJob(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      getApplicationsByJobId(jobId, userId);
    }
  }, [jobId, userId]);

  const handleApply = async () => {
    if (hasApplied) {
      toast.warn("Bạn đã ứng tuyển cho công việc này rồi");
      return;
    }
    if (isOrderCreated) {
      alert("Bạn đã tạo đơn hàng");
      return;
    }
    if (hasAppliedForJob) {
      toast.warn("Bạn đã ứng tuyển cho công việc này rồi");
      return;
    }
    setOpen(true);
  };

  return (
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
              <div className="value">{job?.address}</div>
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
            {isUserRole === true ? (
              <Button
                className="btn-apply"
                variant="outline-success"
                type="primary"
                onClick={handleApply}
              >
                <i
                  style={{ marginRight: "15px" }}
                  class="fa-regular fa-paper-plane"
                ></i>
                Ứng tuyển ngay
              </Button>
            ) : (
              <Button
                className="btn-apply"
                variant="outline-success"
                type="primary"
                onClick={() => setOpen(true)}
                hidden
              >
                <i
                  style={{ marginRight: "15px" }}
                  class="fa-regular fa-paper-plane"
                ></i>
                Ứng tuyển ngay
              </Button>
            )}
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
                  <li>{job?.description}</li>
                </ul>
              </div>
            </div>
            <div className="job-description__item">
              <h3>Yêu cầu ứng viên</h3>
              <div className="job-description__item--content">
                <ul>
                  <li>{job?.requirement}</li>
                </ul>
              </div>
            </div>

            <div className="job-description__item">
              <h3>Quyền lợi</h3>
              <div className="job-description__item--content">
                <ul>
                  <li>{job?.benefit}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBodyLeft;
