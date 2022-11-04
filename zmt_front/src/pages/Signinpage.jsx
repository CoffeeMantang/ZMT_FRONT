import { Button, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Signinpage() {
  const logText = {
    width: "60vw",
    height: "4vh",
    marginBottom: "2vh",
  };
  const logBtn = {
    width: "62vw",
    height: "4vh",
    marginBottom: "2vh",
    marginTop: "1vh",
  };
  return (
    <Box>
      <button style={{ float: "left" }}>
        <FontAwesomeIcon icon="arrow-left" size="2xl" />
      </button>
      <br />
      <Box sx={{ marginTop: "10vh" }}>
        <h2>LogIn</h2>
      </Box>
      <Box
        sx={{
          marginTop: "5vh",
          width: "70vw",
          height: "60vh",
          marginLeft: "15vw",
        }}
      >
        <form>
          <input
            type={"text"}
            name={"email"}
            placeholder="id"
            style={logText}
          />
          <br />
          <input
            type={"text"}
            name={"password"}
            placeholder="password"
            style={logText}
          />
          <br />
          <input type={"submit"} value="로그인" style={logBtn} />
        </form>
        <Link to="/Signupp">회원가입 | </Link>
        <Link to="/Signupp">id 찾기 | </Link>
        <Link to="/Signupp">passward 찾기</Link>
      </Box>
    </Box>
  );
}
