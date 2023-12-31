import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import CustomButton from "../../components/common/CustomButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosConfig } from "../../axios/config";
import { toast } from "react-toastify";

function EditJobCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const avtCompany = localStorage.getItem("avatar");

  const [formInput, setFormInput] = useState({
    name: "",
    companyId: "",
    company: "",
    level: "",
    experience: "",
    salary: "",
    scale: "",
    time: "",
    description: "",
    requirement: "",
    benefit: "",
    address: "",
    location: "",
    avatar: "",
  });

  const [isFormEdited, setIsFormEdited] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
    setIsFormEdited(true);
  };

  const fetchProduct = () => {
    axiosConfig
      .get(`/jobs/${id}`)
      .then((res) => {
        const jobData = res.data;
        setFormInput({
          name: jobData.name,
          companyId: jobData.id,
          company: jobData.company,
          level: jobData.level,
          experience: jobData.experience,
          salary: jobData.salary,
          scale: jobData.scale,
          time: jobData.time,
          description: jobData.description,
          requirement: jobData.requirement,
          benefit: jobData.benefit,
          location: jobData.location,
          address: jobData.address,
          avatar: avtCompany,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(formInput);
  const handleEditJob = (e) => {
    e.preventDefault();
    axiosConfig
      .patch(`/jobs/${id}`, formInput)
      .then((res) => {
        navigate("/admin-company/product");
        toast.success("Sửa công việc thành công");
      })
      .catch((err) => {
        console.error("Lỗi khi chỉnh sửa công việc:", err);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container d-flex justify-content-space-between ">
      <Link to={"/admin-company/product"}>
        <CustomButton className={"btn btn-danger mt-3"} label={"Close"} />
      </Link>
      <div className="col-md-8 offset-md-1">
        <Form type="submit">
          <h1 className="titleee mb-4">Sửa công việc</h1>
          <Form.Group
            className="d-flex justify-content-between mb-3 w-100"
            controlId="formGroupPassword"
          >
            <Form.Group className="col-md-5" controlId="formGroupEmail">
              <Form.Control
                value={formInput.name}
                onChange={handleInputChange}
                name="name"
                type="text"
                placeholder="Tên CV"
              />
            </Form.Group>
            <Form.Group className="col-md-6" controlId="formGroupPassword">
              <Form.Control
                value={formInput.company}
                onChange={handleInputChange}
                name="company"
                type="text"
                placeholder="Công ty"
                disabled
              />
            </Form.Group>
          </Form.Group>
          <Form.Group
            className="d-flex justify-content-between mb-3 w-100"
            controlId="formGroupPassword"
          >
            <Form.Group className="col-md-5 " controlId="formGroupPassword">
              <Form.Select
                onChange={handleInputChange}
                value={formInput.level}
                name="level"
                aria-label="Default select example"
              >
                <option value="">Chức vụ</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Trưởng nhóm">Trưởng nhóm</option>
                <option value="Quản lý">Quản lý</option>
                <option value="Trưởng bộ phận">Trưởng bộ phận</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-6 " controlId="formGroupPassword">
              <Form.Select
                onChange={handleInputChange}
                value={formInput.experience}
                name="experience"
                aria-label="Default select example"
              >
                <option value="">Kinh nghiệm</option>
                <option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</option>
                <option value="6 tháng - 1 năm">6 tháng - 1 năm</option>
                <option value="1 - 2 năm">1 - 2 năm</option>
                <option value="trên 2 năm">trên 2 năm</option>
              </Form.Select>
            </Form.Group>
          </Form.Group>
          <Form.Group
            className="d-flex justify-content-between mb-3 w-100"
            controlId="formGroupPassword"
          >
            <Form.Group className="col-md-5 " controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.salary}
                name="salary"
                type="text"
                placeholder="Lương"
              />
            </Form.Group>
            <Form.Group className="col-md-6 " controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.scale}
                name="scale"
                type="text"
                placeholder="Số lượng tuyển"
              />
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.description}
              name="description"
              type="textarea"
              placeholder="Mô tả công việc "
              as="textarea"
              rows={2}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.requirement}
              name="requirement"
              type="textarea"
              placeholder="Yêu cầu ứng viên "
              as="textarea"
              rows={2}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.benefit}
              name="benefit"
              type="textarea"
              placeholder="Quyền lợi"
              as="textarea"
              rows={2}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.time}
              name="time"
              type="text"
              placeholder="Thời gian làm việc"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.location}
              name="location"
              type="text"
              placeholder="Địa chỉ"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.address}
              name="address"
              type="text"
              placeholder="Thành phố"
            />
          </Form.Group>
          <div className="d-flex gap-3">
            <CustomButton
              className={"btn btn-success"}
              label={"Submit"}
              type={"submit"}
              disabled={!isFormEdited}
              onClick={handleEditJob}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditJobCompany;
