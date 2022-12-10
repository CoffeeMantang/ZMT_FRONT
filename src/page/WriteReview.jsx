import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import StarIcon from '@mui/icons-material/Star';

export default function WriteReview(props) {
  const history = useHistory();
  const [score, setScore] = useState(5); // 리뷰점수를 관리할 state
  const [file, setFile] = useState(null); //파일
  const [title, setTitle] = useState(''); // 제목
  const [content, setContent] = useState(''); // 내용
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
    setFile(event.target.files);
  };

  // 제목이 변경될 때 title state에 제목 저장
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // 내용이 변경될 때 content state에 내용 저장
  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  // 폼 제출될때 이미지와 함께 폼 내용 전송시키기 - 전송 후 실패하면 리뷰작성실패라고 띄우고 다시 주문내역 보여줌
  const handleSubmit = async (event) => {
    const fd = new FormData();
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    // 파일 데이터 저장
    Object.values(file).forEach((file) => {
      fd.append('file', file);
    });
    fd.set('title', title);
    fd.set('content', content);
    fd.set('orderlistId', props.orderlistId);
    fd.set('score', score);
    axios
      .post('http://localhost:8080/review/create', fd, {
        headers: {
          'Content-Type': `multipart/form-data; `,
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // 성공 시 이전페이지로 이동
        window.location.replace('/orderlist');
      })
      .catch((error) => {
        // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
        if (error.status === 403) {
          //로그인상태를 false로
          props.setLogin(false);
          history.push('/main');
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form">
        <Grid container sx={{ px: 3 }}>
          <Grid xs="12" sx={{ mt: 10 }}>
            <Typography variant="h5" fontWeight="bold">
              {props.storeName}
            </Typography>
          </Grid>
          <Grid xs="12">
            <StarIcon
              sx={{ color: `${score > 0 && '#FFFF00'}` }}
              onClick={() => setScore(1)}
            />
            <StarIcon
              sx={{ color: `${score > 1 ? '#FFFF00' : '#BBBB'}` }}
              onClick={() => setScore(2)}
            />
            <StarIcon
              sx={{ color: `${score > 2 ? '#FFFF00' : '#BBBB'}` }}
              onClick={() => setScore(3)}
            />
            <StarIcon
              sx={{ color: `${score > 3 ? '#FFFF00' : '#BBBB'}` }}
              onClick={() => setScore(4)}
            />
            <StarIcon
              sx={{ color: `${score > 4 ? '#FFFF00' : '#BBBB'}` }}
              onClick={() => setScore(5)}
            />
          </Grid>
          <Grid xs="12" sx={{ mb: 3 }}>
            <TextField
              id="title"
              label="제목"
              variant="standard"
              fullWidth
              onChange={handleChangeTitle}
            />
          </Grid>
          <Grid xs="12">
            <TextField
              id="outlined-textarea"
              label="내용"
              multiline
              rows={7}
              fullWidth
              onChange={handleChangeContent}
            />
          </Grid>
          <Grid xs="12" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              sx={{ borderColor: '#F2620F' }}
            >
              <Typography>파일 첨부</Typography>
              <input type="file" hidden onChange={handleChangeFile} />
            </Button>
          </Grid>
          <Grid xs="6" sx={{ mt: 2, pr: 1 }}>
            <Button
              variant="contained"
              component="label"
              color="secondary"
              type="submit"
              fullWidth
            >
              <Typography>취소</Typography>
            </Button>
          </Grid>
          <Grid xs="6" sx={{ mt: 2, pl: 1 }}>
            <Button
              variant="contained"
              component="label"
              color="secondary"
              onClick={handleSubmit}
              fullWidth
            >
              <Typography>작성</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/** 상단바영역 */}
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
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                props.setCur(false); // cur를 false로 바꾸어 리뷰작성페이지가 사라지고 orderlist 컴포넌트가 다시 나타나도록 함
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              fontWeight="600"
              align="left"
            >
              리뷰쓰기
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
