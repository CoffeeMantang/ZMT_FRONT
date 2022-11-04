import { Button, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Signupp() {
  const suText = {
    width: "60vw",
    height: "4vh",
    marginBottom: "2vh",
  };
  return (
    <Box>
      <button style={{ float: "left" }}>
        <FontAwesomeIcon icon="arrow-left" size="2xl" />
      </button>
      <br />
      <Box sx={{ marginTop: "10vh" }}>
        <h2>회원가입</h2>
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
          <table>
            <td>
              <tr>
                <input
                  type={"text"}
                  name={"name"}
                  placeholder="이름"
                  style={suText}
                />
              </tr>
              <tr>
                {" "}
                <input
                  type={"text"}
                  name={"email"}
                  placeholder="email"
                  style={suText}
                />
              </tr>
              <tr>
                {" "}
                <input
                  type={"text"}
                  name={"password"}
                  placeholder="비밀번호"
                  style={suText}
                />
              </tr>
              <tr>
                {" "}
                <input
                  type={"text"}
                  name={"passwordCheck"}
                  placeholder="비밀번호 확인"
                  style={suText}
                />
              </tr>
              <tr>
                {" "}
                <input type={"submit"} value={"가입하기"} style={suText} />
              </tr>
            </td>
          </table>
        </form>
      </Box>
    </Box>
  );
}
