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
  ListItemButton,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useInView } from 'react-intersection-observer';
import styles from '../css/OrderList.module.css';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import Slider from 'react-slick';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MyPage(props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    arrows: false,
  };
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [nickname, setNickname] = useState();
  const [tel, setTel] = useState();

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

  // api???????????? ???????????? ????????????
  const getMemberInfo = async () => {
    if (props.isLogin === true) {
      try {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios.get(
          `http://localhost:8080/member/getinfo`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ).catch(error => {
          // ?????? ??? status??? 403?????? ???????????? ?????? token ????????? ????????????????????? ?????? ???????????? ??????????????? false???
          if (error.status === 403) {
            //?????????????????? false???
            props.setLogin(false);
            history.push("/main");
          }
        });
        setNickname(response.data.nickname);
        setTel(response.data.tel);
      } catch (e) {
        throw new Error('MyPage.jsx : getMemberInfo');
      }
    }
  };

  useEffect(() => {
    props.setTop(false);
    if (props.isLogin === true) {
      getMemberInfo();
    } else {
      history.push('/login');
    }
  }, []);

  return (
    <Box sx={{ p: 0, m: 0, width: '100%' }}>
      <Grid container sx={{ px: 3, my: 5, mx: 0 }}>
        <Grid xs="12">
          <Typography variant="h4" fontWeight="bold">
            {nickname}
          </Typography>
        </Grid>
        <Grid xs="12">
          <Typography variant="h6" sx={{ color: 'grey.500' }}>
            {tel}
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{ p: 0, m: 0, width: '100%' }}>
        <Slider {...settings} arrows={false}>
          <div className={styles.image_banner}>
            <img
              src={'../images/banner1.png'}
              className={styles.image_thumbnail}
            />
          </div>
          <div className={styles.image_banner}>
            <img
              src={'../images/banner2.png'}
              className={styles.image_thumbnail}
            />
          </div>
          <div className={styles.image_banner}>
            <img
              src={'../images/banner3.png'}
              className={styles.image_thumbnail}
            />
          </div>
        </Slider>
      </Grid>
      <List sx={{ px: 2 }}>
        <ListItemButton sx={{ mt: 1 }} onClick={() => history.push('/address')}>
          <ListItemIcon fontSize="large">
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="????????????"></ListItemText>
        </ListItemButton>
        <ListItemButton sx={{ mt: 1 }}>
          <ListItemIcon>
            <FavoriteBorderIcon />
          </ListItemIcon>
          <ListItemText
            primary="????????????"
            onClick={() => history.push('/bookmark')}
          ></ListItemText>
        </ListItemButton>

        <ListItemButton sx={{ mt: 1 }}>
          <ListItemIcon>
            <QuestionMarkIcon />
          </ListItemIcon>
          <ListItemText
            primary="???????????? ??????"
            onClick={() => history.push('/question')}
          ></ListItemText>
        </ListItemButton>
        <ListItemButton sx={{ mt: 1 }}>
          <ListItemIcon>
            <CallIcon />
          </ListItemIcon>
          <ListItemText
            primary="????????????"
            onClick={() => history.push('/help')}
          ></ListItemText>
        </ListItemButton>

        <ListItemButton
          sx={{ mt: 1 }}
          onClick={() => {
            props.setLogin(false);
            localStorage.removeItem('ACCESS_TOKEN');
            history.push('/main');
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="????????????"></ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
}
