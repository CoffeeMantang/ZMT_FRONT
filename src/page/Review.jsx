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
import styles from '../css/Review.module.css';

export default function Review(props) {
  const [ref, inView] = useInView(); //
  const [resultList, setResultList] = useState();
  const [storeName, setStoreName] = useState('로딩중');
  const [score, setScore] = useState(5);
  const [reviewCount, setReviewCount] = useState(0.0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
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
  let storeId = useParams().storeId;

  // 리뷰목록 가져오는 api
  const getReviewList = async (inputPage) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/nonmember/review?storeId=${encodeURIComponent(
          storeId
        )}&page=${inputPage}`
      );
      console.log(
        `http://localhost:8080/nonmember/review?storeId=${encodeURIComponent(
          storeId
        )}&page=${inputPage}`
      );
      setStoreName(response.data.name); // 가게명
      setScore(response.data.score); // 평점
      setReviewCount(response.data.reviewCount); // 리뷰갯수
      if (inputPage === 0) {
        setResultList(response.data.reviewList);
      } else {
        if (response.data.reviewList.length > 0) {
          setResultList((prevState) => [
            ...resultList,
            ...response.data.reviewList,
          ]);
        }
      }
      if (response.data.reviewList.length < 1) {
        setLoading(true); // 더이상 리뷰가 없으면 더 로드되지 않도록 loading을 true로 고정
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(true); // 에러뜨는 경우 더이상 로드할게 없는것으로 간주
      throw new Error('Review.jsx : getReviewList 실패');
    }
  };

  useEffect(() => {
    getReviewList(0); // 컴포넌트가 로드될때 1페이지 가져옴
  }, []);

  useEffect(() => {
    if (inView === true) {
      // 페이지 맨 아래로 스크롤했을때
      let curPage = page + 1;
      setPage(curPage);
      getReviewList(curPage); // 다음페이지 로드
    }
  }, [inView]);

  return (
    <ThemeProvider theme={theme}>
      {/** 리뷰평점 및 개수 */}
      <div style={{ height: '57px' }}></div>
      <Grid container sx={{ px: 4, mt: 2 }}>
        <Grid xs="4" sx={{ height: '100%' }}>
          <Typography variant="h3">{score}</Typography>
        </Grid>
        <Grid xs="8" container align="left">
          <Grid xs="12">
            {score > 4 && <StarIcon sx={{ color: '#FFFF00' }} />}
            {score > 3 && <StarIcon sx={{ color: '#FFFF00' }} />}
            {score > 2 && <StarIcon sx={{ color: '#FFFF00' }} />}
            {score > 1 && <StarIcon sx={{ color: '#FFFF00' }} />}
            {score > 0 && <StarIcon sx={{ color: '#FFFF00' }} />}
          </Grid>
          <Grid xs="12">
            <Typography>리뷰 {reviewCount}개</Typography>
          </Grid>
        </Grid>
      </Grid>
      {/** 리뷰리스트 */}
      {resultList !== null &&
        resultList !== undefined &&
        resultList.length > 0 &&
        resultList.map((item) => {
          return (
            <Grid container sx={{ px: 4, mt: 3 }}>
              <Grid xs="12">
                <Typography variant="h6">{item.nickname}</Typography>
              </Grid>
              <Grid xs="12" container>
                {item.score > 4 && <StarIcon sx={{ color: '#FFFF00' }} />}
                {item.score > 3 && <StarIcon sx={{ color: '#FFFF00' }} />}
                {item.score > 2 && <StarIcon sx={{ color: '#FFFF00' }} />}
                {item.score > 1 && <StarIcon sx={{ color: '#FFFF00' }} />}
                {item.score > 0 && <StarIcon sx={{ color: '#FFFF00' }} />}
                {item.score === 0 && (
                  <Grid xs="12">
                    <StarIcon color={'grey'} />
                    <StarIcon color={'grey'} />
                    <StarIcon color={'grey'} />
                    <StarIcon color={'grey'} />
                    <StarIcon color={'grey'} />
                  </Grid>
                )}
              </Grid>

              <Grid xs="12" sx={{ mt: 0.5 }}>
                <div className={styles.image_box}>
                  <img
                    src={`${item.thumb}`}
                    alt={item.name}
                    loading="lazy"
                    className={styles.image_thumbnail}
                  />
                </div>
              </Grid>
              <Grid xs="12" sx={{ mt: 1 }}>
                <Typography sx={{ fontSize: '10' }}>{item.title}</Typography>
              </Grid>
              <Grid
                xs="12"
                sx={{ px: 3, mt: 3, borderBottom: 1, borderColor: 'grey.500' }}
              ></Grid>
            </Grid>
          );
        })}
      {resultList && !loading && !inView && <div ref={ref}>더보기</div>}
      <Box sx={{ height: '50vw', width: '100%' }} />
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
              {storeName} 리뷰
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
