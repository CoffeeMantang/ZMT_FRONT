import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  CssBaseline,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Button,
  Grid,
  Checkbox,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit">ZMT</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login(props) {
  const [state, setState] = useState('');
  const [disable, setDisable] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (props.isLogin === true) {
      // 이미 로그인 되어 있으면 main으로 이동
      console.log('Login.jsx : 이미 로그인되어있어 main으로 이동합니다.');
      history.push('/main');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    const req = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/nonmember/signin`,
        req
      );

      // 성공 시 로컬 스토리지에 토큰 저장
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      // 타입도 저장
      localStorage.setItem('ACCESS_TYPE', response.data.type);

      props.setLogin(true);
      // token 출력
      console.log(response.data.token);
      // 메인화면으로 이동
      history.push('/main');
    } catch (e) {
      setState('로그인 실패');
      setDisable('');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
