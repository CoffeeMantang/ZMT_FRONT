import React, { useState, useEffect } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { KAKAO_API_KEY } from '../kakaoKey';

export default function NewAddress(props) {
  const history = useHistory();
  const [openPostcode, setOpenPostcode] = React.useState(false);
  const [mainAddress, setMainAddress] = useState(''); // 메인 주소를 설정하기 위한 state
  const [subAddress, setSubAddress] = useState('');
  const [addressX, setAddressX] = useState(0.0);
  const [addressY, setAddressY] = useState(0.0);
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

  // handler
  const handle = {
    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
            autoJibunAddress: ${data.autoJibunAddress}
        `);
      setMainAddress(data.sido + ' ' + data.sigungu + ' ' + data.bname);
      setSubAddress(data.query);
      setOpenPostcode(false);
      prepareAddress(data.autoJibunAddress);
    },
  };
  const goMain = () => {
    props.setBottomPage(0);
    history.push('/main');
  };

  //주소 등록하기 전 준비
  const prepareAddress = async (jibun) => {
    if (props.isLogin === true) {
      // 로그인 된 상태면 주소등록 수행
      try {
        // 1. 카카오 api 연결해서 지번주소로 좌표값 가져오기
        const response = await axios
          .get(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
              jibun
            )}&page=1&size=1`,
            {
              headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`,
              },
            }
          )
          .catch((error) => {
            // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
            if (error.status === 403) {
              //로그인상태를 false로
              props.setLogin(false);
              history.push('/main');
            }
          });
        console.log('response.data는? ');
        console.log(response.data.documents);
        setAddressX(parseFloat(response.data.documents[0].road_address.x)); // x좌표 추출
        setAddressY(parseFloat(response.data.documents[0].road_address.y)); // y좌표 추출
        console.log(`좌표 받아오기 성공! x:${addressX} y:${addressY}`);
      } catch (e) {
        throw new Error('NewAddress.jsx에서 prepare address 오류 발생');
      }
    } else {
      // 로그인 된 상태가 아니면 로그인페이지로 이동
      history.push('/login');
    }
  };

  // 입력된 정보를 서버에 업로드 -> form 제출시
  const addAddress = async (event) => {
    try {
      if (props.isLogin === true) {
        const data = new FormData(event.target);
        const nickname = data.get('nickname');
        if (data.get('nickname') === undefined) {
          nickname = null;
        }
        const address2 = data.get('address2');
        const req = {
          // 서버에 전달할 JSON
          nickname: nickname,
          address1: `${mainAddress}`,
          address2: `${subAddress} ${address2}`,
          addressX: addressX,
          addressY: addressY,
        };
        console.log(`address2는 ${subAddress} ${address2}`);
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        // 연결시작
        console.log('서버에 주소정보 전송 시작');
        const response = await axios
          .post(`http://localhost:8080/member/newaddress`, req, {
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
        if (response.data.error === 'ok') {
          history.push('/address');
        } else {
          console.log('서버에 주소정보 전송 오류');
        }
      } else {
        // 로그인 안된 경우
        props.setLogin(false);
        history.push('/login');
      }
    } catch (e) {
      props.setLogin(false);
      history('/login');
      throw new Error('NewAddress 에서 addAddress 에러');
    }
  };

  //컴포넌트가 로드될 때 로그인 체크
  useEffect(() => {
    if (props.isLogin === false) {
      history.push('/login');
    } else {
      setOpenPostcode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => goMain()}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              fontWeight="600"
              align="left"
            >
              주소관리
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        {openPostcode && (
          <DaumPostcodeEmbed
            onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="서부로 545" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        )}
        {!openPostcode && (
          <Grid container sx={{ mt: 3 }}>
            <Grid xs="12" sx={{ mt: 3, px: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                {mainAddress} {subAddress}
              </Typography>
            </Grid>
            {/** form */}
            <Grid container noValidate sx={{ mt: 3, px: 3 }} xs="12">
              <Box
                component="form"
                sx={{ width: '100%' }}
                align="center"
                onSubmit={addAddress}
              >
                <Typography variant="h7" justifyContent="left">
                  주소지 별명
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="닉네임"
                  label="닉네임"
                  name="nickname"
                  autoComplete="nickname"
                  autoFocus
                  color="secondary"
                  sx={{ my: 3, p: 0 }}
                />
                <Typography variant="h7">세부주소</Typography>
                <TextField
                  required
                  fullWidth
                  id="address2"
                  label="세부주소"
                  name="address2"
                  autoComplete="address2"
                  autoFocus
                  color="secondary"
                  sx={{ my: 3, p: 0 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  입력
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
}
