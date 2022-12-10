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
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Divider,
  Checkbox,
  useIsFocusVisible,
} from '@mui/material';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/CreateStore.module.css';
import { Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

export default function AddOption(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
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

  const menuId = useParams().menuId; // 주소에서 가게의 아이디 가져옴

  // 옵션추가 api 연결
  const addOption = async () => {
    if (props.isLogin === true) {
      console.log('옵션추가 api 시작...');
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.post(
        `http://localhost:8080/partners/store/menu/option/add`,
        {
          menuId: menuId,
          optionName: name,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
  };

  useEffect(() => {
    props.setThisTop(false); // 상단바 비활성화
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      <Grid container sx={{ px: 3, mt: 3 }}>
        <Grid xs="12">
          <Typography variant="h6">옵션 이름</Typography>
        </Grid>
        <Grid xs="12">
          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid xs="12" sx={{ mt: 2 }}>
          <Typography variant="h6">가격</Typography>
        </Grid>
        <Grid xs="12">
          <TextField
            fullWidth
            size="small"
            value={price}
            onChange={(e) => {
              const regex = /^[0-9\b]+$/;
              if (e.target.value === '' || regex.test(e.target.value)) {
                setPrice(e.target.value);
              }
            }}
          ></TextField>
        </Grid>
        <Grid xs="12" sx={{ mt: 3, mb: 5 }}>
          <Button
            fullWidth
            sx={{ backgroundColor: '#F2620F', border: 1 }}
            onClick={() => addOption()}
          >
            <Typography>옵션 생성</Typography>
          </Button>
        </Grid>
      </Grid>
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
                      onClick={() => history.goBack()}
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
                      옵션 추가
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
