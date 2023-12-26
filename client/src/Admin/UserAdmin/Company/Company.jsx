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

  // Lý danh sách company
  const getCompany = async (pageIndex, pageNumber) => {
    await axiosConfig
      .get(`/companies?_page=${pageIndex}&_limit=${pageNumber}`)
      .then((res) => {
        setCompany(res.data);
        setTotal(res.headers["x-total-count"]);
      });
  };
  console.log(company);

  useEffect(() => {
    getCompany(1, 4);
  }, []);

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
                defaultValue="Giới tính"
                style={{
                  width: 100,
                  marginRight: 20,
                }}
                // onChange={handleFilterByGender}
                options={[
                  {
                    value: "",
                    label: "Giới tính",
                  },
                  {
                    value: "Nam",
                    label: "Nam",
                  },
                  {
                    value: "Nữ",
                    label: "Nữ",
                  },
                ]}
              />
            </Space>
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
          style={{ marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">ID</th>
              <th scope="col">Tên</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Avatar</th>
              <th scope="col">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {company?.map((company, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.address}</td>
                <td  style={{ width: "50px", height: "50px" }}>
                  <div style={{ width: "50px", height: "50px" }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={company.avatar}
                      alt=""
                    />
                  </div>
                </td>

                <td
                  className="d-flex align-items-center"
                  style={{ width: "auto", height: "70px" }}
                >
                  <td
                    className="d-flex"
                    //   onClick={() => handleViewUser(company.id)}
                    style={{ cursor: "pointer", marginRight: "15px" }}
                  >
                    <EyeOutlined />
                  </td>
                  {/* {user.locked === false ? ( */}
                  <CustomButton
                    label={"Lock"}
                    type={"button"}
                    className={"btn btn-danger"}
                    style={{ margintop: "15px" }}
                    //   onClick={() => handleLockUser(user.id)}
                  />
                  {/* ) : (
                    <CustomButton
                      label={"UnLock"}
                      type={"button"}
                      className={"btn btn-success"}
                      onClick={() => handleUnLockUser(user.id)}
                    />
                  )} */}
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
