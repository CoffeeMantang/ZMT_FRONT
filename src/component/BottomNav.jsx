import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListIcon from '@mui/icons-material/List';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useEffect, useState } from 'react';
import ssamanco from '../assets/font/BinggraeSamanco.ttf';

const color1 = `primary`; // 선택 안됐을때 색상
const color2 = `secondary`; // 선택 됐을때 색상
const btns = [
  {
    check: true,
    color: color2,
  },
  {
    check: false,
    color: color1,
  },
  {
    check: false,
    color: color1,
  },
  {
    check: false,
    color: color1,
  },
  {
    check: false,
    color: color1,
  },
];
const tempBtn = [
  {
    check: false,
    color: color1,
  },
  {
    check: false,
    color: color1,
  },
  {
    check: false,
    color: color1,
  },
  {
    check: false,
    color: color1,
  },
  {
    check: false,
    color: color1,
  },
];

export default function BottomNav(props) {
  const history = useHistory();
  const [buttons, setButtons] = useState(btns);

  const theme = createTheme({
    typography: {
      fontFamily: '빙그레 싸만코체',
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
            font-family: '빙그레 싸만코체';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('빙그레 싸만코체'), url(${ssamanco}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

  useEffect(() => {
    switch (props.bottomPage) {
      case 0:
        setPage(0);
        break;
      case 1:
        setPage(1);
        break;
      case 2:
        setPage(2);
        break;
      case 3:
        setPage(3);
        break;
      case 4:
        setPage(4);
        break;
      case 5:
        setPage(5);
        break;
      default:
        throw Error('몰랑');
    }
  }, [props.bottomPage]);

  function movePage(cnt) {
    const temp = [
      Object.assign({}, tempBtn[0]),
      Object.assign({}, tempBtn[1]),
      Object.assign({}, tempBtn[2]),
      Object.assign({}, tempBtn[3]),
      Object.assign({}, tempBtn[4]),
    ];
    temp[cnt].check = true;
    temp[cnt].color = color2;
    props.setBottomPage(cnt);
    setButtons(temp);
    console.log(`${cnt} 클릭됨`);
    console.log(`temp ${cnt} 의 color ${temp[cnt].color}`);
    console.log(`tempBtn ${cnt} 의 color ${tempBtn[cnt].color}`);
    switch (cnt) {
      case 0:
        history.push('/main');
        break;
      case 1:
        history.push('/search');
        break;
      case 2:
        history.push('/category');
        break;
      case 3:
        history.push('/orderlist');
        break;
      case 4:
        history.push('/mypage');
        break;
      default:
        throw Error('몰랑');
    }
  }
  function setPage(cnt) {
    const temp = [
      Object.assign({}, tempBtn[0]),
      Object.assign({}, tempBtn[1]),
      Object.assign({}, tempBtn[2]),
      Object.assign({}, tempBtn[3]),
      Object.assign({}, tempBtn[4]),
    ];
    temp[cnt].check = true;
    temp[cnt].color = color2;
    setButtons(temp);
    console.log(`${cnt} 클릭됨`);
    console.log(`temp ${cnt} 의 color ${temp[cnt].color}`);
    console.log(`tempBtn ${cnt} 의 color ${tempBtn[cnt].color}`);
  }

  useEffect(() => {
    movePage(0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              icon={<HomeIcon color={buttons[0].color} />}
              onClick={() => movePage(0)}
            />
            <BottomNavigationAction
              icon={<SearchIcon color={buttons[1].color} />}
              onClick={() => movePage(1)}
            />
            <BottomNavigationAction
              icon={<AddCircleIcon color={buttons[2].color} />}
              onClick={() => movePage(2)}
            />
            <BottomNavigationAction
              icon={<ListIcon color={buttons[3].color} />}
              onClick={() => movePage(3)}
            />
            <BottomNavigationAction
              icon={<PersonOutlineIcon color={buttons[4].color} />}
              onClick={() => movePage(4)}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
