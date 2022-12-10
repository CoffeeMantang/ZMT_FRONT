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
  Tabs,
  Tab,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useInView } from 'react-intersection-observer';
import styles from '../css/OrderList.module.css';
import WriteReview from './WriteReview';
import Orderlist from './Orderlist';

export default function Order(props) {
  const [value, setValue] = useState(0);

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

  const handleChange = (event, newValue) => {
    // 새로운 카테고리 선택
    console.log(`value는 ${newValue}`);
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        {/** slider */}
        <Grid xs="12">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} align="center">
            <Tabs
              aria-label="basic tabs example"
              onChange={handleChange}
              value={value}
              col
              selectionFollowsFocus
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="수락대기" />
              <Tab label="준비중" />
              <Tab label="완료" />
            </Tabs>
          </Box>
        </Grid>
      </Grid>
      <Orderlist
        isLogin={props.isLogin}
        setLogin={props.setLogin}
        value={value}
      />
    </ThemeProvider>
  );
}
