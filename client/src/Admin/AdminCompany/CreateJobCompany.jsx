import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import CustomButton from "../../components/common/CustomButton";
import { Link, Router, useNavigate } from "react-router-dom";
import { axiosConfig } from "../../axios/config";
import { toast } from "react-toastify";

function CreateJobCompany() {
  const companyLocal = JSON.parse(localStorage.getItem("user"));
  const companyName = companyLocal.name;

  const navigate = useNavigate();

  const getListProducts = (pageNumber, pageIndex) => {
    // Lấy companyId theo cty
    axiosConfig
      .get(`/companies?name_like=${companyName}`)
      .then((res) => {
        const fetchedCompany = res.data[0];
        setCompany(fetchedCompany);
        setFormInput({
          ...formInput,
          companyId: fetchedCompany.id,
          company: fetchedCompany.name,
          avatar: fetchedCompany.avatar,
          // address: fetchedCompany.address,
          // location: fetchedCompany.location,
          time: fetchedCompany.time,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [company, setCompany] = useState("");

  const [formInput, setFormInput] = useState({
    name: "",
    companyId: company?.id,
    company: company?.name,
    level: "",
    experience: "",
    salary: "",
    scale: "",
    time: company?.time,
    description: "",
    requirement: "",
    benefit: "",
    address: company?.address,
    location: company?.location,
    avatar: company?.avatar,
    status: "Chờ xét duyệt",
  });

  //validate
  const [formErrors, setFormErrors] = useState({
    name: "",
    level: "",
    experience: "",
    salary: "",
    scale: "",
    description: "",
    requirement: "",
    benefit: "",
    time: "",
    location: "",
    address: "",
  });
  const validateForm = () => {
    const errors = {};

    if (!formInput.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formInput.level.trim()) {
      errors.level = "Level is required";
    }
    if (!formInput.experience.trim()) {
      errors.experience = "Experience is required";
    }
    if (!formInput.salary.trim()) {
      errors.salary = "Salary is required";
    } else if (isNaN(formInput.salary)) {
      errors.salary = "Salary must be a number";
    }
    if (!formInput.scale.trim()) {
      errors.scale = "Scale is required";
    } else if (isNaN(formInput.scale)) {
      errors.scale = "Scale must be a number";
    }
    if (!formInput.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formInput.requirement.trim()) {
      errors.requirement = "Requirement is required";
    }
    if (!formInput.benefit.trim()) {
      errors.benefit = "Benefit is required";
    }
    if (!formInput.time.trim()) {
      errors.time = "Time is required";
    }
    if (!formInput.location.trim()) {
      errors.location = "Location is required";
    }
    if (!formInput.address.trim()) {
      errors.address = "Address is required";
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const [isFormEdited, setIsFormEdited] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
    setIsFormEdited(true);
  };

  // Add job
  const handleAddProduct = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      const payload = {
        name: formInput.name,
        companyId: formInput.companyId,
        company: formInput.company,
        level: formInput.level,
        experience: formInput.experience,
        salary: Number(formInput.salary),
        scale: Number(formInput.scale),
        time: formInput.time,
        description: formInput.description,
        requirement: formInput.requirement,
        benefit: formInput.benefit,
        address: formInput.address,
        location: formInput.location,
        avatar: formInput.avatar,
        status: formInput.status,
      };

      axiosConfig
        .post("/jobs", payload)
        .then((response) => {
          toast.success("Tạo mới công việc thành công 👌");
          navigate("/admin-company/product");
          getListProducts(1, 4);
        })
        .catch((error) => {
          console.error("Lỗi khi thêm công việc:", error);
        });
    } else {
      console.log("Form has errors. Please check the fields.");
    }
  };

  useEffect(() => {
    getListProducts();
  }, []);

  return (
    <div className="container d-flex justify-content-space-between">
      <Link to={"/admin-company/product"}>
        <CustomButton
          className={"btn btn-danger mt-3"}
          label={<i class="fa-solid fa-left-long"></i>}
        />
      </Link>
      <div className="col-md-8 offset-md-1">
        <Form type="submit">
          <h1 className="titleee mb-4">Tạo công việc</h1>
          <Form.Group
            className="d-flex justify-content-between mb-3 w-100"
            controlId="formGroupPassword"
          >
            <Form.Group className="col-md-5" controlId="formGroupEmail">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.name}
                name="name"
                type="text"
                placeholder="Tên CV"
              />
              {formErrors.name && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.name}
                </span>
              )}
            </Form.Group>
            <Form.Group className="col-md-6" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.company}
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
              {formErrors.level && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.level}
                </span>
              )}
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
              {formErrors.experience && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.experience}
                </span>
              )}
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
              {formErrors.salary && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.salary}
                </span>
              )}
            </Form.Group>
            <Form.Group className="col-md-6 " controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.scale}
                name="scale"
                type="text"
                placeholder="Số lượng tuyển"
              />
              {formErrors.scale && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.scale}
                </span>
              )}
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
              rows={1}
            />
            {formErrors.description && (
              <span className="error" style={{ color: "red" }}>
                {formErrors.description}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.requirement}
              name="requirement"
              type="textarea"
              placeholder="Yêu cầu ứng viên "
              as="textarea"
              rows={1}
            />
            {formErrors.requirement && (
              <span className="error" style={{ color: "red" }}>
                {formErrors.requirement}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.benefit}
              name="benefit"
              type="textarea"
              placeholder="Quyền lợi"
              as="textarea"
              rows={1}
            />
            {formErrors.benefit && (
              <span className="error" style={{ color: "red" }}>
                {formErrors.benefit}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.time}
              name="time"
              type="text"
              placeholder="Thời gian làm việc"
            />
            {formErrors.time && (
              <span className="error">{formErrors.time}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleInputChange}
              value={formInput.location}
              name="location"
              type="text"
              placeholder="Địa chỉ"
            />
            {formErrors.location && (
              <span className="error">{formErrors.location}</span>
            )}
          </Form.Group>
          <Form.Group className="col mb-3" controlId="formGroupPassword">
            <Form.Select
              onChange={handleInputChange}
              value={formInput.address}
              name="address"
              aria-label="Default select example"
            >
              <option value="">Thành phố</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            </Form.Select>
            {formErrors.address && (
              <span className="error">{formErrors.address}</span>
            )}
          </Form.Group>

          <div className="d-flex gap-3">
            <CustomButton
              className={"btn btn-success"}
              label={"Thêm công việc"}
              type={"submit"}
              disabled={!isFormEdited}
              onClick={handleAddProduct}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateJobCompany;
