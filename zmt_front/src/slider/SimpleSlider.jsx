import React, { Component } from "react";
import Slider from "react-slick";
import { Paper, Button } from "@mui/material";
import { Box } from "@mui/system";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider(props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: "8vh",
        left: 0,
        right: 0,
        width: "100vw",
      }}
    >
      <Slider {...settings}>
        <div>
          <img src={"/images/img3.jpg"} className="slideimg" />
        </div>
        <div>
          <img src={"/images/img3.jpg"} className="slideimg" />
        </div>
        <div>
          <img src={"/images/img3.jpg"} className="slideimg" />
        </div>
      </Slider>
    </Box>
  );
}
export default SimpleSlider;
