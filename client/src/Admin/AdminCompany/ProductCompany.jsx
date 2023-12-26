import React, { useEffect, useState } from "react";
import CustomButton from "../../components/common/CustomButton";
import { axiosConfig } from "../../axios/config";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import Modal from "react-bootstrap/Modal";
import Pagination from "../../components/common/Pagination";
import { Select, Space } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductCompany() {
  // View Add job
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // View job
  const [view, setView] = useState(false);
  const handleCloseView = () => setView(false);
  const handleShowView = () => setView(true);

  const navigate = useNavigate();

  const companyLocal = JSON.parse(localStorage.getItem("user"));
  const companyName = companyLocal.name;

  const [company, setCompany] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [viewJobs, setViewJobs] = useState(null);

  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const [valueSalary, setValueSalary] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("name_like");
  const queryAddress = searchParams.get("address");
  const querySalary = searchParams.get("salary");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const getListProducts = (pageNumber, pageIndex) => {
    // Lấy idCompany theo cty
    axiosConfig
      .get(`/companies?name_like=${companyName}`)
      .then((res) => {
        const fetchedCompany = res.data[0];
        setCompany(fetchedCompany);
        setFormInput({
          ...formInput,
          idCompany: fetchedCompany.id,
          company: fetchedCompany.name,
          avatar: fetchedCompany.avatar,
          address: fetchedCompany.address,
          location: fetchedCompany.location,
          time: fetchedCompany.time,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // Lấy jobs theo tên cty
    axiosConfig
      .get(
        `/jobs?_page=${pageNumber}&_limit=${pageIndex}&company_like=${companyName}`
      )
      .then((res) => {
        setProducts(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [formInput, setFormInput] = useState({
    name: "",
    idCompany: company.id,
    company: company.name,
    level: "",
    experience: "",
    salary: "",
    scale: "",
    time: company.time,
    description: "",
    requirement: "",
    benefit: "",
    address: company.address,
    location: company.location,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // Add job
  const handleAddProduct = () => {
    // navigate(`/admin-company/add`);

    const isFormValid = validateForm();
    if (isFormValid) {
      const payload = {
        name: formInput.name,
        idCompany: formInput.id,
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
        status: formInput.status,
      };
      axiosConfig
        .post("/jobs", payload)
        .then((response) => {
          console.log("Công việc đã được thêm:", response.data);
          toast.success("Tạo mới công việc thành công 👌");
          handleClose();
          getListProducts();
        })
        .catch((error) => {
          console.error("Lỗi khi thêm công việc:", error);
        });
    } else {
      console.log("Form has errors. Please check the fields.");
    }
  };

  const handleEditProduct = (id) => {
    navigate(`/admin-company/edit/${id}`);
  };

  // View job
  const handleViewUser = (id) => {
    handleShowView(true);
    axiosConfig
      .get(`/jobs/${id}`)
      .then((res) => {
        setViewJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListJobByQuerySearch = async (pageIndex, pageNumber) => {
    await axiosConfig
      .get(
        `/jobs?_page=${pageIndex}&_limit=${pageNumber}&company_like=${companyName}&&name_like=${querySearch}&&address_like=${queryAddress}&&_sort=salary&_order=${querySalary}`
      )
      .then((res) => {
        setProducts(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(querySearch);
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchValue === prevSearchValue) {
      return;
    }
    setSearchParams({
      name_like: searchValue,
      address: valueAddress,
      salary: valueSalary,
    });
    await axiosConfig
      .get(
        `/jobs?name_like=${searchValue}&&address_like=${valueAddress}&company_like=${companyName}`
      )
      .then((res) => {
        setProducts(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
    setPrevSearchValue(searchValue);
  };

  const handleFilterByAddress = async (value) => {
    setValueAddress(value);
    setSearchParams({
      name_like: searchValue,
      address: value,
      salary: valueSalary,
    });
    await axiosConfig
      .get(`/jobs?address_like=${value}&company_like=${companyName}`)
      .then((res) => {
        setProducts(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterBySalary = async (value) => {
    setValueSalary(value);
    setSearchParams({
      salary: value,
      name_like: searchValue,
      address: valueAddress,
    });
    await axiosConfig
      .get(`/jobs?salary=${value}&company_like=${companyName}`)
      .then((res) => {
        setProducts(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClear = () => {
    if (!searchValue && !valueAddress && !valueSalary) {
      return;
    }
    setSearchValue("");
    setValueAddress("");
    setValueSalary("");
    setSearchParams("");
  };

  useEffect(() => {
    if (querySearch) {
      setSearchValue(querySearch);
      getListJobByQuerySearch(1, 4);
    } else if (queryAddress) {
      setValueAddress(queryAddress);
      getListJobByQuerySearch(1, 4);
    } else if (querySalary) {
      setValueSalary(querySalary);
      getListJobByQuerySearch(1, 4);
    } else {
      getListProducts(1, 4);
    }
  }, [searchParams, querySearch, queryAddress]);

  // Delete job
  const handleDeleteProduct = (id) => {
    axiosConfig
      .delete(`/jobs/${id}`)
      .then((res) => {
        console.log(res.data);
        getListProducts(1, 4);
        toast.success("Xóa công việc thành công 👌");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Pagination
  let pageNumber = 4;
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    getListProducts(page, pageNumber);
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="container">
      {/* Add Job */}
      <Modal
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        animation={false}
        show={show}
        onHide={handleClose}
      >
        <Modal.Body>
          <Form>
            <h1 className="titleee">Tạo công việc</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
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
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.company}
                name="company"
                type="text"
                placeholder="Công ty"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
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
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Select
                onChange={handleInputChange}
                value={formInput.experience}
                name="experience"
                type="text"
                placeholder="Kinh nghiệm"
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
            <Form.Group className="mb-3" controlId="formGroupPassword">
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
            <Form.Group className="mb-3" controlId="formGroupPassword">
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

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                onChange={handleInputChange}
                value={formInput.description}
                name="description"
                type="textarea"
                placeholder="Mô tả công việc "
                as="textarea"
                rows={3}
              />
              {formErrors.description && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.description}
                </span>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                onChange={handleInputChange}
                value={formInput.requirement}
                name="requirement"
                type="textarea"
                placeholder="Yêu cầu ứng viên "
                as="textarea"
                rows={3}
              />
              {formErrors.requirement && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.requirement}
                </span>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                onChange={handleInputChange}
                value={formInput.benefit}
                name="benefit"
                type="textarea"
                placeholder="Quyền lợi"
                as="textarea"
                rows={3}
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
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInputChange}
                value={formInput.address}
                name="address"
                type="text"
                placeholder="Thành phố"
              />
              {formErrors.address && (
                <span className="error">{formErrors.address}</span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
          <CustomButton
            className={"btn btn-success"}
            label={"Create"}
            type={"submit"}
            onClick={handleAddProduct}
          />
        </Modal.Footer>
      </Modal>
      <div className="mt-3" style={{ width: "97%" }}>
        <div className="d-flex justify-content-center align-items-center">
          <h2>Quản lý công việc</h2>
        </div>
        <div className="container d-flex justify-content-flex-start align-items-center gap-3">
          <div>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container fluid>
                <Navbar.Collapse id="navbarScroll">
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Nhập vào để tìm kiếm"
                      className="me-2"
                      aria-label="Search"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <Button
                      onClick={handleSearchSubmit}
                      variant="outline-success"
                      type="submit"
                    >
                      Search
                    </Button>
                  </Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
          <div>
            <Space wrap>
              <Select
                defaultValue="Địa chỉ"
                style={{
                  width: 120,
                  marginRight: 20,
                }}
                onChange={handleFilterByAddress}
                options={[
                  {
                    value: "",
                    label: "Địa chỉ",
                  },
                  {
                    value: "Hà Nội",
                    label: "Hà Nội",
                  },
                  {
                    value: "Hồ Chí Minh",
                    label: "Hồ Chí Minh",
                  },
                ]}
              />
            </Space>
          </div>
          <div>
            <Space wrap>
              <Select
                defaultValue="Mức lương"
                style={{
                  width: 120,
                }}
                onChange={handleFilterBySalary}
                options={[
                  {
                    value: "",
                    label: "Mức lương",
                  },
                  {
                    value: "desc",
                    label: "Cao đến thấp",
                  },
                  {
                    value: "asc",
                    label: "Thấp đến cao",
                  },
                ]}
              />
            </Space>
          </div>
          <div>
            <CustomButton
              label={"Clear"}
              type={"button"}
              className={"btn btn-danger"}
              onClick={handleClear}
            />
          </div>
        </div>
        <div className="container mt-3">
          <CustomButton
            label={"Thêm công việc"}
            type={"button"}
            className={"btn btn-success"}
            onClick={handleShow}
            // onClick={handleAddProduct}
          />
        </div>
        <table
          className="table table-striped table-hover"
          style={{ marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">ID</th>
              <th scope="col">Công ty</th>
              <th scope="col">Tên CV</th>
              <th scope="col">Chức vụ</th>
              <th scope="col">Kinh nghiệm</th>
              <th scope="col">Lương</th>
              <th scope="col">Thành phố</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{product.id}</td>
                <td>{product.company}</td>
                <td>{product.name}</td>
                <td>{product.level}</td>
                <td>{product.experience}</td>
                <td>{product.salary}</td>
                <td>{product.address}</td>

                <td className="d-flex gap-3">
                  <td
                    className="d-flex justify-content-center align-items-center"
                    style={{ cursor: "pointer", marginRight: "15px" }}
                    onClick={() => handleViewUser(product.id)}
                  >
                    <EyeOutlined />
                  </td>
                  <CustomButton
                    label={"Sửa"}
                    type={"button"}
                    className={"btn btn-primary"}
                    onClick={() => handleEditProduct(product.id)}
                  />
                  <CustomButton
                    label={"Xóa"}
                    type={"button"}
                    className={"btn btn-danger"}
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex ">
        <Pagination pageNumbers={pageNumbers} goToPage={goToPage} />
      </div>

      {/* Edit job */}
      {/* <Modal
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        animation={false}
        show={edit}
        onHide={handleCloseEdit}
      >
        <Modal.Body>
          <Form>
            <h1 className="titleee">Sửa công việc</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                // onChange={handleInputChange}
                value={name}
                name="name"
                type="text"
                placeholder="Tên CV"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={company}
                name="company"
                type="text"
                placeholder="Công ty"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={level}
                name="level"
                type="text"
                placeholder="Chức vụ"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={experience}
                name="experience"
                type="text"
                placeholder="Kinh nghiệm"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={salary}
                name="salary"
                type="number"
                placeholder="Lương"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={scale}
                name="scale"
                type="number"
                placeholder="Số lượng tuyển"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={description}
                name="description"
                type="textarea"
                placeholder="Mô tả công việc "
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                value={requirement}
                name="requirement"
                type="textarea"
                placeholder="Yêu cầu ứng viên "
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={benefit}
                name="benefit"
                type="textarea"
                placeholder="Quyền lợi"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={time}
                name="time"
                type="text"
                placeholder="Thời gian làm việc"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={location}
                name="location"
                type="text"
                placeholder="Địa chỉ"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={address}
                name="city"
                type="text"
                placeholder="Thành phố"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                // onChange={handleInputChange}
                value={avatar}
                name="avatar"
                type="text"
                placeholder="Avatar"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleCloseEdit}>
            Close
          </button>
          <CustomButton
            className={"btn btn-success"}
            label={"Update job"}
            type={"submit"}
            // onClick={handleAddProduct}
          />
        </Modal.Footer>
      </Modal> */}
      {/* View job */}
      <Modal
        size="xl "
        aria-labelledby="example-modal-sizes-title-xl   "
        animation={false}
        show={view}
        onHide={handleCloseView}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart1">
            <div className="cart-combo1">
              <table className="table">
                <thead>
                  <tr className="table-light">
                    <th scope="col" style={{ width: "145px" }}>
                      Tên
                    </th>
                    <th scope="col" style={{ width: "75px" }}>
                      SL tuyển
                    </th>
                    <th scope="col" style={{ width: "180px" }}>
                      Mô tả
                    </th>
                    <th scope="col" style={{ width: "180px" }}>
                      Yêu cầu
                    </th>
                    <th scope="col" style={{ width: "180px" }}>
                      Quyền lợi
                    </th>
                    <th scope="col" style={{ width: "160px" }}>
                      Thời gian làm việc
                    </th>
                    <th scope="col" style={{ width: "100px" }}>
                      Địa chỉ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{viewJobs?.name}</td>
                    <td>{viewJobs?.scale}</td>
                    <td>{viewJobs?.description}</td>
                    <td>{viewJobs?.requirement}</td>
                    <td>{viewJobs?.benefit}</td>
                    <td>{viewJobs?.time}</td>
                    <td>{viewJobs?.location}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductCompany;
