import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/common/CustomButton";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import Modal from "react-bootstrap/Modal";
import Pagination from "../../../components/common/Pagination";
import { Select, Space } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { axiosConfig } from "../../../axios/config";

function Company() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [company, setCompany] = useState([]);
  const [viewCompany, setViewCompany] = useState({});
  const [total, setTotal] = useState(0);
  const [isStatusDisabled, setIsStatusDisabled] = useState(false);

  // Lý danh sách company
  const getCompany = async (pageIndex, pageNumber) => {
    await axiosConfig
      .get(`/users?_page=${pageIndex}&_limit=${pageNumber}&&role=Company  `)
      .then((res) => {
        setCompany(res.data);
        setTotal(res.headers["x-total-count"]);
      });
  };

  useEffect(() => {
    getCompany(1, 4);
  }, []);

  const ChangeValueCompany = async (id) => {
    await axiosConfig.patch(`/users/${id}`, {
      status: "Đã xét duyệt",
    });

    const updatedCompanyList = company.map((comp) =>
      comp.id === id ? { ...comp, status: "Đã xét duyệt" } : comp
    );
    setCompany(updatedCompanyList);
  };

  console.log(company);

  // Pagination
  let pageNumber = 4;
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    getCompany(page, pageNumber);
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
        <div className="container d-flex justify-content-flex-start align-items-center">
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
                      //   value={searchValue}
                      //   onChange={handleSearchChange}
                    />
                    <Button variant="outline-success" type="submit">
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
                // onChange={handleSortByName}
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
        </div>
        <table
          className="table table-striped table-hover"
          style={{ marginTop: "20px", width: "80%" }}
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
            {company?.map((company, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.email}</td>

                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    height: "70px",
                  }}
                >
                  {/* <Space wrap>
                    <Select
                      style={{
                        width: 130,
                        marginRight: 20,
                      }}
                      disabled={!isStatusDisabled}
                      value={company.status}
                      onChange={(selectedValue) =>
                        ChangeValueCompany(company.id, selectedValue)
                      }
                      options={[
                        {
                          value: "Chờ xét duyệt",
                          label: "Chờ xét duyệt",
                        },
                        {
                          value: "Đã xét duyệt",
                          label: "Đã xét duyệt",
                        },
                      ]}
                    />
                  </Space> */}
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(selectedValue) =>
                      ChangeValueCompany(company.id, selectedValue)
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
                  <td
                    className="d-flex"
                    style={{ cursor: "pointer", marginRight: "15px" }}
                  >
                    <EyeOutlined />
                  </td>

                  <CustomButton
                    label={"Lock"}
                    type={"button"}
                    className={"btn btn-danger"}
                    style={{ margintop: "15px" }}
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
