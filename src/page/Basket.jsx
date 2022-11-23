import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
  Button,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useInView } from 'react-intersection-observer';
import styles from '../css/Basket.module.css';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Basket(props) {
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState();
  const [storeName, setStoreName] = useState('로딩중...');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(
    '시스템 운영 시간에만 주문 가능합니다.'
  );
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

  // 서버에 연결해서 장바구니 정보 받아오기
  const getBasket = async () => {
    if (props.isLogin === true) {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios.get(
          `http://localhost:8080/orderlist/getBasket`,
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
        setOrderList(response.data);
        getStoreName(response.data.storeId);
        console.log(response.data);
        setLoading(false);
      } catch (e) {
        setMessage('장바구니가 비었어요!');
        setOpen(true);
      }
    }
  };

  // 가게아이디로 가게정보 가져오기
  const getStoreName = async (sid) => {
    const response = await axios.get(
      `http://localhost:8080/nonmember/store/info?storeId=${sid}`
    );
    setStoreName(response.data.storeName);
  };

  // 컴포넌트 시작 시
  useEffect(() => {
    if (props.isLogin === true) {
      getBasket();
    } else {
      history.push('/login');
    }
  }, []);

  // 수량더하기
  const plus = async (id) => {
    if (props.isLogin === true) {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.get(
        `http://localhost:8080/orderlist/ordermenu/plus?orderMenuId=${id}`,
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

      getBasket();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // 수량빼기
  const minus = async (id) => {
    if (props.isLogin === true) {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.get(
        `http://localhost:8080/orderlist/ordermenu/minus?orderMenuId=${id}`,
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
      getBasket();
    }
  };

  // 해당 메뉴 제거하기
  const deleteMenu = async (id) => {
    if (props.isLogin === true) {
      if (props.isLogin === true) {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios.post(
          `http://localhost:8080/orderlist/delete`,
          {
            ordermenuId: id,
          },
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
        getBasket();
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>

      <Grid container>
        {/** 가게정보 */}
        <Grid xs="12" sx={{ mt: 3, px: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            {storeName !== '로딩중...' && storeName}
          </Typography>
        </Grid>
        {loading === false &&
          orderList.orderMenuDTOList !== null &&
          orderList.orderMenuDTOList !== undefined &&
          orderList.orderMenuDTOList.length > 0 &&
          orderList.orderMenuDTOList.map((item) => {
            return (
              <Grid xs="12" container sx={{ mt: 3, px: 2 }}>
                <Grid
                  xs="11"
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>
                </Grid>
                <Grid xs="1">
                  <IconButton
                    color="secondary"
                    onClick={() => deleteMenu(item.ordermenuId)}
                  >
                    <DeleteIcon />
                  </IconButton>
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
                {item.OrderOptionDTO !== null &&
                  item.OrderOptionDTO !== undefined &&
                  item.OrderOptionDTO.length > 0 &&
                  item.OrderOptionDTO.map((options) => {
                    return (
                      <Grid xs="8" sx={{ pl: 3 }}>
                        <Typography sx={{ color: 'grey' }}>
                          {options.name}({options.price})
                        </Typography>
                      </Grid>
                    );
                  })}
                <Grid xs="12" container>
                  <Grid
                    xs="8"
                    justifyContent="right"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography variant="h6" fontWeight="bold" align="right">
                      {item.price}원
                    </Typography>
                  </Grid>

                  {/** 수량 */}
                  <Grid xs="1">
                    <IconButton
                      color="secondary"
                      onClick={() => minus(item.ordermenuId)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Grid>
                  <Grid
                    xs="2"
                    justifyContent="center"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography align="center" fontWeight="bold">
                      {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid xs="1">
                    <IconButton
                      color="secondary"
                      onClick={() => plus(item.ordermenuId)}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Grid>
                  <Grid
                    xs="12"
                    sx={{ borderBottom: 1, borderColor: 'grey.500', mt: 1.5 }}
                  ></Grid>
                </Grid>
              </Grid>
            );
          })}
        {loading === false && (
          <Grid xs="12" container sx={{ px: 2, pt: 3 }}>
            <Grid xs="6">
              <Typography variant="h6" fontWeight="bold">
                총 주문 금액
              </Typography>
            </Grid>
            <Grid xs="6" justifyContent="right">
              <Typography variant="h6" align="right">
                {parseInt(orderList.price) - parseInt(orderList.charge)}
              </Typography>
            </Grid>
            <Grid xs="6">
              <Typography variant="h6" fontWeight="bold">
                배달팁
              </Typography>
            </Grid>
            <Grid xs="6" justifyContent="right">
              <Typography variant="h6" align="right">
                {orderList.charge}
              </Typography>
            </Grid>
            <Grid
              xs="12"
              sx={{ borderBottom: 1, borderColor: 'grey.500', my: 3 }}
            ></Grid>
            <Grid xs="6">
              <Typography variant="h5" fontWeight="bold">
                결제 예정 금액
              </Typography>
            </Grid>
            <Grid xs="6" justifyContent="right">
              <Typography variant="h6" align="right">
                {parseInt(orderList.price)}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
        <Button
          fullWidth
          onClick={() => setOpen(true)}
          sx={{ backgroundColor: '#F2620F', height: '15vw' }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#FFFFFF' }}>
            주문하기
          </Typography>
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {/** 상단바영역 */}
      <Box
        position="fixed"
        sx={{
          flexGrow: 1,
          top: 0,
          left: 0,
          right: 0,
          borderBottom: 1,
          borderColor: 'grey.500',
        }}
      >
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                history.push('/main');
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              fontWeight="600"
              align="left"
            >
              장바구니
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
