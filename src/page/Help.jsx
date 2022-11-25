import {
  AppBar,
  Box,
  createTheme,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Help() {
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <List sx={{ width: '100%', px: 3, mt: 7, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <QuestionMarkIcon />
            </ListItemAvatar>
            <ListItemText
              primary="자주묻는 질문"
              secondary="자주묻는 질문은 여기에서 확인해 주세요"
              onClick={() => history.push('/question')}
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <PhoneIcon />
            </ListItemAvatar>
            <ListItemText primary="ZoneMT 고객센터" secondary="01085449859" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <MailOutlineIcon />
            </ListItemAvatar>
            <ListItemText
              primary="이메일"
              secondary="dlwl0214@kyungmin.ac.kr"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <WarningAmberIcon />
            </ListItemAvatar>
            <ListItemText
              primary="이물질 신고"
              secondary="고객센터로 문의주세요"
            />
          </ListItem>
        </List>
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
                onClick={() => history.goBack()}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                fontWeight="600"
                align="left"
              >
                즐겨찾기
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
}
