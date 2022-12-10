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
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Main.module.css';
import { Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateStore1 from './CreateStore1';
import TimePick from './TimePick';

export default function CreateStore2(props) {
  const [value, setValue] = useState(0); // 요일 선택을 위한 state
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

  // 다른 탭을 눌렀을 때 이벤트
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 지금까지 모은 내용을 서버에 전송하는 함수
  const create = async () => {
    if (props.isLogin === true) {
      const fd = new FormData();
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      // 파일 데이터 저장
      Object.values(props.form.file).forEach((file) => {
        fd.append('file', file);
      });
      fd.set('name', props.form.storeName);
      fd.set('category', props.form.category);
      fd.set('notice', props.form.notice);
      fd.set('tel', props.form.tel);
      fd.set('address1', props.form.address1);
      fd.set('address2', props.form.address2 + ' ' + props.form.address3);
      fd.set('addressX', props.form.addressX);
      fd.set('addressY', props.form.addressY);
      console.log(fd);
      const response = await axios
        .post(`http://localhost:8080/partners/store/create`, fd, {
          headers: {
            'Content-Type': `multipart/form-data; `,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .catch(console.log('가게생성실패'))
        .then(async (response) => {
          const response2 = await axios
            .post(
              `http://localhost:8080/partners/store/addinfo`,
              { ...props.form, storeId: response.data.error },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then(history.push('/partners/main'));
        });
    }
  };

  return (
    <Box>
      <ThemeProvider theme={theme2}>
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
        <TimePick value={value} form={props.form} setForm={props.setForm} />
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
              console.log(props.form);
              create();
            }}
          >
            <Typography color="primary">제출</Typography>
          </Button>
        </Box>
      </ThemeProvider>
    </Box>
  );
}
