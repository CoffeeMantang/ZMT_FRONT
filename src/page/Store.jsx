import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from '../css/Store.module.css';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ssamanco from '../assets/font/BinggraeSamanco.ttf';

export default function Store(props) {
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
  const theme = createTheme({
    typography: {
      fontFamily: '빙그레 싸만코체',
    },
    palette: {
      primary: {
        main: '#FFFF00',
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

  const history = useHistory();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
  };
  const storeId = useParams().storeId; // 주소에서 가게의 아이디 가져옴

  const [storeDTO, setStoreDTO] = useState();
  const [charge, setCharge] = useState('배달팁은 로그인 후 확인할 수 있어요.');

  const fetchStore = async () => {
    try {
      console.log('가게정보 로드를 위한 api 연결 시작');
      const response = await axios.get(
        `http://localhost:8080/nonmember/storeview/${storeId}`
      );
      if (props.isLogin === true) {
        // 로그인 한 상태의 배달팁 메시지
        setCharge('배달팁은 로그인 후 확인할 수 있어요.');
      } else {
        // 로그인 안된 상태의 배달팁 메시지
        setCharge('배달팁은 로그인 후 확인할 수 있어요.');
      }
      setStoreDTO(response.data);
      if (props.isLogin === true) {
        getCharge();
      }
    } catch {
      throw new Error('응애');
    }
  };

  let category = ''; // 카테고리를 임시저장

  // 가게정보 페이지로 이동
  const goStoreInfo = (storeId) => {};
  // 클릭한 메뉴로 이동
  const goMenuInfo = (menuId) => {
    history.push(`/menu/${menuId}`);
  };

  const setCategory = (e) => {
    category = e;
  };

  // 로그인 시 배달비 가져오는 함수
  const getCharge = async () => {
    if (props.isLogin === true) {
      console.log('배달비 가져오기 api');
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.get(
        `http://localhost:8080/partners/store/getStoreCharge?storeId=${storeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCharge('배달비 ' + response.data + '원');
    }
  };

  // 컴포넌트 최초 로드 시
  useEffect(() => {
    setCategory('');
    console.log(storeId);
    fetchStore();
    if (props.isLogin === true) {
      // 로그인 된 상태면 배달비 가져오기
      getCharge();
    }
  }, []);
  // state 변경 시
  useEffect(() => {
    setCategory('');
  }, [storeDTO]);

  const goReview = (storeId) => {
    history.push(`/review/${storeId}`);
  };

  const colWidth = { xs: 12, sm: 6, md: 4, lg: 3 };

  return (
    <ThemeProvider theme={theme}>
      {storeDTO !== null && storeDTO !== undefined && (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 0, mx: 0 }}>
          <Grid sx={{ width: '100%', mb: 10, p: 0 }}>
            <Grid xs="12">
              <Slider {...settings}>
                {storeDTO.images.map((item) => {
                  return (
                    <div className={styles.image_banner}>
                      <img
                        src={item.image}
                        className={styles.image_thumbnail}
                      />
                    </div>
                  );
                })}
              </Slider>
            </Grid>
            {/** 가게정보 */}
            <Grid container xs="12" sx={{ px: 3, pt: 4 }}>
              <Grid xs="12">
                <Typography variant="h3">{storeDTO.name}</Typography>
              </Grid>
              <Grid
                xs="1"
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <StarIcon color="primary" align="center" fontSize="medium" />
              </Grid>
              <Grid xs="11">
                <Typography
                  variant="h7"
                  onClick={() => {
                    history.push(`/review/${storeId}`);
                  }}
                >
                  {storeDTO.score}({storeDTO.reviewCount})
                </Typography>
              </Grid>
              <Grid xs="12">
                <Typography variant="h6">
                  최소주문금액 {storeDTO.min}원
                </Typography>
              </Grid>
              <Grid xs="12">
                <Typography variant="h6">{charge}</Typography>
              </Grid>
              <Grid xs="12" sx={{ mt: 3 }}>
                <Typography
                  variant="h6"
                  onClick={() => history.push(`/storeInfo/${storeId}`)}
                >
                  매장정보
                </Typography>
              </Grid>
            </Grid>
            {/** 메뉴리스트 */}
            {storeDTO.menuList !== null &&
              storeDTO.menuList !== undefined &&
              storeDTO.menuList.length > 0 &&
              storeDTO.menuList.map((item) => (
                <Grid container xs="12" sx={{ px: 3, py: 2 }}>
                  {category !== item.category && (
                    <Grid xs="12" sx={{ my: 4 }}>
                      <Typography variant="h4">{item.category}</Typography>
                    </Grid>
                  )}
                  {category !== item.category && setCategory(item.category)}
                  <Grid container xs="8" justifyContent="center">
                    <Grid xs="12" justifyContent="center">
                      <Typography
                        variant="h5"
                        onClick={() => history.push(`/menu/${item.menuId}`)}
                      >
                        {item.menuName}
                      </Typography>
                    </Grid>
                    <Grid xs="12" justifyContent="center">
                      <Typography variant="h5">{item.price}원</Typography>
                    </Grid>
                  </Grid>
                  <Grid xs="4">
                    <div className={styles.image_box}>
                      <img
                        src={`${item.menuPic}`}
                        alt={item.name}
                        loading="lazy"
                        className={styles.image_thumbnail}
                      />
                    </div>
                  </Grid>
                  <Grid
                    xs="12"
                    sx={{ mt: 3, borderBottom: 1, borderColor: 'divider' }}
                  ></Grid>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}

      <ThemeProvider theme={theme2}>
        {(storeDTO === null ||
          storeDTO === undefined ||
          storeDTO.length < 1) && (
          <div className={styles.App_logo}>
            <Typography variant="h1" fontWeight="bold" align="center">
              ZMT
            </Typography>
          </div>
        )}
      </ThemeProvider>
    </ThemeProvider>
  );
}
