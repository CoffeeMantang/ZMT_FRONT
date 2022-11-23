import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Address(props) {
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

  const history = useHistory();
  const [allAddress, setAllAddress] = useState(null); // 주소관리를 위한 state

  const getAddress = async () => {
    console.log('서버에서 주소목록 가져오기 실행');
    // 서버에서 주소목록 가져오기
    if (props.isLogin === false) {
      // 로그인되지 않은 상태인 경우 로그인 페이지로 이동
      history.push('/login');
    } else {
      // 로그인된 경우
      try {
        // 로그인 된 경우 - null이 오면 "주소를 등록하세요", 있으면 해당 주소로 setAddress
        const accessToken = localStorage.getItem('ACCESS_TOKEN'); // 로컬저장소에서 엑세스 토큰 가져옴
        const response = await axios
          .post(`http://localhost:8080/member/getalladdress`, null, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .catch((error) => {
            // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
            if (error.status === 403) {
              //로그인상태를 false로
              props.setLogin(false);
              history.push('/login');
            }
          });
        setAllAddress(response.data);
      } catch (e) {
        console.log('Address.jsx에서 주소가져오기에 실패');
        props.setLogin(false);
        history.push('/login');
        throw new Error('주소가져오기 실패'); // 실패시 로그인상태를 해제시킴
      }
    }
  };

  const goMain = () => {
    props.setBottomPage(0);
    history.push('/main');
  };

  const goNewAddress = () => {
    // 새 주소 추가 페이지로
    history.push('/newAddress');
  };

  useEffect(() => {
    // 컴포넌트가 로드될때
    getAddress();
  }, []);

  const setFirstAddress = async (id) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN'); // 로컬저장소에서 엑세스 토큰 가져옴
    const response = await axios.get(
      `http://localhost:8080/member/setFirstAddress?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    getAddress();
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      <Grid container sx={{ mt: 0, p: 0 }} spacing={0}>
        {/** 새 주소 추가 */}
        <Grid
          container
          xs="12"
          sx={{ pt: 2, pb: 1, borderBottom: '4px gray solid', mb: 2 }}
        >
          <Grid xs="2" justifyContent="center" align="center">
            <IconButton color="secondary">
              <AddCircleIcon />
            </IconButton>
          </Grid>
          <Grid xs="10" justifyContent="center" sx={{ m: 'auto', p: 'auto' }}>
            <Typography
              variant="h6"
              fontWeight="600"
              wrap="nowrap"
              onClick={() => goNewAddress()}
            >
              새 주소 추가
            </Typography>
          </Grid>
        </Grid>
        {/** 주소목록 */}

        {allAddress &&
          allAddress.map((item) => {
            return (
              <Grid
                container
                key={item.memberrocatonId}
                sx={{ py: 1, borderBottom: '1px gray solid' }}
                onClick={() => setFirstAddress(item.memberrocationId)}
              >
                <Grid xs="2" justifyContent="center" align="center">
                  <IconButton color="secondary">
                    <LocationOnIcon />
                  </IconButton>
                </Grid>
                <Grid xs="10" sx={{ m: 'auto', p: 'auto' }}>
                  <Typography variant="h6" fontWeight="bold" wrap="nowrap">
                    {item.address1} {item.address2} ({item.nickname})
                    {item.state === 1 && `(대표주소)`}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
      <Box position="fixed" sx={{ flexGrow: 1, top: 0, left: 0, right: 0 }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => goMain()}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              fontWeight="600"
              align="left"
            >
              주소관리
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
