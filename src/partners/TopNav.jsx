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
  MenuItem,
  Menu,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';

const pages = ['실시간 주문', '마이페이지', '로그아웃'];

export default function TopNav(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
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
    <ThemeProvider theme={theme}>
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
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                  <Grid xs="4" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href=""
                      color="secondary"
                      fontWeight="bold"
                      sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        textAlign: 'center',
                      }}
                    >
                      ZMT
                    </Typography>
                  </Grid>
                </Grid>
                <Grid xs="12"></Grid>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
