import React from "react";
import Form from "react-bootstrap/Form";
import CustomButton from "../../components/common/CustomButton";
import { Link, useLocation } from "react-router-dom";

function JobDetail() {
  const location = useLocation();
  const strUrl = location.pathname;
  const arrUrl = strUrl.split("/");

  let status = "";

  if (arrUrl.includes("create")) {
    console.log("create");
    status = "create";
  } else if (arrUrl.includes("edit")) {
    console.log("edit");
    status = "edit";
  }
  console.log(status);

  return (
    <div className="container">
      <div className="col-md-8 offset-md-1">
        <Form type="submit">
          <h1 className="titleee mb-4">
            {String(status) === "create" ? "Tạo công việc" : "Sửa  công việc"}
          </h1>
          <Form.Group
            className="d-flex justify-content-between mb-3 w-100"
            controlId="formGroupPassword"
          >
            <Form.Group className="col-md-5" controlId="formGroupEmail">
              <Form.Control
                // onChange={handleInputChange}
                // value={formInput.name}
                name="name"
                type="text"
                placeholder="Tên CV"
              />
              {/* {formErrors.name && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.name}
                </span>
              )} */}
            </Form.Group>
            <Form.Group className="col-md-6" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                // value={formInput.company}
                name="company"
                type="text"
                disabled
                placeholder="Công ty"
              />
            </Form.Group>
          </Form.Group>
          <Form.Group
            className="d-flex justify-content-between mb-3 w-100"
            controlId="formGroupPassword"
          >
            <Form.Group className="col-md-5 " controlId="formGroupPassword">
              <Form.Select
                // onChange={handleInputChange}
                // value={formInput.level}
                name="level"
                aria-label="Default select example"
              >
                <option value="">Chức vụ</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Trưởng nhóm">Trưởng nhóm</option>
                <option value="Quản lý">Quản lý</option>
                <option value="Trưởng bộ phận">Trưởng bộ phận</option>
              </Form.Select>
              {/* {formErrors.level && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.level}
                </span>
              )} */}
            </Form.Group>
            <Form.Group className="col-md-6 " controlId="formGroupPassword">
              <Form.Select
                // onChange={handleInputChange}
                // value={formInput.experience}
                name="experience"
                aria-label="Default select example"
              >
                <option value="">Kinh nghiệm</option>
                <option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</option>
                <option value="6 tháng - 1 năm">6 tháng - 1 năm</option>
                <option value="1 - 2 năm">1 - 2 năm</option>
                <option value="trên 2 năm">trên 2 năm</option>
              </Form.Select>
              {/* {formErrors.experience && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.experience}
                </span>
              )} */}
            </Form.Group>
          </Form.Group>
          <Form.Group
            className="d-flex justify-content-between mb-3 w-100"
            controlId="formGroupPassword"
          >
            <Form.Group className="col-md-5 " controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                // value={formInput.salary}
                name="salary"
                type="text"
                placeholder="Lương"
              />
              {/* {formErrors.salary && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.salary}
                </span>
              )} */}
            </Form.Group>
            <Form.Group className="col-md-6 " controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                // value={formInput.scale}
                name="scale"
                type="text"
                placeholder="Số lượng tuyển"
              />
              {/* {formErrors.scale && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.scale}
                </span>
              )} */}
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              //   onChange={handleInputChange}
              //   value={formInput.description}
              name="description"
              type="textarea"
              placeholder="Mô tả công việc "
              as="textarea"
              rows={1}
            />
            {/* {formErrors.description && (
              <span className="error" style={{ color: "red" }}>
                {formErrors.description}
              </span>
            )} */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              //   onChange={handleInputChange}
              //   value={formInput.requirement}
              name="requirement"
              type="textarea"
              placeholder="Yêu cầu ứng viên "
              as="textarea"
              rows={1}
            />
            {/* {formErrors.requirement && (
              <span className="error" style={{ color: "red" }}>
                {formErrors.requirement}
              </span>
            )} */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              //   onChange={handleInputChange}
              //   value={formInput.benefit}
              name="benefit"
              type="textarea"
              placeholder="Quyền lợi"
              as="textarea"
              rows={1}
            />
            {/* {formErrors.benefit && (
              <span className="error" style={{ color: "red" }}>
                {formErrors.benefit}
              </span>
            )} */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              //   onChange={handleInputChange}
              //   value={formInput.time}
              name="time"
              type="text"
              placeholder="Thời gian làm việc"
            />
            {/* {formErrors.time && (
              <span className="error">{formErrors.time}</span>
            )} */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              //   onChange={handleInputChange}
              //   value={formInput.location}
              name="location"
              type="text"
              placeholder="Địa chỉ"
            />
            {/* {formErrors.location && (
              <span className="error">{formErrors.location}</span>
            )} */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              //   onChange={handleInputChange}
              //   value={formInput.address}
              name="address"
              type="text"
              placeholder="Thành phố"
            />
            {/* {formErrors.address && (
              <span className="error">{formErrors.address}</span>
            )} */}
          </Form.Group>
          <div className="d-flex gap-3">
            <CustomButton
              className={"btn btn-success"}
              label={String(status) === "create" ? "Thêm" : "Sửa"}
              type={"submit"}
              //   disabled={!isFormEdited}
              //   onClick={handleAddProduct}
            />
            <Link to={"/admin-company/product"}>
              <CustomButton className={"btn btn-danger"} label={"Close"} />
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default JobDetail;
