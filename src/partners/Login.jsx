import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  CssBaseline,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Button,
  Grid,
  Checkbox,
  Link,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';

// 사업자 페이지의 로그인 기능을 담당하는 컴포넌트
export default function Login(props) {
  const [state, setState] = useState('');
  const [disable, setDisable] = useState('');

  const history = useHistory();

  const theme = createTheme({
    typography: {
      fontFamily: 'NanumSquareNeo-Variable',
    },
    palette: {
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#F2620F',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
                  @font-face {
                    font-family: 'NanumSquareNeo-Variable';
                    font-style: normal;
                    font-display: swap;
                    font-weight: normal;
                    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                  }
                `,
      },
    },
  });

  useEffect(() => {
    if (props.isLogin === true) {
      // 이미 로그인 되어 있으면 main으로 이동
      const type = localStorage.getItem('ACCESS_TYPE');
      if (type === 1) {
        // 사업자인 경우
        history.push('/partners');
      } else if (type === 2) {
        // 일반회원인 경우
        history.push('/main');
      }
    }
  }, []);

  // 폼 제출 시의 이벤트 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    const req = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/nonmember/signin`,
        req
      );

      // 성공 시 로컬 스토리지에 토큰 저장
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      // 타입도 저장
      localStorage.setItem('ACCESS_TYPE', response.data.type);

      props.setLogin(true);
      // token 출력
      console.log(response.data.token);
      // 메인화면으로 이동
      const type = localStorage.getItem('ACCESS_TYPE');
      if (type === 1) {
        // 사업자인 경우
        history.push('/partners');
      } else if (type === 2) {
        // 일반회원인 경우
        history.push('/main');
      }
    } catch (e) {
      setState('로그인 실패');
      setDisable('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container>
            <Grid xs="12" justifyContent="right" sx={{ mt: 10 }}>
              <Typography textAlign="right" variant="h3" color="secondary">
                <b>Z</b>one
              </Typography>
              <Typography
                textAlign="right"
                variant="h3"
                fontWeight="bold"
                color="secondary"
              >
                MT
              </Typography>
            </Grid>
            <Grid xs="12">
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockPersonOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 6, mb: 2, border: 2, borderColor: '#F2620F' }}
                >
                  <Typography variant="h6" fontWeight="bold" color="secondary">
                    {' '}
                    로그인
                  </Typography>
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ border: 2, borderColor: '#F2620F' }}
                >
                  <Typography variant="h6" fontWeight="bold" color="secondary">
                    {' '}
                    회원가입
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
