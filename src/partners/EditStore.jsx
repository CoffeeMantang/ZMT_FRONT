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
} from '@mui/material';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/CreateStore.module.css';
import { Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

export default function EditStore(props) {
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
    thumb: '',
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

  const storeId = useParams().storeId; // 주소에서 가게의 아이디 가져옴

  // 파일이 변경될 때 file state에 파일 저장
  const handleChangeFile = (event) => {
    setForm({ ...form, file: event.target.files });
  };

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    let madeAddress = data.sido + ' ' + data.sigungu + ' ' + data.bname;

    let splitArr = data.autoJibunAddress.split(' ');
    setForm({
      ...form,
      ...{ address2: splitArr[splitArr.length - 1], address1: madeAddress },
    });
    console.log({
      ...form,
      ...{ address2: splitArr[splitArr.length - 1], address1: madeAddress },
    });

    console.log('주소장전완료 ' + data.sido + data.sigungu + data.bname);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  // 현재 정보 가져오기
  const fetchStore = async () => {
    if (props.isLogin === true) {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.post(
        `http://localhost:8080/partners/store/view`,
        {
          storeId: storeId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const response2 = await axios.get(
        `http://localhost:8080/nonmember/store/info?storeId=${storeId}`
      );
      // 가져온 정보를 state에 넣기
      let addressTemp = response.data.address1.split(' ');
      let address2 = addressTemp[addressTemp.length - 1]; // 동(address2)
      let address1 = '';
      for (let i = 0; i < addressTemp.length - 1; i++) {
        if (i === 0) {
          address1 += addressTemp[i];
        } else {
          address1 += ' ' + addressTemp[i];
        }
      }
      console.log(response.data);
      await setForm({
        ...form,
        ...{
          storeName: response.data.name,
          category: response.data.category,
          address1: address1,
          address2: address2,
          address3: response.data.address2,
          addressX: response.data.addressX,
          addressY: response.data.addressY,
          notice: response2.data.notice,
          tel: response2.data.tel,
          thumb: response2.data.thumb,
        },
      });
    }
  };

  // 현재 정보 가져오기(storeInfo)
  const getMore = async () => {
    const response = await axios
      .get(`http://localhost:8080/nonmember/store/info?storeId=${storeId}`)
      .then((res) => {
        setForm({
          ...form,
          ...{
            notice: res.data.notice,
            tel: res.data.tel,
            thumb: res.data.thumb,
          },
        });
      });
  };

  const checkBoxTheme = {
    color: 'gray',
    '&.Mui-checked': {
      color: '#F2620F',
    },
  };

  // 지금까지 모은 내용을 서버에 전송하는 함수
  const create = async () => {
    if (props.isLogin === true) {
      const fd = new FormData();
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      // 파일 데이터 저장
      Object.values(form.file).forEach((file) => {
        fd.append('file', file);
      });
      fd.set('name', form.storeName);
      fd.set('category', form.category);
      fd.set('notice', form.notice);
      fd.set('tel', form.tel);
      fd.set('address1', form.address1);
      fd.set('address2', form.address2 + ' ' + form.address3);
      fd.set('addressX', form.addressX); // 경도
      fd.set('addressY', form.addressY); // 위도
      fd.set('storeId', storeId); // 가게아이디
      console.log(fd);
      const response = await axios
        .post(`http://localhost:8080/partners/store/update`, fd, {
          headers: {
            'Content-Type': `multipart/form-data; `,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .catch(console.log('가게수정실패'))
        .then(async (res) => {
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
        });
    }
  };

  useEffect(() => {
    props.setThisTop(false); // 상단바 비활성화
    fetchStore();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '57px' }}></div>

      <Grid container sx={{ px: 3 }}>
        <Grid xs="12" sx={{ mt: 3 }}>
          <Typography>가게이름</Typography>
        </Grid>
        <Grid xs="12" sx={{ mb: 2 }}>
          <TextField
            fullWidth
            onChange={(e) => setForm({ ...form, storeName: e.target.value })}
            size="small"
            value={form.storeName}
          ></TextField>
        </Grid>
        <Grid xs="12">
          <Typography>카테고리</Typography>
        </Grid>
        <Grid xs="12" sx={{ mb: 2 }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => {
              setForm({ ...form, category: e.target.value });
              console.log('카테고리' + e.target.value);
            }}
            value={form.category !== 0 && form.category}
            sx={{}}
          >
            <FormControlLabel
              value="1"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="한식"
            />
            <FormControlLabel
              value="2"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="중식"
            />
            <FormControlLabel
              value="3"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="양식"
            />
            <FormControlLabel
              value="4"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="아시안"
            />
            <FormControlLabel
              value="5"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="일식"
            />
            <FormControlLabel
              value="6"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="디저트"
            />
            <FormControlLabel
              value="7"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="카페"
            />
            <FormControlLabel
              value="8"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="패스트푸드"
            />
            <FormControlLabel
              value="9"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="치킨"
            />
            <FormControlLabel
              value="10"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="피자"
            />
            <FormControlLabel
              value="11"
              control={<Radio sx={{ checkBoxTheme }} />}
              label="분식"
            />
          </RadioGroup>
        </Grid>
        <Grid xs="12">
          <Typography>가게정보</Typography>
        </Grid>
        <Grid xs="12" sx={{ mb: 2 }}>
          <TextField
            multiline
            onChange={(e) => setForm({ ...form, notice: e.target.value })}
            size="small"
            value={form.notice}
          ></TextField>
        </Grid>
        <Grid xs="12">
          <Typography>전화번호</Typography>
        </Grid>
        <Grid xs="12" sx={{ mb: 2 }}>
          <TextField
            type="text"
            size="small"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              const regex = /^[0-9\b]+$/;
              if (e.target.value === '' || regex.test(e.target.value)) {
                setForm({ ...form, tel: e.target.value });
              }
            }}
            defaultValue={form.tel}
            value={form.tel}
            inputProps={{ maxLength: 12 }}
          />
        </Grid>
        <Grid xs="12">
          <Typography>가게 이미지 업로드</Typography>
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
          {form.file === null && form.thumb !== '' && (
            <div className={styles.image_box}>
              <img
                src={`${form.thumb}`}
                alt="가게이미지"
                loading="lazy"
                className={styles.image_thumbnail}
              />
            </div>
          )}
          {form.file !== null && (
            <div className={styles.image_box}>
              <img
                src={URL.createObjectURL(form.file[0])}
                alt="가게이미지"
                loading="lazy"
                className={styles.image_thumbnail}
              />
            </div>
          )}
        </Grid>
        <Grid xs="12">
          <Typography>가게주소</Typography>
        </Grid>
        <Grid xs="7">
          <TextField
            variant="standard"
            disabled
            size="small"
            value={`${form.address1} ${form.address2}`}
          ></TextField>
        </Grid>
        <Grid xs="5">
          <Button
            variant="contained"
            fullWidth
            sx={{ borderColor: '#F2620F', border: 1 }}
            onClick={handleClick}
          >
            주소검색
          </Button>
        </Grid>
        {form.address1 !== '' && (
          <Grid xs="12" container>
            <Grid xs="12">
              <Typography>세부주소</Typography>
            </Grid>
            <Grid xs="12">
              <TextField
                size="small"
                fullWidth
                onChange={(e) => setForm({ ...form, address3: e.target.value })}
                value={form.address3}
              ></TextField>
            </Grid>
          </Grid>
        )}
      </Grid>
      {/** 모두 입력되면 버튼 뜸 */}
      {form.address1 !== '' &&
        form.storeName !== '' &&
        form.category !== 0 &&
        form.tel !== '' && (
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
                create();
              }}
            >
              <Typography color="primary">수정완료</Typography>
            </Button>
          </Box>
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
