import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./HomePage.css";
import Header from "../../Component/Layouts/Headers/Header";
import Footer from "../../Component/Layouts/Footer/Footer";
import Carousels from "../../Component/Layouts/Carousel/Carousels";
import { Select, Space } from "antd";
import { Helmet } from "react-helmet";
import PaginationListJobs from "../../Component/Layouts/PaginationListJobs";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { axiosConfig } from "../../axios/config";
import { useSearchParams } from "react-router-dom";
import DetailItem from "../../Component/Layouts/DetailItem";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("name_like");

  const [listJobs, setListJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [prevSearchValue, setPrevSearchValue] = useState("");

  //Get list jobs
  let dispatch = useDispatch();

  // Lấy toàn bộ job và phân trang
  const getListJobs = async (pageIndex, pageNumber) => {
    await axiosConfig
      .get(`/jobs?_page=${pageIndex}&_limit=${pageNumber}`)
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
        dispatch({ type: "GET_JOBS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Lấy job theo querySearch
  const getListJobsByQuerySearch = async (pageIndex, pageNumber) => {
    axiosConfig
      .get(
        `/jobs?_page=${pageIndex}&_limit=${pageNumber}&&name_like=${querySearch}`
      )
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // TÌm kiếm
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchValue === prevSearchValue) {
      return;
    }
    setSearchParams({ name_like: searchValue });
    await axiosConfig
      .get(`/jobs?name_like=${searchValue}`)
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
    setPrevSearchValue(searchValue);
  };
  console.log(listJobs);

  // Lọc theo địa chi
  const handleFilterByAddress = async (value) => {
    await axiosConfig
      .get(`/jobs?address.city_like=${value}`)
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Lọc theo lương
  const handleFilterBySalary = async (value) => {
    console.log(value);
    await axiosConfig
      .get(`/jobs?_sort=salary&_order=${value}`)
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (querySearch) {
      setSearchValue(querySearch);
      getListJobsByQuerySearch(1, 6);
    } else {
      getListJobs(1, 6);
    }
  }, [searchParams, dispatch, querySearch]);

  return (
    <div>
      <Helmet>
        <title>Trang chủ CareerBuilder</title>
      </Helmet>
      <Header />
      <div className="carousel">
        <Carousels />
      </div>
      <div className="list-feature-jobss">
        <div className="container">
          <div className="title">
            <h2>Việc làm tốt nhất</h2>
            <div className="box-label">
              <img
                src="	https://static.topcv.vn/v4/image/welcome/feature-job/label-toppy-ai.png"
                alt=""
              />
            </div>
            <div className="box-select"></div>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container fluid>
                <Navbar.Collapse id="navbarScroll">
                  <Form onSubmit={handleSearchSubmit} className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
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
          <div className="box-select">
            <Space wrap>
              <Select
                defaultValue="Lọc theo địa chỉ:"
                style={{
                  width: 200,
                  marginRight: 20,
                }}
                onChange={handleFilterByAddress}
                options={[
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
            <Space wrap>
              <Select
                defaultValue="Lọc theo mức lương:"
                style={{
                  width: 200,
                }}
                onChange={handleFilterBySalary}
                options={[
                  {
                    value: "desc",
                    label: "Mức lương cao đến thấp",
                  },
                  {
                    value: "asc",
                    label: "Mức lương thấp đến cao",
                  },
                ]}
              />
            </Space>
          </div>
        </div>
        <div className="row feature_job">
          <div className="container row-detail ">
            {listJobs.length > 0 ? (
              listJobs.map((job, i) => <DetailItem job={job} key={i} />)
            ) : (
              <div
                className="feature_job_item"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="job">
                  <div className="nav2">
                    <h4>Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <PaginationListJobs
            total={total}
            listJobs={listJobs}
            pageNumber={6}
            getListJobs={getListJobs}
            querySearch={querySearch}
            getListJobsByQuerySearch={getListJobsByQuerySearch}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
