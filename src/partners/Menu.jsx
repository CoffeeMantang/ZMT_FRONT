import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from '../css/Menu.module.css';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Divider,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';

export default function Menu(props) {
  const [menu, setMenu] = useState();
  const [optionList, setOptionList] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const menuId = useParams().menuId;

  let dto = {
    // 서버에 보내줄 dto
    menuId: parseInt(menuId),
    orderOptionDTOS: [],
    quantity: 1,
    price: 0,
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'NanumSquareNeo-Variable',
    },
    palette: {
      primary: {
        main: '#F2620F',
      },
      secondary: {
        main: '#FFFFFF',
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

  const history = useHistory();

  // 서버에서 메뉴정보 받아오기
  const getMenuInfo = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8080/nonmember/menu/info?menuId=${menuId}`
    );
    setMenu(response.data);
    setLoading(false);
    getOptionList();
    dto.price = response.data.price;
  };

  // 서버에서 옵션리스트 받아오기
  const getOptionList = async () => {
    const response = await axios.get(
      `http://localhost:8080/nonmember/store/option?menuId=${menuId}`
    );
    setOptionList(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    setLoading(true);
    getMenuInfo();
  }, []);

  function getKeyByValue(obj, value) {
    return Object.keys(obj).find((key) => obj[key].optionId === value);
  }

  const checkHandle = (event) => {
    if (props.isLogin === true) {
      // 로그인 한 상태이면
      if (event.target.checked === true) {
        // 체크되었으면 백엔드에 넘길 DTO에 아이디 추가
        let temp = {
          optionId: event.target.value,
        };
        dto.orderOptionDTOS.push(temp);
      } else {
        // 체크를 풀었으면 해당 내용을 pop 해버리기
        let key = getKeyByValue(dto.orderOptionDTOS, event.target.value);
        dto.orderOptionDTOS.pop(key);
      }
    }
    console.log(dto.orderOptionDTOS);
  };

  // 장바구니에 추가하기
  const putOrderList = async () => {
    console.log('장바구니에 추가하기 발동');
    if (props.isLogin === true) {
      try {
        console.log(dto);
        console.log('를 보낼게요');
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios
          .post(`http://localhost:8080/orderlist/addbasket`, dto, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .catch((error) => {
            // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
            if (error.status === 403) {
              //로그인상태를 false로
              props.setLogin(false);
              history.push('/main');
            }
          });
        setOpen(true);
      } catch (e) {
        throw new Error('putOrderList Error!');
      }
    }
  };

  // 옵션 삭제
  const delOption = async (id) => {
    if (props.isLogin === true) {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.delete(
        `http://localhost:8080/partners/store/menu/option/delete?optionId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getMenuInfo();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading === false && (
        <Grid container>
          <Grid xs="12">
            <div className={styles.image_banner}>
              <img src={menu.menuPic} className={styles.image_thumbnail} />
            </div>
          </Grid>
          <Grid xs="12" sx={{ mb: 5, mt: 3, px: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              {menu.menuName}
            </Typography>
          </Grid>
          <Grid xs="12" sx={{ px: 3 }}>
            <Typography>{menu.notice}</Typography>
          </Grid>
          <Grid xs="6" sx={{ px: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              가격
            </Typography>
          </Grid>
          <Grid xs="6" sx={{ px: 3 }} justifyContent="right">
            <Typography variant="h5" fontWeight="bold" textAlign="right">
              {menu.price}원
            </Typography>
          </Grid>
          <Grid xs="12">
            <Divider />
          </Grid>
          {/** 옵션들 */}
          {optionList !== null &&
            optionList !== undefined &&
            optionList.length > 0 && (
              <Grid xs="12" sx={{ px: 3 }}>
                <Grid xs="12" sx={{ mt: 3 }}>
                  <Typography variant="h5" fontWeight="bold">
                    추가선택
                  </Typography>
                </Grid>
                <List sx={{ m: 0, p: 0 }}>
                  {optionList.map((item) => {
                    return (
                      <List>
                        <ListItemButton sx={{ m: 0, p: 0 }}>
                          <ListItemIcon>
                            <Checkbox
                              id={item.optionId}
                              value={item.optionId}
                              onChange={checkHandle}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.optionName}
                          ></ListItemText>
                        </ListItemButton>
                        <ListItemButton
                          onClick={() => delOption(item.optionId)}
                        >
                          <ListItemText primary="삭제하기"></ListItemText>
                        </ListItemButton>
                      </List>
                    );
                  })}
                </List>
              </Grid>
            )}
        </Grid>
      )}
      {props.isLogin === true && (
        <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
          <Button
            fullWidth
            onClick={() => putOrderList()}
            sx={{ backgroundColor: '#F2620F', height: '15vw' }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: '#FFFFFF' }}
            >
              장바구니에 추가
            </Typography>
          </Button>
        </Box>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          장바구니에 추가되었습니다!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
