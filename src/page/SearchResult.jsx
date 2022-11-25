import React, { useState, useEffect, useRef } from 'react';
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
  Tabs,
  Tab,
} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../css/SearchResult.module.css';
import StarIcon from '@mui/icons-material/Star';
import { useInView } from 'react-intersection-observer';
import { KAKAO_API_KEY } from '../kakaoKey';

export default function SearchResult(props) {
  // 컴포넌트 최초 로드 시
  useEffect(() => {
    console.log(`SearchResult.jsx: 로그인 상태는 ${props.isLogin}`);
    setValue(0);
    setSort('orderCount'); // 기본값 : 주문순
    setPage('1');

    if (props.isLogin === true) {
      getResultWithLogin(1);
    }
    if (props.isLogin === false) {
      getLocation();
    }
  }, []);

  const [ref, inView] = useInView();
  const [value, setValue] = React.useState(0);
  const [addressX, setAddressX] = useState(0.0);
  const [addressY, setAddressY] = useState(0.0);
  const [address, setAddress] = useState(''); //주소
  const [loading, setLoading] = useState(true);
  const [kw, setKw] = useState('');

  const handleSearch = () => {
    history.push(`/searchResult/${kw}`);
    keyword = kw;
    console.log(`SearchResult.jsx: 로그인 상태는 ${props.isLogin}`);
    setValue(0);
    setSort('orderCount'); // 기본값 : 주문순
    setPage('1');

    if (props.isLogin === true) {
      getResultWithLogin(1);
    }
    if (props.isLogin === false) {
      getLocation();
    }
  };

  const handleChange = (event, newValue) => {
    console.log(`value는 ${newValue}`);
    setValue(newValue);
  };

  // 위치정보 가져오기
  function getLocation() {
    if (props.isLogin === false) {
      console.log(props.isLogin);
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setAddressX(position.coords.latitude); // 위도
            setAddressY(position.coords.longitude); // 경도
            console.log(
              position.coords.latitude + ' ' + position.coords.longitude
            );
            getAddressInfo(position.coords.latitude, position.coords.longitude);
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert('GPS를 지원하지 않습니다');
      }
    }
  }

  // 위도와 경도로 행정구역 정보 가져오기
  const getAddressInfo = async (x, y) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${encodeURIComponent(
          y
        )}&y=${encodeURIComponent(x)}&input_coord=WGS84`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
        }
      );
      console.log(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${encodeURIComponent(
          x
        )}&y=${encodeURIComponent(y)} 로 연결`
      );
      console.log(response.data.documents[1].address_name);
      setAddress(
        response.data.documents[1].region_2depth_name +
          ' ' +
          response.data.documents[1].region_3depth_name
      ); // 주소 업데이트
      getResult(
        1,
        response.data.documents[1].region_2depth_name +
          ' ' +
          response.data.documents[1].region_3depth_name
      ); // 1페이지 로드
    } catch (e) {
      console.log(`SearchResult.jsx: getAddrsssInfo 실패`);
    }
  };

  let keyword = useParams().keyword;

  const [resultList, setResultList] = useState();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('orderCount'); // 정렬에 사용할 state

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

  // 정렬방식 바꾸기
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const [temp, setTemp] = useState(true);

  // 검색결과 받기 - 로그인 없이 할수있는 정렬
  const getResult = async (inputPage, addr) => {
    setLoading(true);
    try {
      console.log(`${keyword} 가 파라미터 값이예요`);
      const response = await axios.get(
        `http://localhost:8080/nonmember/searchResult/${keyword}?page=${inputPage}&sort=${sort}&address=${encodeURIComponent(
          addr
        )}`
      );
      console.log(
        `http://localhost:8080/nonmember/searchResult/${keyword}?page=${inputPage}&sort=${sort}&address=${encodeURIComponent(
          addr
        )}`
      );
      if (inputPage === 1) {
        setResultList(response.data.data);
        if (response.data.data.length < 1) {
          setTemp(false);
        }
      } else {
        if (response.data.data.length > 0) {
          setResultList((prevState) => [...resultList, ...response.data.data]);
        } else {
          setTemp(false);
        }
      }
      // 더이상 넘어올 데이터가 없으면 로딩을 true로 해서 더이상 api가 호출되지 않도록 함
      if (response.data.data.length < 10) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('SearchResult에서 getResult 실패');
      setLoading(true); // 더이상 넘어올 데이터가 없다고 판단하고 true로 변경
    }
  };

  // 검색결과 받기 - 로그인 해야함
  const getResultWithLogin = async (inputPage) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      console.log(`${keyword} 가 파라미터 값이예요`);
      const response = await axios
        .get(
          `http://localhost:8080/partners/store/searchResult/${keyword}?page=${inputPage}&sort=${sort}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
      console.log(
        `http://localhost:8080/store/searchResult/${keyword}?page=${inputPage}&sort=${sort}`
      );
      if (inputPage === 1) {
        setResultList(response.data.data);
        if (response.data.data.length < 1) {
          setTemp(false);
        }
      } else {
        if (response.data.data.length > 0) {
          setResultList((prevState) => [...resultList, ...response.data.data]);
        } else {
          setTemp(false);
        }
      }
      // 더이상 넘어올 데이터가 없으면 로딩을 true로 해서 더이상 api가 호출되지 않도록 함
      if (response.data.data.length < 10) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('SearchResult에서 getResultWithLogin 실패');
      setLoading(true); // 더이상 넘어올 데이터가 없다고 판단하고 true로 변경
    }
  };

  // 메뉴명으로 검색결과 받기 - 로그인 없이
  const getMenuSearch = async (inputPage) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      console.log(`${keyword} 가 파라미터 값이예요`);
      const response = await axios
        .get(
          `http://localhost:8080/partners/store/searchMenuResult/${keyword}?page=${inputPage}&sort=${sort}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
      console.log(
        `http://localhost:8080/store/searchMenuResult/${keyword}?page=${inputPage}&sort=${sort}`
      );
      if (inputPage === 1) {
        if (response.data.data.length < 1) {
          setTemp(false);
        }
        setResultList(response.data.data);
      } else {
        if (response.data.data.length > 0) {
          setResultList((prevState) => [...resultList, ...response.data.data]);
        } else {
          setTemp(false);
        }
      }
      // 더이상 넘어올 데이터가 없으면 로딩을 true로 해서 더이상 api가 호출되지 않도록 함
      if (response.data.data.length < 10) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('SearchResult에서 getResultWithLogin 실패');
      setLoading(true); // 더이상 넘어올 데이터가 없다고 판단하고 true로 변경
    }
  };

  // 메뉴명으로 검색결과 받기 - 로그인해야함
  const getMenuSearchWithLogin = async (inputPage) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      console.log(`${keyword} 가 파라미터 값이예요`);
      const response = await axios
        .get(
          `http://localhost:8080/partners/store/searchMenuResult/${keyword}?page=${inputPage}&sort=${sort}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
      console.log(
        `http://localhost:8080/partners/store/searchMenuResult/${keyword}?page=${inputPage}&sort=${sort}`
      );
      if (inputPage === 1) {
        if (response.data.data.length < 1) {
          setTemp(false);
        }
        setResultList(response.data.data);
      } else {
        if (response.data.data.length > 0) {
          setResultList((prevState) => [...resultList, ...response.data.data]);
        } else {
          setTemp(false);
        }
      }
      // 더이상 넘어올 데이터가 없으면 로딩을 true로 해서 더이상 api가 호출되지 않도록 함
      if (response.data.data.length < 10) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log('SearchResult에서 getResultWithLogin 실패');
      setLoading(true); // 더이상 넘어올 데이터가 없다고 판단하고 true로 변경
    }
  };

  // 가게로 이동하기
  const goStore = (storeId) => {
    history.push(`/store/${storeId}`);
  };

  // sort state가 변경되면 해당하는 정렬로 재로드(기존 result 제거)
  useEffect(() => {}, [sort]);

  // 가게:0 메뉴:1 탭이 변경되면 해당하는 result로 재로드(기존 result 제거)
  useEffect(() => {
    setTemp(true);
    if (value === 0) {
      // 가게명으로 검색인 경우
      // 1. 새로 검색
      console.log(`SearchResult.jsx: 로그인 상태는 ${props.isLogin}`);
      setPage('1');
      if (props.isLogin === true) {
        // 로그인 된 경우
        getResultWithLogin(1);
      }
      if (props.isLogin === false) {
        // 로그인되지 않은 경우
        getResult(1);
      }
    } else if (value === 1) {
      // 메뉴명으로 검색인 경우
      console.log(`SearchResult.jsx: 로그인 상태는 ${props.isLogin}`);
      setLoading(false);
      setPage('1');
      if (props.isLogin === true) {
        // 로그인 된 경우
        getMenuSearchWithLogin(1);
      }
      if (props.isLogin === false) {
        // 로그인되지 않은 경우
        getMenuSearch(1);
      }
    }
  }, [value]);

  // 무한스크롤
  useEffect(() => {
    console.log('inView의 useEffect예요');
    // 페이지를 하나 더한 후 api 호출
    if (loading === false && inView === true) {
      // inView가 true로 변한 경우에만
      // 로딩중이 아닐 떄만
      const newPage = parseInt(page) + 1;
      setPage(newPage);
      if (value === 0) {
        // 가게명으로 검색인 경우
        // 1. 새로 검색
        console.log(`SearchResult.jsx: 로그인 상태는 ${props.isLogin}`);
        if (props.isLogin === true) {
          // 로그인 된 경우
          getResultWithLogin(newPage);
        }
        if (props.isLogin === false) {
          // 로그인되지 않은 경우
          getResult(newPage);
        }
      } else if (value === 1) {
        // 메뉴명으로 검색인 경우
        console.log(`SearchResult.jsx: 로그인 상태는 ${props.isLogin}`);
        if (props.isLogin === true) {
          // 로그인 된 경우
          getMenuSearchWithLogin(newPage);
        }
        if (props.isLogin === false) {
          // 로그인되지 않은 경우
          getMenuSearch(newPage);
        }
      }
    }
  }, [inView]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      <Grid container>
        <ThemeProvider theme={theme2}>
          <Grid xs="12" align="center" justifyContent="center">
            <Box
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              align="center"
            >
              <Tabs
                aria-label="basic tabs example"
                onChange={handleChange}
                value={value}
                col
                selectionFollowsFocus
                variant="fullWidth"
              >
                <Tab label="가게" />
                <Tab label="메뉴" />
              </Tabs>
            </Box>
          </Grid>
        </ThemeProvider>
        {/** 가게로 검색 리스트 */}
        {(value === 0 || value === 1) &&
          resultList !== undefined &&
          resultList !== null &&
          resultList.length > 0 &&
          resultList.map((item) => {
            return (
              <Grid xs="12" sx={{ mt: 3, px: 3 }}>
                <Grid xs="12">
                  <div
                    className={styles.image_box}
                    onClick={() => goStore(item.storeId)}
                  >
                    <img
                      src={`${item.thumb}`}
                      alt={item.name}
                      loading="lazy"
                      className={styles.image_thumbnail}
                    />
                  </div>
                </Grid>
                <Grid xs="12">
                  {/** 가게이름 */}
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>
                </Grid>
                <Grid xs="12" container>
                  {/** 리뷰평점 */}
                  <Grid
                    xs="1"
                    sx={{ m: 'auto', p: 'auto' }}
                    justifyContent="center"
                  >
                    <Typography variant="h6">{item.score}</Typography>
                  </Grid>
                  <Grid xs="11" align="left">
                    <IconButton>
                      <StarIcon
                        sx={{ color: '#FFFF00' }}
                        align="center"
                        fontSize="medium"
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
      {resultList && !loading && !inView && <div ref={ref}>더보기</div>}
      <Box sx={{ height: '50vw', width: '100%' }} />
      {(resultList === null ||
        resultList === undefined ||
        resultList.length < 1) &&
        temp === true &&
        loading === true && (
          <div className={styles.App_logo}>
            <Typography variant="h1" fontWeight="bold" align="center">
              ZMT
            </Typography>
          </div>
        )}
      {(resultList === null ||
        resultList === undefined ||
        resultList.length < 1) &&
        temp === false &&
        loading === true && (
          <div>
            <Typography variant="h1" fontWeight="bold" align="center">
              없어요!
            </Typography>
          </div>
        )}
      {/** 상단바 */}
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
                disableUnderline
                onChange={(event) => {
                  const data = event.target.value;
                  console.log(data);
                  setKw(data);
                }}
              />
            </Box>
            <IconButton
              size="large"
              edge="end"
              color="secondary"
              aria-label="menu"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
