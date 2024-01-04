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
import { applyMiddleware } from "redux";
import Swal from "sweetalert2";

function Applications() {
  // View application
  const [view, setView] = useState(false);
  const handleCloseView = () => setView(false);
  const handleShowView = () => setView(true);

  const companyLocal = JSON.parse(localStorage.getItem("user"));
  const companyName = companyLocal.name;

  const [company, setCompany] = useState("");

  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);

  const [viewApplication, setviewApplication] = useState(null);

  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [valueAddress, setValueAddress] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("email_like");
  const queryAddress = searchParams.get("address");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const getListApplications = async (pageNumber, pageIndex) => {
    await axiosConfig
      .get(
        `/applications?_page=${pageNumber}&_limit=${pageIndex}&&company=${companyName}`
      )
      .then((res) => {
        setApplications(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });

    await axiosConfig
      .get(`/companies?email_like=${companyName}`)
      .then((res) => {
        setCompany(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListApplicationsByquery = async (pageNumber, pageIndex) => {
    console.log(companyName, querySearch, queryAddress);
    await axiosConfig
      .get(
        `/applications?_page=${pageNumber}&_limit=${pageIndex}company_like=${companyName}&&userEmail_like=${querySearch}&&userName_like=${searchValue}&&address_like=${queryAddress}`
      )
      .then((res) => {
        setApplications(res.data);
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
      email_like: searchValue,
      address: valueAddress,
    });
    await axiosConfig
      .get(
        `/applications?company_like=${companyName}&&userEmail_like=${searchValue}&&userName_like=${searchValue}`
      )
      .then((res) => {
        setApplications(res.data);
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
      email_like: searchValue,
      address: value,
    });
    await axiosConfig
      .get(`/applications?company_like=${companyName}&&address_like=${value}`)
      .then((res) => {
        setApplications(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (querySearch) {
      setSearchValue(querySearch);
      getListApplicationsByquery(1, 4);
    } else if (queryAddress) {
      setValueAddress(queryAddress);
      getListApplicationsByquery(1, 4);
    } else {
      getListApplications(1, 4);
    }
  }, [querySearch, queryAddress, searchParams]);

  // view application
  const handleViewApp = async (id) => {
    handleShowView(true);
    axiosConfig
      .get(`/applications/${id}`)
      .then((res) => {
        setviewApplication(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete application
  // const handleDeleteApp = async (id) => {
  //   const res = await axiosConfig.delete(`/applications/${id}`);
  //   getListApplications(1, 4);
  //   toast.success("Hủy đơn ứng tuyển thành công 👌");
  // };
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn hủy?",
      icon: "warning ",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  };

  const handleStatusChange = async (selectedValue, id) => {
    try {
      await axiosConfig.patch(`/applications/${id}`, {
        status: selectedValue,
      });

      const updateStatus = applications.map((app) =>
        app.id === id ? { ...app, status: selectedValue } : app
      );
      getListApplications(updateStatus);
    } catch (lỗi) {
      console.error("Lỗi khi cập nhật trạng thái:", lỗi);
    }
  };

  const [activePage, setActivePage] = useState(1);
  // Pagination
  let pageNumber = 4;
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    setActivePage(page);
    getListApplications(page, pageNumber);
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="container">
      <div className="mt-3" style={{ width: "97%" }}>
        <div className="d-flex justify-content-center align-items-center">
          <h2>Quản lý các đơn ứng tuyển</h2>
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
        </div>

        {!applications.length > 0 ? (
          <div className="d-flex justify-content-center">
            <h3>Bạn chưa có đơn ứng tuyển nào</h3>
          </div>
        ) : (
          <table
            className="table table-striped table-hover"
            style={{ marginTop: "20px", width: "100%" }}
          >
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Công ty</th>
                <th scope="col">Tên CV</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Thành phố</th>
                <th scope="col">Liên hệ</th>
                <th scope="col" className="d-flex justify-content-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((app, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td
                    style={{
                      maxWidth: "125px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {app?.userName}
                  </td>
                  <td
                    style={{
                      maxWidth: "170px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {app?.userEmail}
                  </td>
                  <td
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {app?.company}
                  </td>
                  <td
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {app?.jobName}
                  </td>
                  <td
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {app?.location}
                  </td>
                  <td>{app?.address}</td>
                  <td>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${viewApplication?.userEmail}`}
                      target="_blank"
                    >
                      Liên hệ
                    </a>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "auto",
                      height: "70px",
                    }}
                  >
                    <td>
                      <select
                        className="form-select"
                        style={{ width: "150px", marginRight: "10px" }}
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(e.target.value, app.id)
                        }
                      >
                        {app.status === "Chờ liên hệ" ? (
                          <>
                            <option disabled value="Chờ liên hệ">
                              Chờ liên hệ
                            </option>
                            <option value="Đã liên hệ">Đã liên hệ</option>
                          </>
                        ) : (
                          <>
                            <option disabled value="Chờ liên hệ">
                              Chờ liên hệ
                            </option>
                            <option value="Đã liên hệ">Đã liên hệ</option>
                          </>
                        )}
                      </select>
                    </td>
                    <td
                      className="d-flex justify-content-center align-items-center"
                      style={{ cursor: "pointer", marginRight: "15px" }}
                      onClick={() => handleViewApp(app.id)}
                    >
                      <EyeOutlined />
                    </td>
                    {/* <CustomButton
                      label={"Hủy"}
                      type={"button"}
                      className={"btn btn-danger"}
                      onClick={() => confirmDelete(app.id)}
                    /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!applications.length > 0 ? (
          <></>
        ) : (
          <div className="d-flex ">
            <PaginationPage
              pageNumbers={pageNumbers}
              goToPage={goToPage}
              activePage={activePage}
            />
          </div>
        )}
      </div>
      {/* View job */}
      <Modal
        size="xl "
        aria-labelledby="example-modal-sizes-title-xl   "
        animation={false}
        show={view}
        onHide={handleCloseView}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin ứng viên</Modal.Title>
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
                      Email
                    </th>
                    <th scope="col" style={{ width: "180px" }}>
                      SĐT
                    </th>
                    <th scope="col" style={{ width: "180px" }}>
                      Học vấn
                    </th>
                    <th scope="col" style={{ width: "120px" }}>
                      Chứng chỉ
                    </th>
                    <th scope="col" style={{ width: "180px" }}>
                      Địa chỉ
                    </th>
                    {/* <th scope="col" style={{ width: "180px" }}>
                      Liên hệ
                    </th> */}
                    <th scope="col" style={{ width: "160px" }}>
                      Avatar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{viewApplication?.userName}</td>
                    <td>{viewApplication?.userEmail}</td>
                    <td>{viewApplication?.userPhone}</td>
                    <td>{viewApplication?.education}</td>
                    <td>{viewApplication?.certification}</td>
                    <td>{viewApplication?.userAddress}</td>
                    {/* <td></td> */}

                    <td>
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "20px",
                        }}
                        src={viewApplication?.userAvatar}
                        alt=""
                      />
                    </td>
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

export default Applications;
