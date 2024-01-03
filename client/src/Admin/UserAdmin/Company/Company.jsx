import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/common/CustomButton";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import Modal from "react-bootstrap/Modal";
import PaginationPage from "../../../components/common/PaginationPage";
import { Select, Space } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { axiosConfig } from "../../../axios/config";
import { useSearchParams } from "react-router-dom";

function Company() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortNameValue, setSortNameValue] = useState("");
  const [sortStatus, setSortStatus] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("name_like");
  const querySortByName = searchParams.get("sort_name");
  const querySortStatus = searchParams.get("status");

  const [companies, setCompanies] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Lý danh sách company
  const getCompanies = async (pageIndex, pageNumber) => {
    try {
      const response = await axiosConfig.get(
        `/users?_page=${pageIndex}&_limit=${pageNumber}&role=Company`
      );
      setCompanies(response.data);
      setTotal(response.headers["x-total-count"]);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Lý job theo querySearch khi search sort sẽ render
  const getListCompanysByQuerySearch = async (pageIndex, pageNumber) => {
    axiosConfig
      .get(
        `/users?_page=${pageIndex}&_limit=${pageNumber}&&name_like=${querySearch}&&_sort=name&_order=${querySortByName}&&status=${querySortStatus}&role=Company`
      )
      .then((res) => {
        setCompanies(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Tim kiếm
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchValue === prevSearchValue) {
      return;
    }
    setSearchParams({
      name_like: searchValue,
      sort_name: sortNameValue,
      status: sortStatus,
    });
    await axiosConfig
      .get(`/users?name_like=${querySearch}&role=Company`)
      .then((res) => {
        setCompanies(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
    setPrevSearchValue(searchValue);
  };

  // Sort theo name
  const handleSortByName = async (value) => {
    setSortNameValue(value);
    setSearchParams({
      name_like: searchValue,
      sort_name: value,
      status: sortStatus,
    });
    await axiosConfig
      .get(`/users?_sort=name&_order=${value}&role=Company`)
      .then((res) => {
        setCompanies(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Sort theo trạng thái
  const handleSortByStatus = async (value) => {
    setSortStatus(value);
    setSearchParams({
      name_like: searchValue,
      status: value,
    });
    await axiosConfig
      .get(`/users?status=${value}&role=Company`)
      .then((res) => {
        setCompanies(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLockCompany = async (id) => {
    console.log(id);
    try {
      await axiosConfig.patch(`/users/${id}`, {
        locked: true,
      });
      const updateCompany = companies.map((companies) =>
        companies.id === id ? { ...companies, locked: true } : companies
      );
      setCompanies(updateCompany);
      console.log("Company locked successfully");
    } catch (error) {
      console.log("Failed to lock user", error);
    }
  };
  const handleUnLockCompany = async (id) => {
    console.log(id);
    try {
      await axiosConfig.patch(`/users/${id}`, {
        locked: false,
      });
      const updateCompany = companies.map((companies) =>
        companies.id === id ? { ...companies, locked: false } : companies
      );
      setCompanies(updateCompany);
      console.log("companies unlocked successfully");
    } catch (error) {
      console.log("Failed to unlock companies", error);
    }
  };
  useEffect(() => {
    if (querySearch) {
      setSearchValue(querySearch);
      getListCompanysByQuerySearch(1, 4);
    } else if (querySortByName) {
      setSortNameValue(querySortByName);
      getListCompanysByQuerySearch(1, 4);
    } else if (querySortStatus) {
      setSortStatus(querySortStatus);
      getListCompanysByQuerySearch(1, 4);
    } else {
      getCompanies(1, 4);
    }
  }, [searchParams, querySearch, querySortByName, querySortStatus]);

  // Thay đổi trạng thái duyệt
  const handleStatusChange = async (selectedValue, id) => {
    console.log(id);
    console.log(selectedValue);
    try {
      await axiosConfig.patch(`/users/${id}`, {
        status: selectedValue,
      });

      const updatedCompanies = companies.map((comp) =>
        comp.id === id ? { ...comp, status: selectedValue } : comp
      );
      setCompanies(updatedCompanies);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Pagination
  let pageNumber = 4;
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    getCompanies(page, pageNumber);
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="container">
      <div className="mt-3" style={{ width: "97%" }}>
        <div className="d-flex justify-content-center align-items-center">
          <h2>Quản lý Công ty</h2>
        </div>
        <div className="container d-flex justify-content-flex-start align-items-center gap-3">
          <div>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container fluid>
                <Navbar.Collapse id="navbarScroll">
                  <Form onSubmit={handleSearchSubmit} className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Nhập vào để tìm kiếm"
                      className="me-2"
                      aria-label="Search"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <Button variant="outline-info" type="submit">
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
                defaultValue="Tên"
                style={{
                  width: 80,
                }}
                onChange={handleSortByName}
                options={[
                  {
                    value: "",
                    label: "Tên",
                  },
                  {
                    value: "asc",
                    label: "A - Z",
                  },
                  {
                    value: "desc",
                    label: "Z - A",
                  },
                ]}
              />
            </Space>
          </div>
          <div>
            <Space wrap>
              <Select
                defaultValue="Trạng thái"
                style={{
                  width: 140,
                }}
                onChange={handleSortByStatus}
                options={[
                  {
                    value: "",
                    label: "Trạng thái",
                  },
                  {
                    value: "Đã xét duyệt",
                    label: "Đã xét duyệt",
                  },
                  {
                    value: "Chờ xét duyệt",
                    label: "Chờ xét duyệt",
                  },
                ]}
              />
            </Space>
          </div>
        </div>
        <table
          className="table table-striped table-hover"
          style={{ marginTop: "20px", width: "100%" }}
        >
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">ID</th>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
              <th
                scope="col"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((company, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{company.id}</td>
                <td
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {company.name}
                </td>
                <td
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {company.email}
                </td>

                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    height: "70px",
                  }}
                >
                  <select
                    className="form-select"
                    style={{ width: "150px", marginRight: "10px" }}
                    value={company.status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, company.id)
                    }
                  >
                    {company.status === "Chờ xét duyệt" ? (
                      <option value="Chờ xét duyệt">Chờ xét duyệt</option>
                    ) : (
                      <option disabled value="Chờ xét duyệt">
                        Chờ xét duyệt
                      </option>
                    )}

                    {company.status === "Đã xét duyệt" ? (
                      <option value="Đã xét duyệt">Đã xét duyệt</option>
                    ) : (
                      <option
                        disabled={company.status !== "Chờ xét duyệt"}
                        value="Đã xét duyệt"
                      >
                        Đã xét duyệt
                      </option>
                    )}
                  </select>
                  {company.locked === false ? (
                    <CustomButton
                      label={"Lock"}
                      type={"button"}
                      className={"btn btn-danger"}
                      onClick={() => handleLockCompany(company.id)}
                    />
                  ) : (
                    <CustomButton
                      label={"UnLock"}
                      type={"button"}
                      className={"btn btn-success"}
                      onClick={() => handleUnLockCompany(company.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex ">
        <PaginationPage pageNumbers={pageNumbers} goToPage={goToPage} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart1">
            <div className="cart-combo1">
              <table className="table">
                <thead>
                  <tr className="table-light">
                    <th scope="col">Tên</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Học vấn</th>
                    <th scope="col">Chứng chỉ</th>
                    <th scope="col">Địa chỉ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <td>{viewUser.name}</td>
                    <td>{viewUser.phone}</td>
                    <td>{viewUser.education}</td>
                    <td>{viewUser.certification}</td>
                    <td>{viewUser.address}</td> */}
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

export default Company;
