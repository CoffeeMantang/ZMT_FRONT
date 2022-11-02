import React from "react";
import "./TopNav.css";
import { Link } from "react-router-dom";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors, getRadioUtilityClass, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

const TopNav = () => {
  return (
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
          <Link to="/Address">
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
  );
};

export default TopNav;
