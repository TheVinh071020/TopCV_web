import React from 'react'

function DetailBodyRight({job}) {
  return (
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
  );
}

export default DetailBodyRight