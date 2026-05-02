import React, { useState, useEffect } from "react";
import page1 from "../assets/page1.png";
import page2 from "../assets/page2.png";
import page3 from "../assets/page3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Carousel = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update width on resize for responsive height
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive height: 250px for mobile, 500px for desktop
  const getHeight = () => (windowWidth < 768 ? "250px" : "500px");

  return (
    <section className="row mb-4">
      <div className="col-12">

        <div
          id="mycarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >

          {/* Indicators */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {/* Carousel Items */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={page1}
                alt="slide1"
                className="d-block w-100"
                style={{ height: getHeight(), objectFit: "cover" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={page2}
                alt="slide2"
                className="d-block w-100"
                style={{ height: getHeight(), objectFit: "cover" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={page3}
                alt="slide3"
                className="d-block w-100"
                style={{ height: getHeight(), objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#mycarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "50%" }}
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#mycarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              style={{ backgroundColor: "rgba(255,193,7,0.8)", borderRadius: "50%" }}
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Promo Banner */}
        <marquee className="bg-info mt-3 py-2 text-dark fw-bold">
          ★ Sacred Vanity 2026 Drop | Limited Access Pieces Only — No Restocks
        </marquee>
      </div>
    </section>
  );
};

export default Carousel;