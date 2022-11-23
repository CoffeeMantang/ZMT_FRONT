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
import Paper from '@mui/material/Paper';

export default function Category(props) {
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
    // 컴포넌트 로드될때
    props.setTop(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      <Grid container>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/hansik.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/1')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            한식
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/jungsik.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/2')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            중식
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/yangsik.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/3')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            양식
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/asian.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/4')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            아시안
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/ilsik.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/5')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            일식
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/dessert.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/6')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            디저트
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/cafe.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/7')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            카페
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/fastfood.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/8')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            패스트푸드
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/chicken.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/9')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            치킨
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/pizza.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/10')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            피자
          </Typography>
        </Grid>
        <Grid
          xs="12"
          sx={{
            backgroundImage: `url('../images/bunsik.jpg')`,
            height: '30vw',
            display: 'flex',
            alignItems: 'center',
            mb: 0.5,
          }}
          alignContent="center"
          align="center"
          justifyContent="center"
          onClick={() => history.push('/categorySearch/11')}
        >
          <Typography
            sx={{ color: 'white' }}
            textAlign="center"
            align="center"
            variant="h4"
            fontWeight="bold"
          >
            분식
          </Typography>
        </Grid>
      </Grid>
      <div style={{ height: '57px' }}></div>
    </ThemeProvider>
  );
}
