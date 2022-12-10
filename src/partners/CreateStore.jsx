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
} from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Main.module.css';
import { Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateStore1 from './CreateStore1';
import CreateStore2 from './CreateStore2';

export default function CreateStore(props) {
  const [form, setForm] = useState({
    storeName: '',
    category: 0,
    notice: '',
    tel: '',
    file: null,
    address1: '',
    address2: '',
    address3: '',
    addressX: 0.0,
    addressY: 0.0,
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

  const [create1, setCreate1] = useState(true);
  const [create2, setCreate2] = useState(false);
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
    props.setThisTop(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>

      {create1 && (
        <CreateStore1
          form={form}
          setForm={setForm}
          setCreate1={setCreate1}
          setCreate2={setCreate2}
        />
      )}
      {create2 && (
        <CreateStore2
          form={form}
          setForm={setForm}
          setCreate1={setCreate1}
          setCreate2={setCreate2}
          isLogin={props.isLogin}
        />
      )}

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
                      가게 등록
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
