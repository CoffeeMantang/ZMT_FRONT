import React, { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
  TextField,
  Button,
  Input,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../css/Search.module.css';

export default function Search(props) {
  const [searchList, setSearchList] = useState(false); // 최근검색어
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

  // 폼 제출시 해당 내용을 주소 뒤에 붙여 라우팅
  const findStore = async (event) => {
    try {
      const data = new FormData(event.target);
      const keyword = data.get('keyword');
      history.push(`/searchResult/${keyword}`);
    } catch (e) {
      props.setBottomPage(0);
      history.push('/main');
      throw new Error('Search에서 findStore 오류 발생~');
    }
  };
  let count = 1;
  // 최근검색어 가져오기
  const getSearchList = async () => {
    if (props.isLogin === true) {
      try {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios.get(
          `http://localhost:8080/member/getSearchList`,
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
        setSearchList(response.data.data);
      } catch (e) {
        props.setLogin(false);
        history.push('/login');
        throw new Error('Search의 getSearchList 에러');
      }
    }
  };

  useEffect(() => {
    props.setTop(false); // 컴포넌트가 실행되면 상단바를 없앰
    count = 1;
    getSearchList();
  }, []);

  const plus = () => {
    count++;
  };

  const searchListHandler = (keyword) => {
    console.log('searchListHandler 작동');
    console.log(`keyword: ${keyword}`);
    history.push(`/searchResult/${keyword}`);
  };

  return (
    <ThemeProvider theme={theme}>
      {/** 상단바 */}
      <Box
        position="fixed"
        component="form"
        noValidate
        onSubmit={findStore}
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
            <Box
              align="center"
              justifyContent="center"
              sx={{
                width: '50vw',
                height: '2rem',
                borderRadius: '30px',
                flexGrow: 1,
                border: 2,
                borderColor: 'grey.500',
                pt: '0',
                m: 'auto',
              }}
            >
              <Input
                type="text"
                required
                id="keyword"
                name="keyword"
                autoComplete="검색어입력"
                autoFocus
                disableUnderline
              ></Input>
            </Box>
            <IconButton
              size="large"
              edge="end"
              color="secondary"
              aria-label="menu"
              type="submit"
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ height: '57px' }}></div>
      <Grid container sx={{ px: 3, mt: 3, mb: 3 }}>
        <Grid item xs="7">
          <Typography variant="h6" fontWeight="bold">
            최근검색어
          </Typography>
        </Grid>
        <Grid
          item
          xs="5"
          justifyContent="center"
          sx={{ m: 'auto', p: 'auto' }}
          align="right"
        >
          <Typography variant="h7" align="right">
            전체삭제
          </Typography>
        </Grid>
      </Grid>
      {/** 최근검색어 리스트 */}
      {searchList && (
        <Grid container sx={{ px: 3 }}>
          {searchList.map((item) => {
            return (
              <Grid container xs="12" sx={{ mt: 1 }}>
                <Grid
                  xs="1"
                  item
                  justifyContent="center"
                  sx={{ m: 'auto', p: 'auto' }}
                  align="left"
                >
                  <Typography color="secondary">{count}</Typography>
                </Grid>
                <Grid
                  xs="11"
                  item
                  justifyContent="center"
                  sx={{ m: 'auto', p: 'auto' }}
                  align="left"
                  name={item.search}
                >
                  <Typography
                    variant="h6"
                    onClick={() => searchListHandler(item.search)}
                    name={item.search}
                  >
                    {item.search}
                  </Typography>
                </Grid>
                <Grid xs="12" sx={{ mt: 1 }}>
                  <Divider variant="fullWidth" />
                </Grid>
                {plus()}
              </Grid>
            );
          })}
        </Grid>
      )}
    </ThemeProvider>
  );
}
