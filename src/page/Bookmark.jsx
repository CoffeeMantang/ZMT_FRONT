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
import styles from '../css/Bookmark.module.css';

export default function Bookmark(props) {
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [resultList, setResultList] = useState();
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

  // api 호출
  const getBookmark = async (inputPage) => {
    try {
      setLoading(true);
      if (props.isLogin === true) {
        // 로그인 된 상태에서만
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios.get(
          `http://localhost:8080/member/bookmark/list?page=${inputPage}`,
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
        console.log(
          `http://localhost:8080/member/bookmark/list?page=${inputPage}`
        );
        if (inputPage === 0) {
          // 최초 호출시에만
          setBookmarkCount(response.data.count);
          setResultList(response.data.bookmarkList);
        } else {
          // 두번째 호출부터는 기존 리스트에 더해줌
          setResultList((prev) => [
            ...resultList,
            ...response.data.bookmarkList,
          ]);
        }
        if (response.data.bookmarkList.length < 10) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      }
    } catch (e) {
      throw new Error('Bookmark.jsx : getBookmark Error');
    }
  };

  useEffect(() => {
    props.setTop(false); // 기본 상단바를 비활성화
    if (props.isLogin === true) {
      getBookmark(0);
    } else {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    if (inView === true) {
      // 페이지 맨 아래로 스크롤했을때
      let curPage = page + 1;
      setPage(curPage);
      getBookmark(curPage); // 다음페이지 로드
    }
  }, [inView]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '77px' }}></div>
      <Grid container sx={{ px: 3, mt: 3 }}>
        {resultList !== undefined &&
          resultList !== null &&
          resultList.length > 0 &&
          resultList.map((item) => {
            return (
              <Grid container xs="12" sx={{ mt: 3 }}>
                <Grid xs="4" sx={{ height: '100%' }}>
                  <div className={styles.image_box}>
                    <img
                      src={`${item.thumb}`}
                      alt={item.name}
                      loading="lazy"
                      className={styles.image_thumbnail}
                    />
                  </div>
                </Grid>
                <Grid xs="8" container sx={{ pl: 2 }}>
                  <Grid xs="12">
                    <Typography fontWeight="bold" variant="h6">
                      {item.storeName}
                    </Typography>
                  </Grid>
                  <Grid xs="12">
                    <Typography
                      sx={{ fontsize: '1.3em' }}
                      onClick={() => history.push(`/store/${item.storeId}`)}
                    >
                      {item.score}
                      <StarIcon fontSize="inherit" sx={{ color: '#FFFF00' }} />
                    </Typography>
                  </Grid>
                  <Grid xs="12">
                    <Typography
                      sx={{
                        color: 'grey.500',
                        fontSize: '0.8em',
                      }}
                    >
                      {item.address1}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
      {resultList && !loading && !inView && <div ref={ref}>더보기</div>}
      <div style={{ height: '77px' }}></div>
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
              onClick={() => history.goBack()}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              fontWeight="600"
              align="left"
            >
              즐겨찾기
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: '100%', pl: 2.5, pb: 1, backgroundColor: 'white' }}>
          <Typography variant="h6" fontWeight="bold" color="secondary">
            총 {bookmarkCount}개
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
