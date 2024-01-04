import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function DetailItem({ job, i }) {
  return (
    <div key={i} className="col-sm-3 feature_job_item">
      <div className="job">
        <div className="nav1">
          <div className="avatar">
            <img src={job.avatar} alt="" />
          </div>
          <div className="job_item1">
            <h5 style={{ fontSize: "15px" }}>{job.name}</h5>
            <div style={{ fontSize: "13px" }}>{job.company}</div>
          </div>
        </div>
        <div className="nav2">
          <div className="job_item2">{job.salary} triệu</div>
          <div className="job_item3">{job.address}</div>
          <div className="job_item_btn">
            <Link to={`/detail/${job.id}`}>
              <Button variant="outline-info">Chi tiết</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailItem;
