import React, { useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ssamanco from '../assets/font/BinggraeSamanco.ttf';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function TopNav(props) {
  const history = useHistory();
  const [address, setAddress] = useState('로그인');

  const theme = createTheme({
    typography: {
      fontFamily: '빙그레 싸만코체',
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
            font-family: '빙그레 싸만코체';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('빙그레 싸만코체'), url(${ssamanco}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

  //주소를 클릭했을 때 핸들러
  const addressHandler = () => {
    console.log('addressHandler() 발동!');
    // 로컬스토리지에서 저장된 토큰을 가져옴
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log(accessToken);
    if (props.isLogin === false) {
      // 로그인된 상태가 아닌 경우
      history.push('/login'); // 로그인 페이지로 이동
    } else {
      history.push('/address');
    }
  };

  // 로그인 상태 체크 함수
  const fetchAddress = async () => {
    const isLogin = props.isLogin;
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log('TopNav : isLogin? ' + props.isLogin);
    if (isLogin === false) {
      // 로그인된 상태가 아닌경우
      setAddress('로그인');
    } else {
      // 로그인 된 경우 - null이 오면 "주소를 등록하세요", 있으면 해당 주소로 setAddress
      const response = await axios.post(
        `http://localhost:8080/member/getmainaddress`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const obj = response.data; // 넘어온 json을 파싱
      if (obj.address1 === null) {
        // 넘어온 주소가 null이면
        setAddress('주소를 등록하세요');
      } else {
        setAddress(obj.address1);
      }
    }
  };

  // 로그인 상태가 변경되면 fetchAddress 실행
  useEffect(() => {
    fetchAddress();
  }, [props.isLogin]);

  //컴포넌트가 로드될때도 fetchAddress 실행
  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box position="sticky" sx={{ flexGrow: 1, top: 0, left: 0, right: 0 }}>
        <AppBar color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => history.push('/basket')}
            >
              <ShoppingBasketIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              align="center"
              onClick={addressHandler}
            >
              {address}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="secondary"
              aria-label="menu"
              sx={{ ml: 2 }}
            >
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
