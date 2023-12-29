import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/common/CustomButton";
import { axiosConfig } from "../../../axios/config";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import Modal from "react-bootstrap/Modal";
import Pagination from "../../../components/common/Pagination";
import { Select, Space } from "antd";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";

function UserAdmin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState({});
  const [total, setTotal] = useState(0);

  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [sortNameValue, setSortNameValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("name_like");
  const queryGender = searchParams.get("gioi_tinh");
  const querySortByName = searchParams.get("sort_name");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Lý danh sách user
  const getUsers = async (pageIndex, pageNumber) => {
    await axiosConfig
      .get(`/users?_page=${pageIndex}&_limit=${pageNumber}&&role=User`)
      .then((res) => {
        setUsers(res.data);
        setTotal(res.headers["x-total-count"]);
      });
  };

  // Lấy job theo querySearch, queryAddress, querySalary khi search sort sẽ render
  const getListUsersByQuerySearch = async (pageIndex, pageNumber) => {
    axiosConfig
      .get(
        `/users?_page=${pageIndex}&_limit=${pageNumber}&&name_like=${querySearch}&&gender_like=${queryGender}&&_sort=name&_order=${querySortByName}`
      )
      .then((res) => {
        setUsers(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (querySearch) {
      setSearchValue(querySearch);
      getListUsersByQuerySearch(1, 5);
    } else if (queryGender) {
      setGenderValue(queryGender);
      getListUsersByQuerySearch(1, 5);
    } else if (querySortByName) {
      setSortNameValue(querySortByName);
      getListUsersByQuerySearch(1, 5);
    } else {
      getUsers(1, 5);
    }
  }, [searchParams, querySearch, queryGender]);

  // Tim kiếm
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchValue === prevSearchValue) {
      return;
    }
    setSearchParams({
      name_like: searchValue,
      gioi_tinh: genderValue,
      sort_name: sortNameValue,
    });
    await axiosConfig
      .get(
        `/users?name_like=${searchValue}&&gender_like=${genderValue}&&_sort=name&_order=${querySortByName} `
      )
      .then((res) => {
        setUsers(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
    setPrevSearchValue(searchValue);
  };

  // Lọc theo giới tính
  const handleFilterByGender = async (value) => {
    setGenderValue(value);
    setSearchParams({
      name_like: searchValue,
      gioi_tinh: value,
      sort_name: sortNameValue,
    });
    await axiosConfig
      .get(`/users?gender_like=${value}`)
      .then((res) => {
        setUsers(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Sort theo name
  const handleSortByName = async (value) => {
    setSortNameValue(value);
    setSearchParams({
      name_like: searchValue,
      gioi_tinh: genderValue,
      sort_name: value,
    });
    await axiosConfig
      .get(`/users?_sort=name&_order=${value}`)
      .then((res) => {
        setUsers(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLockUser = async (id) => {
    try {
      await axiosConfig.patch(`/users/${id}`, {
        locked: true,
      });
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, locked: true } : user
      );
      setUsers(updatedUsers);
      console.log("User locked successfully");
    } catch (error) {
      console.log("Failed to lock user", error);
    }
  };

  const handleUnLockUser = async (id) => {
    try {
      await axiosConfig.patch(`/users/${id}`, {
        locked: false,
      });
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, locked: false } : user
      );
      setUsers(updatedUsers);
      console.log("User unlocked successfully");
    } catch (error) {
      console.log("Failed to unlock user", error);
    }
  };

  // View user
  const handleViewUser = async (id) => {
    setShow(true);
    await axiosConfig.get(`/users/${id}`).then((res) => {
      setViewUser(res.data);
    });
    console.log(viewUser);
  };

  // CLear filter
  const handleClear = () => {
    if (!searchValue && !genderValue && !sortNameValue) {
      return;
    }
    setSearchValue("");
    setGenderValue("");
    setSortNameValue("");
    setSearchParams("");
  };
  // Pagination
  let pageNumber = 5;
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    getUsers(page, pageNumber);
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="container">
      <div className="mt-3" style={{ width: "97%" }}>
        <div className="d-flex justify-content-center align-items-center">
          <h2>Quản lý người dùng</h2>
        </div>
        <div className="container d-flex justify-content-flex-start align-items-center">
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
                onChange={handleFilterByGender}
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
            <CustomButton
              label={"Clear"}
              type={"button"}
              className={"btn btn-danger"}
              onClick={handleClear}
            />
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
              <th scope="col">Email</th>
              <th scope="col">SĐT</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user?.phone}</td>
                <td>{user?.gender}</td>

                <td className="d-flex ">
                  <td
                    className="d-flex justify-content-center align-items-center"
                    onClick={() => handleViewUser(user.id)}
                    style={{ cursor: "pointer", marginRight: "15px" }}
                  >
                    <EyeOutlined />
                  </td>
                  {user.locked === false ? (
                    <CustomButton
                      label={"Lock"}
                      type={"button"}
                      className={"btn btn-danger"}
                      onClick={() => handleLockUser(user.id)}
                    />
                  ) : (
                    <CustomButton
                      label={"UnLock"}
                      type={"button"}
                      className={"btn btn-success"}
                      onClick={() => handleUnLockUser(user.id)}
                    />
                  )}
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
                    <td>{viewUser.name}</td>
                    <td>{viewUser.phone}</td>
                    <td>{viewUser.education}</td>
                    <td>{viewUser.certification}</td>
                    <td>{viewUser.address}</td>
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

export default UserAdmin;
