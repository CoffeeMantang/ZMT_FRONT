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
  Tabs,
  Tab,
} from '@mui/material';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Main.module.css';
import { Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateStore1 from './CreateStore1';
import TimePick from './TimePick';

export default function EditStoreInfo(props) {
  const [value, setValue] = useState(0); // 요일 선택을 위한 state
  const [form, setForm] = useState({
    openTime1: null,
    openTime2: null,
    openTime3: null,
    openTime4: null,
    openTime5: null,
    openTime6: null,
    openTime7: null,
    closeTime1: null,
    closeTime2: null,
    closeTime3: null,
    closeTime4: null,
    closeTime5: null,
    closeTime6: null,
    closeTime7: null,
    breakTimeStart1: null,
    breakTimeStart2: null,
    breakTimeStart3: null,
    breakTimeStart4: null,
    breakTimeStart5: null,
    breakTimeStart6: null,
    breakTimeStart7: null,
    breakTimeEnd1: null,
    breakTimeEnd2: null,
    breakTimeEnd3: null,
    breakTimeEnd4: null,
    breakTimeEnd5: null,
    breakTimeEnd6: null,
    breakTimeEnd7: null,
  });
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

  const theme2 = createTheme({
    typography: {
      fontFamily: 'NanumSquareNeo-Variable',
    },
    palette: {
      primary: {
        main: '#000000',
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

  const storeId = useParams().storeId; // 주소에서 가게의 아이디 가져옴

  // 다른 탭을 눌렀을 때 이벤트
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 지금까지 모은 내용을 서버에 전송하는 함수
  const create = async () => {
    if (props.isLogin === true) {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      console.log(form);
      const response2 = await axios
        .post(
          `http://localhost:8080/partners/store/updateinfo`,
          { ...form, storeId: storeId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(history.push(`/partners/store/${storeId}`));
    }
  };

  // 백엔드에서 기존에 입력된 정보를 가져오기
  const fetchInfo = async () => {
    if (props.isLogin === true) {
      const response = await axios.get(
        `http://localhost:8080/nonmember/store/info?storeId=${storeId}`
      );
      console.log(response);
      setForm({
        ...form,
        ...{
          openTime1: response.data.openTime1,
          openTime2: response.data.openTime2,
          openTime3: response.data.openTime3,
          openTime4: response.data.openTime4,
          openTime5: response.data.openTime5,
          openTime6: response.data.openTime6,
          openTime7: response.data.openTime7,
          closeTime1: response.data.closeTime1,
          closeTime2: response.data.closeTime2,
          closeTime3: response.data.closeTime3,
          closeTime4: response.data.closeTime4,
          closeTime5: response.data.closeTime5,
          closeTime6: response.data.closeTime6,
          closeTime7: response.data.closeTime7,
          breakTimeStart1: response.data.breakTimeStart1,
          breakTimeStart2: response.data.breakTimeStart2,
          breakTimeStart3: response.data.breakTimeStart3,
          breakTimeStart4: response.data.breakTimeStart4,
          breakTimeStart5: response.data.breakTimeStart5,
          breakTimeStart6: response.data.breakTimeStart6,
          breakTimeStart7: response.data.breakTimeStart7,
          breakTimeEnd1: response.data.breakTimeEnd1,
          breakTimeEnd2: response.data.breakTimeEnd2,
          breakTimeEnd3: response.data.breakTimeEnd3,
          breakTimeEnd4: response.data.breakTimeEnd4,
          breakTimeEnd5: response.data.breakTimeEnd5,
          breakTimeEnd6: response.data.breakTimeEnd6,
          breakTimeEnd7: response.data.breakTimeEnd7,
        },
      });
    }
  };

  useEffect(() => {
    props.setThisTop(false); // 상단바 비활성화
    fetchInfo();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
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
          <Tab label="월" />
          <Tab label="화" />
          <Tab label="수" />
          <Tab label="목" />
          <Tab label="금" />
          <Tab label="토" />
          <Tab label="일" />
        </Tabs>
      </Box>
      <TimePick value={value} form={form} setForm={setForm} />
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '15vw',
        }}
        color="secondary"
      >
        <Button
          fullWidth
          sx={{ backgroundColor: '#F2620F', height: '100%' }}
          onClick={() => {
            console.log(form);
            create();
          }}
        >
          <Typography color="primary">제출</Typography>
        </Button>
      </Box>
      {/** 상단바 영역 */}
      <Box
        position="fixed"
        sx={{ flexGrow: 1, top: 0, left: 0, right: 0, m: 0, p: 0 }}
      >
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <Grid container>
                  <Grid xs="4">
                    <IconButton
                      size="middle"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => history.push('/partners/main')}
                      color="inherit"
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </Grid>
                  <Grid xs="4" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href=""
                      fontWeight="bold"
                      sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        textAlign: 'center',
                        color: '#000000',
                      }}
                    >
                      가게 수정
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
