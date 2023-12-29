import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./HomePage.css";
import Header from "../../components/Layouts/Headers/Header";
import Footer from "../../components/Layouts/Footer/Footer";
import Carousels from "../../components/Layouts/Carousel/Carousels";
import { Select, Space } from "antd";
import { Helmet } from "react-helmet";
import { axiosConfig } from "../../axios/config";
import { useSearchParams } from "react-router-dom";
import DetailItem from "../../components/Layouts/DetailItem";
import Pagination from "../../components/common/Pagination";
import SearchInput from "../../components/common/SearchInput";
import CustomButton from "../../components/common/CustomButton";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("name_like");
  const queryAddress = searchParams.get("address");
  const querySalary = searchParams.get("salary");

  const [listJobs, setListJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const [valueSalary, setValueSalary] = useState("");

  const [prevSearchValue, setPrevSearchValue] = useState("");

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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Lấy job theo querySearch, queryAddress, querySalary khi search sort sẽ render
  const getListJobsByQuerySearch = async (pageIndex, pageNumber) => {
    axiosConfig
      .get(
        `/jobs?_page=${pageIndex}&_limit=${pageNumber}&&name_like=${querySearch}&address_like=${queryAddress}&&_sort=salary&_order=${querySalary}`
      )
      .then((res) => {
        setListJobs(res.data);
        setTotal(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TÌm kiếm
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

  // Lọc theo địa chi
  const handleFilterByAddress = async (value) => {
    setValueAddress(value);
    setSearchParams({
      address: value,
      name_like: searchValue,
      salary: valueSalary,
    });
    await axiosConfig
      .get(`/jobs?address_like=${value}`)
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
    setValueSalary(value);
    console.log(value);
    setSearchParams({
      salary: value,
      address: valueAddress,
      name_like: searchValue,
    });
    await axiosConfig
      .get(`/jobs?_sort=salary&_order=${value}`)
      .then((res) => {
        console.log(res.data);
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
    } else if (queryAddress) {
      setValueAddress(queryAddress);
      getListJobsByQuerySearch(1, 6);
    } else if (querySalary) {
      setValueSalary(querySalary);
      getListJobsByQuerySearch(1, 6);
    } else {
      getListJobs(1, 6);
    }
  }, [searchParams, dispatch, querySearch, queryAddress, querySalary]);

  // Clear filter
  const handleClear = () => {
    if (!searchValue && !valueAddress && !valueSalary) {
      return;
    }
    setSearchValue("");
    setValueAddress("");
    setValueSalary("");
    setSearchParams("");
  };
  // Phân trang
  let pageNumber = 6;
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    if (querySearch) {
      getListJobsByQuerySearch(page, pageNumber);
    } else if (queryAddress) {
      getListJobsByQuerySearch(page, pageNumber);
    } else if (querySalary) {
      getListJobsByQuerySearch(page, pageNumber);
    } else {
      getListJobs(page, pageNumber);
    }
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

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
            <div className="box-select">
              <SearchInput
                onSubmit={handleSearchSubmit}
                onChange={handleSearchChange}
                value={searchValue}
              />
            </div>
            <div className="box-select">
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
            <CustomButton
              label={"Clear"}
              type={"button"}
              className={"btn btn-danger"}
              onClick={handleClear}
            />
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
          <Pagination pageNumbers={pageNumbers} goToPage={goToPage} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
