import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from '../css/Main.module.css';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {
  createTheme,
  Link,
  ThemeProvider,
  Grid,
  Typography,
  makeStyles,
  Snackbar,
  Alert,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import ssamanco from '../assets/font/BinggraeSamanco.ttf';

export default function Main(props) {
  const [open, setOpen] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: '빙그레 싸만코체',
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

  const theme2 = createTheme({
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
                        font-family: 'NanumSquareAc';
                        font-style: normal;
                        font-display: swap;
                        font-weight: normal;
                        src: url(https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css);
                        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                      }
                    `,
      },
    },
  });

  const history = useHistory();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    arrows: false,
  };

  const [recommendList, setRecommendList] = useState(); // 현재 가지고 있는 List를 state로 선언
  const [isData, setIsData] = useState(false);

  // 로그인 체크 후 recommendList 가져오기
  const getRecommendList = async () => {
    console.log('로그인 상태는' + props.isLogin);
    if (props.isLogin === true) {
      try {
        console.log('메뉴추천 시스템 연결...');
        // 로그인 한 상태이면
        // 1. 로컬 스토리지에서 엑세스 토큰을 가져옴
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        // 2. 서버에 추천 메뉴 요청 보냄
        const response = await axios.post(
          `http://localhost:8080/recommend/recommend`,
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ).catch(error => {
          // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
          if (error.status === 403) {
            //로그인상태를 false로
            props.setLogin(false);
            history.push("/main");
          }
        });
        // 3. response에 있는 List 꺼내옴
        setRecommendList(response.data.recommendDTOs);
        setIsData(true);
        console.log(recommendList);
      } catch (e) {
        // 실패한 경우 로그아웃 처리
        localStorage.removeItem('ACCESS_TOKEN');
        props.setLogin(false); // 로그아웃 상태로 표시
      }
    }
  };

  //컴포넌트 최초 로드 시
  useEffect(() => {
    console.log('컴포넌트 최초 로드 시');
    getRecommendList();
    props.setTop(true);
    props.setBottomPage(0);
    props.setBottom(true);
    if (props.isLogin === false) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    getRecommendList();
  }, [props.isLogin]);

  useEffect(() => {
    if (isData === false) {
      getRecommendList();
    }
  }, [isData]);

  //가게 페이지로 이동시키기
  const goStore = (storeId) => {
    history.push(`/store/${storeId}`);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      <ImageList sx={{ width: '100%', mt: 0, mb: 10, border: '0px' }}>
        <ImageListItem cols="12">
          <Slider {...settings}>
            <div className={styles.image_banner}>
              <img
                src={'../images/banner1.png'}
                className={styles.image_thumbnail}
              />
            </div>
            <div className={styles.image_banner}>
              <img
                src={'../images/banner2.png'}
                className={styles.image_thumbnail}
              />
            </div>
            <div className={styles.image_banner}>
              <img
                src={'../images/banner3.png'}
                className={styles.image_thumbnail}
              />
            </div>
          </Slider>
        </ImageListItem>
        {recommendList !== null &&
          recommendList !== undefined &&
          recommendList.length > 0 &&
          recommendList.map((item) => (
            <ImageListItem
              key={item.menuPic}
              cols="12"
              sx={{ mx: 2.5, mt: 2.5, mb: 0 }}
            >
              <div
                className={styles.image_box}
                onClick={() => goStore(item.storeId)}
              >
                <img
                  src={`${item.menuPic}`}
                  alt={item.storeName}
                  loading="lazy"
                  className={styles.image_thumbnail}
                />
              </div>
              <Grid container>
                <Grid xs="12" sx={{ m: 0, p: 0 }}>
                  <Typography variant="h4" sx={{ m: 0 }}>
                    {item.storeName}
                  </Typography>
                </Grid>
                <Grid xs="12" sx={{ m: 0, p: 0 }}>
                  <Typography variant="h6" sx={{ m: 0 }}>
                    {item.menuName}
                  </Typography>
                </Grid>
              </Grid>
            </ImageListItem>
          ))}
      </ImageList>
      <ThemeProvider theme={theme2}>
        {(recommendList === null ||
          recommendList === undefined ||
          recommendList.length < 1) && (
          <div
            className={styles.App_logo}
          >
            <Typography variant="h1" fontWeight="bold" align="center">
              ZMT
            </Typography>
          </div>
        )}
      </ThemeProvider>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          로그인하면 메뉴 추천 정보를 볼수있어요!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
