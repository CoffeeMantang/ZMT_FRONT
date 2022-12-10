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

export default function AddMenu(props) {
  const arr1 = [
    '포유류',
    '조류',
    '어류',
    '조개류',
    '해물류',
    '두족류',
    '채소류',
    '해조류',
    '달걀류',
    '우유',
    '모짜렐라',
    '치즈',
    '버섯류',
    '곡류',
    '견과류',
    '면',
    '빵',
    '떡',
    '커피',
    '과일',
    '밥',
    '과자',
    '초콜릿',
    '요거트',
    '탄산',
    '차',
    '어묵',
  ];
  const arr2 = [
    '매운맛',
    '짠맛',
    '단맛',
    '신맛',
    '쓴맛',
    '감칠맛',
    '고소한맛',
    '무미',
  ];
  const arr3 = [
    '끓이기',
    '찌기',
    '조리기',
    '굽기',
    '튀기기',
    '볶기',
    '데치기',
    '절이기',
    '재우기',
    '무치기',
    '베이킹',
    '음료',
    '오븐',
    '생',
    '굳히기',
    '말리기',
    '훈제',
    '숙성',
    '아이스크림',
  ];
  const arr4 = [
    '한식',
    '중식',
    '양식',
    '아시안',
    '일식',
    '디저트',
    '카페',
    '패스트푸드',
    '치킨',
    '피자',
    '분식',
  ];
  const [tag, setTag] = useState([]); // 메뉴의 태그를 넣을 state를 빈 배열로 선언
  const [name, setName] = useState(''); // 메뉴명
  const [category, setCategory] = useState(''); // 분류
  const [notice, setNotice] = useState(''); // 메뉴설명
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null); // 이미지
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

  const checkBoxTheme = {
    color: 'gray',
    '&.Mui-checked': {
      color: '#F2620F',
    },
  };

  // 카테고리 렌더링
  const renderCategory = () => {
    const result = [];
    for (let i = 0; i < arr4.length; i++) {
      result.push(
        <FormControlLabel
          control={
            <Checkbox
              value={arr4[i]}
              sx={checkBoxTheme}
              onChange={(e) => tagging(e)}
            />
          }
          label={arr4[i]}
        />
      );
    }
    return result;
  };

  // 주재료 랜더링
  const renderMain = () => {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      result.push(
        <FormControlLabel
          control={
            <Checkbox
              value={arr1[i]}
              sx={checkBoxTheme}
              onChange={(e) => tagging(e)}
            />
          }
          label={arr1[i]}
        />
      );
    }
    return result;
  };

  // 맛 랜더링
  const renderTaste = () => {
    const result = [];
    for (let i = 0; i < arr2.length; i++) {
      result.push(
        <FormControlLabel
          control={
            <Checkbox
              value={arr2[i]}
              sx={checkBoxTheme}
              onChange={(e) => tagging(e)}
            />
          }
          label={arr2[i]}
        />
      );
    }
    return result;
  };

  // 조리방법 렌더링
  const renderHow = () => {
    const result = [];
    for (let i = 0; i < arr3.length; i++) {
      result.push(
        <FormControlLabel
          control={
            <Checkbox
              value={arr3[i]}
              sx={checkBoxTheme}
              onChange={(e) => tagging(e)}
            />
          }
          label={arr3[i]}
        />
      );
    }
    return result;
  };

  useEffect(() => {
    props.setThisTop(false); // 상단바 비활성화
  }, []);

  // 태그를 선택하면 발동될 함수
  const tagging = (event) => {
    console.log(event.target.value + event.target.checked);
    // tag에 해당 내용이 있는지 체크하는 함수
    const isTagging = (element) => {
      if (element === event.target.value) {
        return true;
      }
    };
    // 체크된 경우
    if (event.target.checked === true) {
      // 해당 태그가 없으면 삽입
      if (tag.find(isTagging) === undefined) {
        setTag([...tag, event.target.value]);
      }
    }
    // 체크해제된 경우 해당 요소를 제거
    if (event.target.checked === false) {
      let filtered = tag.filter((e) => e !== event.target.value);
      setTag(filtered);
    }
  };

  const storeId = useParams().storeId; // 주소에서 가게의 아이디 가져옴

  // 내용 서버에 전송하기
  const addMenu = async () => {
    if (props.isLogin === true) {
      let resultTag = '';
      console.log(tag);
      for (let i = 0; i < tag.length; i++) {
        i === 0 ? (resultTag = tag[i]) : (resultTag = resultTag + ',' + tag[i]);
      }
      console.log(resultTag);
      const fd = new FormData(); // 요청에 보낼 formdata
      // 파일 데이터 저장
      Object.values(file).forEach((file) => {
        fd.append('files', file);
      });
      fd.append('storeId', storeId);
      fd.append('menuName', name);
      fd.append('price', price);
      fd.append('notice', notice);
      fd.append('category', category);
      fd.append('tag', resultTag);

      const accessToken = localStorage.getItem('ACCESS_TOKEN');

      //아 힘들어;ㅏㅣㄴㅁㅇㄹ미ㅏ;낭ㅁ라ㅣ;ㅏㅓㅇㅁ라ㅣㅏㅣ
      const response = await axios
        .post(`http://localhost:8080/partners/store/menu/add`, fd, {
          headers: {
            'Content-Type': `multipart/form-data; `,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(history.push(`/partners/store/${storeId}`));
    }
  };

  // 파일이 변경될 때 file state에 파일 저장
  const handleChangeFile = (event) => {
    setFile(event.target.files);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>
      <Grid container sx={{ px: 3, mt: 3 }}>
        <Grid xs="12">
          <Typography variant="h6">메뉴명</Typography>
        </Grid>
        <Grid xs="12">
          <TextField
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
        </Grid>
        <Grid xs="12">
          <Typography variant="h6">가격</Typography>
        </Grid>
        <Grid xs="12">
          <TextField
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
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
        <Grid xs="12">
          <Typography variant="h6">분류</Typography>
        </Grid>
        <Grid xs="12">
          <TextField
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></TextField>
        </Grid>
        <Grid xs="12">
          <Typography variant="h6">메뉴설명</Typography>
        </Grid>
        <Grid xs="12">
          <TextField
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
          ></TextField>
        </Grid>
        <Grid xs="6" sx={{ mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            component="label"
            sx={{ borderColor: '#F2620F' }}
            size="small"
          >
            <Typography>파일 첨부</Typography>
            <input type="file" hidden onChange={handleChangeFile} />
          </Button>
        </Grid>
        <Grid xs="6" sx={{ display: 'flex', alignItems: 'center' }}>
          {file === null && <Typography>선택된 파일 없음</Typography>}
          {file !== null && (
            <div className={styles.image_box}>
              <img
                src={URL.createObjectURL(file[0])}
                alt="가게이미지"
                loading="lazy"
                className={styles.image_thumbnail}
              />
            </div>
          )}
        </Grid>
        <Grid xs="12" sx={{ mt: 2, mb: 2 }}>
          <Divider></Divider>
        </Grid>
        <Grid xs="12">
          <Typography variant="h6">추천시스템용 태깅(중복선택 가능)</Typography>
        </Grid>
        <Grid xs="12" sx={{ mb: 2 }}>
          <Typography color="gray">
            추천시스템 노출을 원하지 않는 경우 태깅하지 않으셔도 됩니다.
          </Typography>
        </Grid>
        <Grid xs="12">
          <Typography variant="h6" fontWeight="bold">
            카테고리
          </Typography>
        </Grid>
        <Grid xs="12">{renderCategory()}</Grid>
        <Grid xs="12">
          <Typography variant="h6" fontWeight="bold">
            주재료
          </Typography>
        </Grid>
        <Grid xs="12">{renderMain()}</Grid>
        <Grid xs="12">
          <Typography variant="h6" fontWeight="bold">
            맛
          </Typography>
        </Grid>
        <Grid xs="12">{renderTaste()}</Grid>
        <Grid xs="12">
          <Typography variant="h6" fontWeight="bold">
            조리방법
          </Typography>
        </Grid>
        <Grid xs="12">{renderHow()}</Grid>
        <Grid xs="12">
          <Typography variant="h6" fontWeight="bold">
            온도
          </Typography>
        </Grid>
        <Grid xs="12">
          <FormControlLabel
            control={
              <Checkbox
                value="차가운"
                sx={checkBoxTheme}
                onChange={(e) => tagging(e)}
              />
            }
            label="차가운"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="미온"
                sx={checkBoxTheme}
                onChange={(e) => tagging(e)}
              />
            }
            label="미온"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="뜨거운"
                sx={checkBoxTheme}
                onChange={(e) => tagging(e)}
              />
            }
            label="뜨거운"
          />
        </Grid>
        <Grid xs="12" sx={{ mt: 3, mb: 5 }}>
          <Button
            fullWidth
            sx={{ backgroundColor: '#F2620F', border: 1 }}
            onClick={() => addMenu()}
          >
            <Typography>메뉴생성</Typography>
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
                      메뉴 추가
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
