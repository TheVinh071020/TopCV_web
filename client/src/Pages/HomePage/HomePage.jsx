import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./HomePage.css";
import Header from "../../Component/Headers/Header";
import Footer from "../../Component/Footer/Footer";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { Select, Space } from "antd";
import { Helmet } from "react-helmet";
import ListJobs from "../../Component/PaginationListJobs/ListJobs";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function HomePage() {
  const [listJobs, setListJobs] = useState([]);
  const [total, setTotal] = useState(0);

  //Get list jobs
  let dispatch = useDispatch();

  const getListJobs = async (pageIndex, pageNumber) => {
    await axios
      .get(`http://localhost:8000/jobs?_page=${pageIndex}&_limit=${pageNumber}`)
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
        dispatch({ type: "GET_JOBS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Tìm kiếm
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // TÌm kiếm
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const inputValue = searchValue;
    setSearchValue(inputValue);
    console.log(inputValue);
    await axios
      .get(`http://localhost:8000/jobs?q=${searchValue}`)
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Lọc theo địa chi
  const handleFilterByAddress = async (value) => {
    await axios
      .get(`http://localhost:8000/jobs?address.city_like=${value}`)
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
    await axios
      .get(`http://localhost:8000/jobs?_sort=salary&_order=${value}`)
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListJobs(1, 6);
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Trang chủ CareerBuilder</title>
      </Helmet>
      <Header />
      <div className="carousel">
        <Carousel>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Fseeker-banner%2F2023%2F12%2F11%2Fbanner-website-Xmas-06_170226725619.jpg&w=1920&q=75"
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Fseeker-banner%2F2023%2F12%2F11%2Fbanner-website-Xmas-07_170226691718.jpg&w=1920&q=75"
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Fseeker-banner%2F2023%2F12%2F11%2Fbanner-website-Xmas-07_170226691718.jpg&w=1920&q=75"
              alt=""
            />
          </Carousel.Item>
        </Carousel>
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
            {listJobs.map((job, i) => (
              <div key={i} className="feature_job_item">
                <div className="job">
                  <div className="nav1">
                    <div className="avatar">
                      <img src={job.avatar} alt="" />
                    </div>
                    <div className="job_item1">
                      <h5 style={{ fontSize: "15px" }}>{job.name}</h5>
                      <div style={{ fontSize: "13px" }}>{job.company}</div>
                    </div>
                  </div>
                  <div className="nav2">
                    <div className="job_item2">{job.salary} triệu</div>
                    <div className="job_item3">{job.address.city}</div>
                    <div className="job_item_btn">
                      <Link to={`/detail/${job.id}`}>
                        <Button variant="outline-info">Chi tiết</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <ListJobs
            total={total}
            listJobs={listJobs}
            pageNumber={6}
            getListJobs={getListJobs}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
