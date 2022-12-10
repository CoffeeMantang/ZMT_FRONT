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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useInView } from 'react-intersection-observer';
import styles from '../css/OrderList.module.css';
import WriteReview from './WriteReview';

export default function OrderList(props) {
  const history = useHistory();

  const [ref, inView] = useInView(false); //
  const [resultList, setResultList] = useState();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isGet, setGet] = useState(false);
  const [review, setReview] = useState(false); // true가되면 리뷰 컴포넌트가 뜸
  const [storeName, setStoreName] = useState("0"); // 가게이름을 임시로 저장할 state
  const [orderlistId, setOrderlistId] = useState(""); // 오더리스트 아이디를 임시로 저장할 state

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

  // api 연결
  const getOrderlist = async (inputPage) => {
    if (props.isLogin === true) {
      setLoading(true);
      setGet(false);
      try {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios
          .get(
            `http://localhost:8080/orderlist/getOrderlist?page=${inputPage}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .catch((error) => {
            // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
            if (error.status === 403) {
              //로그인상태를 false로
              props.setLogin(false);
              history.push('/main');
            }
          });
        // 가져온 response 저장
        if (inputPage === 0) {
          // 처음 api 호출 시 그대로 저장
          setResultList(response.data.data);
        } else {
          if (response.data.data.length > 0) {
            setResultList((prev) => [...resultList, response.data.data]); // 아닌경우 합쳐서넣기
          }
        }
        if (response.data.data.length < 10) {
          // 넘어온 데이터 갯수가 10보다 작으면 새 페이지 로드하지 않도록
          setLoading(true);
        } else {
          setLoading(false);
        }
        setGet(true);
      } catch (e) {
        setLoading(true);
        setGet(true);
        throw new Error('OrderList.jsx : getOrderlist error');
      }
    }
  };

  // 컴포넌트 시작될때
  useEffect(() => {
    props.setTop(false); // 기본상단바 없애기
    setLoading(false);
    if (props.isLogin === true) {
      getOrderlist(0);
    } else {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    if (inView === true) {
      // 페이지 맨 아래로 스크롤했을때
      let curPage = page + 1;
      setPage(curPage);
      getOrderlist(curPage); // 다음페이지 로드
    }
  }, [inView]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      {/** 주문내역 띄워주기 */}
      {!review &&
        resultList !== null &&
        resultList !== undefined &&
        resultList.length > 0 &&
        resultList.map((item) => {
          return (
            item.state !== 0 && (
              <Grid
                container
                sx={{
                  px: 4,
                  mt: 4,
                }}
              >
                <Grid
                  container
                  xs="12"
                  sx={{
                    border: 1,
                    borderColor: 'grey.500',
                    borderRadius: 2,
                    px: 2,
                    py: 2,
                  }}
                >
                  <Grid container xs="12">
                    <Grid xs="7" container>
                      <Grid xs="12">
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          onClick={() => history.push(`/store/${item.storeId}`)}
                        >
                          {item.storeName}
                        </Typography>
                      </Grid>
                      <Grid xs="12" sx={{ pt: 0 }}>
                        <Typography sx={{ mt: 0, color: 'grey.500' }}>
                          {item.orderlistId}
                        </Typography>
                      </Grid>
                      <Grid xs="12" sx={{ pt: 0 }}>
                        <Typography sx={{ mt: 0, color: 'grey.500' }}>
                          {item.orderDate}
                        </Typography>
                      </Grid>
                      <Grid xs="12">
                        {item.state === 1 && <Typography>수락대기</Typography>}
                        {item.state === 2 && <Typography>주문수락</Typography>}
                        {item.state === 3 && <Typography>주문취소</Typography>}
                        {item.state === 4 && <Typography>배달완료</Typography>}
                        {item.state === 5 && <Typography>배달완료</Typography>}
                      </Grid>
                    </Grid>
                    <Grid xs="5" sx={{ height: '100%' }}>
                      <div className={styles.image_box}>
                        <img
                          src={`${item.thumb}`}
                          alt={item.name}
                          loading="lazy"
                          className={styles.image_thumbnail}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  {item.orderMenuDTOList !== null &&
                    item.orderMenuDTOList !== undefined &&
                    item.orderMenuDTOList.length > 0 &&
                    item.orderMenuDTOList.map((menuItem) => {
                      return (
                        <Grid xs="12" container sx={{ mt: 2 }}>
                          <Grid xs="9">
                            <Typography fontWeight="bold">
                              {menuItem.name}
                            </Typography>
                          </Grid>
                          <Grid xs="3">
                            <Typography fontWeight="bold">
                              {menuItem.quantity}개
                            </Typography>
                          </Grid>
                          {menuItem.orderOptionDTOS !== null &&
                            menuItem.orderOptionDTOS !== undefined &&
                            menuItem.orderOptionDTOS.length > 0 &&
                            menuItem.orderOptionDTOS.map((optionItem) => {
                              return (
                                <Grid xs="12" sx={{ pl: 3 }}>
                                  <Typography>{optionItem.name}</Typography>
                                </Grid>
                              );
                            })}
                          <Grid xs="12">
                            <Typography>{menuItem.price}원</Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  <Grid xs="8" sx={{ mt: 2 }}>
                    <Typography>배달비 : {item.charge}</Typography>
                  </Grid>
                  {item.canReview === 1 && (
                    <Grid xs="4" sx={{ mt: 2 }}>
                      <Typography
                        color="secondary"
                        textAlign="right"
                        onClick={() => {
                          setOrderlistId(item.orderlistId); // 임시로 orderlistId를 넣음
                          setStoreName(item.storeName) // 임시로 storeName를 넣음
                          setReview(true); // 리뷰페이지가 뜨도록 함
                        }}
                      >
                        <b>리뷰쓰기</b>
                      </Typography>
                    </Grid>
                  )}
                  <Grid xs="12" align="center" sx={{ mt: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {parseInt(item.price) + parseInt(item.charge)}원 결제완료
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )
          );
        })}
      {/** 리뷰작성페이지 */}
      {review && (
        <WriteReview
          login={props.login}
          setLogin={props.setLogin}
          orderlistId={orderlistId}
          storeName={storeName}
        />
      )}
      {/** 무한로딩 관리용 div */}
      {resultList && !loading && !inView && (
        <div ref={ref}>
          <Typography>로딩중</Typography>
        </div>
      )}
      <div style={{ height: '57px' }}></div>
      <div style={{ height: '57px' }}></div>
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
                props.setBottomPage(0);
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
              주문내역
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
