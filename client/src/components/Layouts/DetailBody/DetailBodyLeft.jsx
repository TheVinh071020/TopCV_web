import React from "react";
import { Modal, Input, Button } from "antd";

function DetailBodyLeft({ job, setOpen, isUserRole, isCompanyRole }) {
  console.log(job);
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
                onClick={() => setOpen(true)}
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
                disabled
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
}

export default DetailBodyLeft;
