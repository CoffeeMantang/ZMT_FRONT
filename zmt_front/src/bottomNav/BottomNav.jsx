import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, colors, getRadioUtilityClass, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import "./BottomNav.css";
import { useState } from "react";
import Modal from "react-modal";

export default function BottomNav() {
  const [activeNav, setActiveNav] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    overlay: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(105, 105, 105, 0.9)",
    },
    content: {
      borderRadius: "20px",
      position: "absolute",
      top: "25%",
      left: "42vw",
      right: "auto",
      bottom: "auto",
      width: "70vw",
      height: "60vh",
      transform: "translate(-40%, -10%)",
    },
  };
  return (
    <Box>
      <Paper
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100vw",
          borderBottom: 1,
        }}
        elevation={3}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          height="7vh"
          alignItems="center"
          alignSelf="center"
        >
          <Grid xs={2} container justifyContent="space-evenly">
            <Link to="/Address" className="iconColor">
              <FontAwesomeIcon icon="location-dot" size="lg" />{" "}
              {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
            </Link>
          </Grid>
          <Grid
            xs={8}
            justifyContent="space-evenly"
            className="addressMean"
            style={{ textAlign: "center" }}
          >
            <Link to="/Signinpage">
              <item>
                <h4>LogIn</h4>
              </item>
            </Link>
          </Grid>
          <Grid xs={2} container justifyContent="space-evenly">
            <Link to="/OrderList" className="iconColor">
              <FontAwesomeIcon icon="bell" size="lg" />{" "}
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <Outlet />
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100vw",
          borderTop: 1,
        }}
        elevation={3}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          height="7vh"
          alignItems="center"
          alignSelf="center"
        >
          <Grid xs={2} container justifyContent="space-evenly">
            <Link
              to="/Main"
              className="nav-link"
              onClick={() => setActiveNav(1)}
            >
              <FontAwesomeIcon
                icon="home"
                className={activeNav === 1 ? "nav-item active" : "nav-item"}
              />
            </Link>
          </Grid>
          <Grid xs={2} container justifyContent="space-evenly">
            <Link
              to="/Search"
              className="nav-link"
              onClick={() => setActiveNav(2)}
            >
              <FontAwesomeIcon
                icon="magnifying-glass"
                className={activeNav === 2 ? "nav-item active" : "nav-item"}
              />
            </Link>
          </Grid>
          <Grid xs={2} container justifyContent="space-evenly">
            <button onClick={() => setModalIsOpen(true)}>
              <FontAwesomeIcon
                icon="circle-plus"
                size="2xl"
                className={
                  activeNav === 3 ? "nav-item menu" : "nav-item active"
                }
              />
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={customStyles}
            >
              <Box
                sx={{
                  textAlign: "center",
                  position: "fixed",
                  bottom: "5vh",
                  left: "8vw",
                  right: 0,
                  top: "5vh",
                  overflow: "hidden",
                }}
              >
                <table border={0}>
                  <tr>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food1.png"} />
                      </button>
                    </td>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food2.png"} />
                      </button>
                    </td>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food3.png"} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food4.png"} />
                      </button>
                    </td>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food5.png"} />
                      </button>
                    </td>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food6.png"} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food7.png"} />
                      </button>
                    </td>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food8.png"} />
                      </button>
                    </td>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food9.png"} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food10.png"} />
                      </button>
                    </td>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food11.png"} />
                      </button>
                    </td>
                    <td>
                      <button className="menuSpace">
                        <img className="menuList" src={"/images/food12.png"} />
                      </button>
                    </td>
                  </tr>
                </table>
              </Box>
            </Modal>
          </Grid>
          <Grid xs={2} container justifyContent="space-evenly">
            <Link
              to="/Orderlist"
              className="nav-link"
              onClick={() => setActiveNav(4)}
            >
              <FontAwesomeIcon
                icon="list"
                className={activeNav === 4 ? "nav-item active" : "nav-item"}
              />
            </Link>
          </Grid>
          <Grid xs={2} container justifyContent="space-evenly">
            <Link
              to="/Mypage"
              className="nav-link"
              onClick={() => setActiveNav(5)}
            >
              <FontAwesomeIcon
                icon="user"
                className={activeNav === 5 ? "nav-item active" : "nav-item"}
              />
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
