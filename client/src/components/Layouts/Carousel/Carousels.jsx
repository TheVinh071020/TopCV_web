import React from "react";
import Carousel from "react-bootstrap/Carousel";

function Carousels() {
  return (
    <div>
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
  );
}

export default Carousels;
