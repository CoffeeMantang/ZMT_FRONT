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
import styles from '../css/StoreInfo.module.css';
import Paper from '@mui/material/Paper';

export default function StoreInfo(props) {
  const storeId = useParams().storeId;
  const history = useHistory();

  const [result, setResult] = useState();

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

  // 가게정보 가져오기
  const getResult = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/nonmember/store/info?storeId=${storeId}`
      );
      setResult(response.data);
    } catch (e) {
      new Error('getResult error');
    }
  };

  useEffect(() => {
    props.setTop(false);
    props.setBottom(false);
    getResult();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      {result !== null && result !== undefined ? (
        <Grid container>
          <Grid xs="12" sx={{ mb: 3 }}>
            <div className={styles.image_box}>
              <img
                src={`${result.thumb}`}
                alt={result.storeName}
                loading="lazy"
                className={styles.image_thumbnail}
              />
            </div>
          </Grid>
          <Grid xs="12" sx={{ mx: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              {result.storeName}
            </Typography>
          </Grid>
          <Grid xs="12" sx={{ mb: 3, mx: 3 }}>
            <Typography>{`${result.address1} ${result.address2}`}</Typography>
            <Typography color="secondary">{result.tel}</Typography>
          </Grid>
          {/** 영업시간 */}
          <Grid xs="12" sx={{ mx: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              영업시간
            </Typography>
          </Grid>
          <Grid xs="12" sx={{ mb: 3, mx: 3 }}>
            {result.openTime1 !== null && result.openTime1 !== undefined && (
              <Typography>
                월요일: {result.openTime1} ~ {result.closeTime1}
              </Typography>
            )}
            {result.openTime2 !== null && result.openTime2 !== undefined && (
              <Typography>
                화요일: {result.openTime2} ~ {result.closeTime2}
              </Typography>
            )}
            {result.openTime3 !== null && result.openTime3 !== undefined && (
              <Typography>
                수요일: {result.openTime3} ~ {result.closeTime3}
              </Typography>
            )}
            {result.openTime4 !== null && result.openTime4 !== undefined && (
              <Typography>
                목요일: {result.openTime4} ~ {result.closeTime4}
              </Typography>
            )}
            {result.openTime5 !== null && result.openTime5 !== undefined && (
              <Typography>
                금요일: {result.openTime5} ~ {result.closeTime5}
              </Typography>
            )}
            {result.openTime6 !== null && result.openTime6 !== undefined && (
              <Typography>
                토요일: {result.openTime6} ~ {result.closeTime6}
              </Typography>
            )}
            {result.openTime7 !== null && result.openTime7 !== undefined && (
              <Typography>
                일요일: {result.openTime7} ~ {result.closeTime7}
              </Typography>
            )}
          </Grid>
          {/** 쉬는시간 */}
          <Grid xs="12" sx={{ mx: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              쉬는시간
            </Typography>
          </Grid>
          <Grid xs="12" sx={{ mb: 3, mx: 3 }}>
            {result.breakTimeStart1 !== null &&
              result.breakTimeEnd1 !== undefined && (
                <Typography>
                  월요일: {result.breakTimeStart1} ~ {result.breakTimeEnd1}
                </Typography>
              )}
            {result.breakTimeStart2 !== null &&
              result.breakTimeEnd2 !== undefined && (
                <Typography>
                  화요일: {result.breakTimeStart2} ~ {result.breakTimeEnd2}
                </Typography>
              )}
            {result.breakTimeStart3 !== null &&
              result.breakTimeEnd3 !== undefined && (
                <Typography>
                  수요일: {result.breakTimeStart3} ~ {result.breakTimeEnd3}
                </Typography>
              )}
            {result.breakTimeStart4 !== null &&
              result.breakTimeEnd4 !== undefined && (
                <Typography>
                  목요일: {result.breakTimeStart4} ~ {result.breakTimeEnd4}
                </Typography>
              )}
            {result.breakTimeStart5 !== null &&
              result.breakTimeEnd5 !== undefined && (
                <Typography>
                  금요일: {result.breakTimeStart5} ~ {result.breakTimeEnd5}
                </Typography>
              )}
            {result.breakTimeStart6 !== null &&
              result.breakTimeEnd6 !== undefined && (
                <Typography>
                  토요일: {result.breakTimeStart6} ~ {result.breakTimeEnd6}
                </Typography>
              )}
            {result.breakTimeStart7 !== null &&
              result.breakTimeEnd7 !== undefined && (
                <Typography>
                  일요일: {result.breakTimeStart7} ~ {result.breakTimeEnd7}
                </Typography>
              )}
          </Grid>
          {/** 매장소개 (notice) */}
          <Grid xs="12" sx={{ mx: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              매장소개
            </Typography>
          </Grid>
          <Grid xs="12" sx={{ mb: 10, mx: 3 }}>
            <Typography>{result.notice}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography>로딩중</Typography>
      )}

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
              매장정보
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
