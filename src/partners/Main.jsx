import React, { useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Button,
  Menu,
} from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Main.module.css';

export default function Main(props) {
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

  const [storeList, setStoreList] = useState(); // 가게 리스트를 저장할 state

  useEffect(() => {
    props.setThisTop(true);
    // 사업자 회원으로 로그인 된 상태가 아니면 login 페이지로 이동시킴
    if (
      props.isLogin === false ||
      localStorage.getItem('ACCESS_TYPE') !== '1'
    ) {
      console.log('로그인이 안됐어욘, 로그인상태는 ' + props.isLogin);
      history.push('/login');
    } else {
      console.log('내 가게목록 가져오기 시작');
      getStore();
    }
  }, []);

  // 로그인 된 경우 내 가게 목록을 가져옴
  const getStore = async () => {
    if (props.isLogin === true) {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      axios
        .get(`http://localhost:8080/partners/store/getMyStore`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setStoreList(response.data.data);
        })
        .catch((error) => {
          // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
          if (error.status === 403) {
            //로그인상태를 false로
            props.setLogin(false);
            history.push('/login');
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      <Grid container sx={{ px: 2, mt: 2 }}>
        {storeList !== undefined &&
          storeList !== null &&
          storeList.length > 0 &&
          storeList.map((item) => {
            return (
              <Grid xs="12" container>
                <Grid xs="12">
                  <div
                    className={styles.image_box}
                    onClick={() =>
                      history.push(`/partners/store/${item.storeId}`)
                    }
                  >
                    <img
                      src={`${item.thumb}`}
                      alt={item.name}
                      loading="lazy"
                      className={styles.image_thumbnail}
                    />
                  </div>
                </Grid>
                <Grid xs="12" sx={{ mt: 2, mb: 4 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        <Grid xs="12" sx={{ mt: 3 }}>
          <Button
            fullWidth
            sx={{
              mb: 2,
              border: 2,
              borderColor: '#F2620F',
            }}
            onClick={() => history.push('/partners/createStore')}
          >
            <Typography variant="h6" color="secondary">
              가게 추가
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
