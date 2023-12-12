import React, { useEffect, useState } from "react";
import Header from "../Headers/Header";
import Footer from "../Footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import { Select, Space } from "antd";
import "./HomePage.css";
import axios from "axios";

function HomePage() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [user, setUser] = useState([]);
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const userId = userLogin.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(user);

  return (
    <div>
      <Header />
      <div className="carousel">
        <Carousel>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="	https://static.topcv.vn/img/CVO_T1_1100x220.png"
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="	https://static.topcv.vn/img/Branding%202.png"
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "100%" }}
              src="https://static.topcv.vn/img/Banner_T1_CVO_1100x220.png"
              alt=""
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <Space wrap>
          <Select
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
            ]}
          />
        </Space>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
