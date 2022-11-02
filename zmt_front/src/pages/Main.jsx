import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { Box, div } from "@mui/material";
import Slider from "react-slick";
import { Paper, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CryptoList from "../components/Cryto/CryptoList";
import Loader from "../components/Loaders/Loader";

const PAGE_NUMBER = 1;

function Main(props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
  };
  const [coinsData, setCoinsData] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${page}&sparkline=false`
      );

      setCoinsData((prev) => {
        return [...prev, ...response.data];
      });
      setLoading(false);
    }, 1500);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "7vh",
        left: 0,
        right: 0,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Paper>
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
      </Paper>
      <Box>
        <CryptoList coinsData={coinsData} />
        {loading && <Loader />}
      </Box>
    </Box>
  );
}
export default Main;
