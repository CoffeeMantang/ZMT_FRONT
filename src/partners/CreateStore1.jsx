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
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/CreateStore.module.css';
import { Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

export default function CreateStore1(props) {
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

  // 파일이 변경될 때 file state에 파일 저장
  const handleChangeFile = (event) => {
    props.setForm({ ...props.form, file: event.target.files });
  };

  const telCheck = (event) => {
    if (event.keyCode < 48 && event.keyCode > 57) {
      return false;
    }
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
    props.setForm({
      ...props.form,
      ...{ address2: splitArr[splitArr.length - 1], address1: madeAddress },
    });
    console.log({
      ...props.form,
      ...{ address2: splitArr[splitArr.length - 1], address1: madeAddress },
    });

    console.log('주소장전완료 ' + data.sido + data.sigungu + data.bname);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <ThemeProvider theme={theme}>
      
      <Grid container sx={{ px: 3 }}>
        <Grid xs="12" sx={{ mt: 3 }}>
          <Typography>가게이름</Typography>
        </Grid>
        <Grid xs="12" sx={{ mb: 2 }}>
          <TextField
            fullWidth
            onChange={(e) =>
              props.setForm({ ...props.form, storeName: e.target.value })
            }
            size="small"
            value={props.form.storeName}
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
              props.setForm({ ...props.form, category: e.target.value });
              console.log('카테고리' + e.target.value);
            }}
            value={props.form.category !== 0 && props.form.category}
          >
            <FormControlLabel value="1" control={<Radio />} label="한식" />
            <FormControlLabel value="2" control={<Radio />} label="중식" />
            <FormControlLabel value="3" control={<Radio />} label="양식" />
            <FormControlLabel value="4" control={<Radio />} label="아시안" />
            <FormControlLabel value="5" control={<Radio />} label="일식" />
            <FormControlLabel value="6" control={<Radio />} label="디저트" />
            <FormControlLabel value="7" control={<Radio />} label="카페" />
            <FormControlLabel
              value="8"
              control={<Radio />}
              label="패스트푸드"
            />
            <FormControlLabel value="9" control={<Radio />} label="치킨" />
            <FormControlLabel value="10" control={<Radio />} label="피자" />
            <FormControlLabel value="11" control={<Radio />} label="분식" />
          </RadioGroup>
        </Grid>
        <Grid xs="12">
          <Typography>가게정보</Typography>
        </Grid>
        <Grid xs="12" sx={{ mb: 2 }}>
          <TextField
            multiline
            onChange={(e) =>
              props.setForm({ ...props.form, notice: e.target.value })
            }
            size="small"
            value={props.form.notice}
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
                props.setForm({ ...props.form, tel: e.target.value });
              }
            }}
            defaultValue={props.form.tel}
            value={props.form.tel}
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
          {props.form.file === null && (
            <Typography>선택된 파일 없음</Typography>
          )}
          {props.form.file !== null && (
            <div className={styles.image_box}>
              <img
                src={URL.createObjectURL(props.form.file[0])}
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
            value={`${props.form.address1} ${props.form.address2}`}
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
        {props.form.address1 !== '' && (
          <Grid xs="12" container>
            <Grid xs="12">
              <Typography>세부주소</Typography>
            </Grid>
            <Grid xs="12">
              <TextField
                size="small"
                fullWidth
                onChange={(e) =>
                  props.setForm({ ...props.form, address3: e.target.value })
                }
                value={props.form.address3}
              ></TextField>
            </Grid>
          </Grid>
        )}
      </Grid>
      {/** 모두 입력되면 버튼 뜸 */}
      {props.form.address1 !== '' &&
        props.form.storeName !== '' &&
        props.form.category !== 0 &&
        props.form.tel !== '' && (
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
                props.setCreate2(true);
                props.setCreate1(false);
              }}
            >
              <Typography color="primary">다음으로</Typography>
            </Button>
          </Box>
        )}
    </ThemeProvider>
  );
}
