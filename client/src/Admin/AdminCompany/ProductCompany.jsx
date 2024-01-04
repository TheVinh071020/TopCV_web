import React, { useEffect, useState } from "react";
import CustomButton from "../../components/common/CustomButton";
import { axiosConfig } from "../../axios/config";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import Modal from "react-bootstrap/Modal";
import PaginationPage from "../../components/common/PaginationPage";
import { Select, Space } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import JobDetail from "./JobDetail";

function ProductCompany() {
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

  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("name_like");
  const queryAddress = searchParams.get("address");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const getListProducts = async (pageNumber, pageIndex) => {
    // Lấy companyId theo cty
    await axiosConfig
      .get(`/companies?name_like=${companyName}`)
      .then((res) => {
        setCompany(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    // Lấy jobs theo tên cty
    await axiosConfig
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

  const handleAddJobs = () => {
    navigate("/admin-company/create");
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
    // Lấy companyId theo cty
    await axiosConfig
      .get(`/companies?name_like=${companyName}`)
      .then((res) => {
        setCompany(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    await axiosConfig
      .get(
        `/jobs?_page=${pageIndex}&_limit=${pageNumber}&company_like=${companyName}&&name_like=${querySearch}&&address_like=${queryAddress}`
      )
      .then((res) => {
        setProducts(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchValue === prevSearchValue) {
      return;
    }
    setSearchParams({
      name_like: searchValue,
      address: valueAddress,
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

  useEffect(() => {
    if (querySearch) {
      setSearchValue(querySearch);
      getListJobByQuerySearch(1, 4);
    } else if (queryAddress) {
      setValueAddress(queryAddress);
      getListJobByQuerySearch(1, 4);
    } else {
      getListProducts(1, 4);
    }
  }, [searchParams, querySearch, queryAddress]);

  // Delete job
  const handleDeleteProduct = async (id) => {
    const res = await axiosConfig.delete(`/jobs/${id}`);
    getListProducts(1, 4);
    toast.success("Xóa công việc thành công 👌");
  };
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(id);
      }
    });
  };

  const [activePage, setActivePage] = useState(1);
  // Pagination
  let pageNumber = 4;
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    setActivePage(page);
    getListProducts(page, pageNumber);
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="container">
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
                      variant="outline-info"
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
                    label: "Tất cả",
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
          {/* <div>
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
                    label: "Tất cả",
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
          </div> */}
        </div>
        <div className="container mt-3">
          {!company ? (
            <CustomButton
              label={"Thêm công việc"}
              type={"button"}
              className={"btn btn-info"}
              onClick={() => navigate("/admin-company/create")}
              disabled={true}
            />
          ) : (
            <CustomButton
              label={"Thêm công việc"}
              type={"button"}
              className={"btn btn-info"}
              onClick={handleAddJobs}
            />
            // <JobDetail jobDetailProp={jobDetailProp} />
          )}
        </div>
        {!company ? (
          <div className="d-flex justify-content-center">
            <h3>Bạn chưa tạo công ty</h3>
          </div>
        ) : (
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
                  <td
                    style={{
                      maxWidth: "170px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.company}
                  </td>
                  <td
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </td>
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
                      onClick={() => confirmDelete(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {company ? (
        <div className="d-flex ">
          <PaginationPage
            pageNumbers={pageNumbers}
            goToPage={goToPage}
            activePage={activePage}
          />
        </div>
      ) : (
        <></>
      )}

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
