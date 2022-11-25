import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useInView } from 'react-intersection-observer';
import styles from '../css/Bookmark.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Question() {
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

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
      <div style={{ height: '57px' }}></div>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>리뷰 작성은 어떻게 하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            주문 내역에서 리뷰를 작성하고 자하는 주문 건 하단의 [리뷰쓰기]
            버튼을 클릭하면 리뷰를 작성할 수 있습니다
          </Typography>
          <Typography>
            작성한 리뷰는 [리뷰관리] 메뉴에서 확인할 수 있습니다
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>리뷰가 차단되었어요.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ZMT에서는 당사를 통해 제공되는 컨텐츠를 쾌적하고, 신뢰할 수 있도록
            유지하기 위해 관리하고 있습니다
          </Typography>
          <Typography>
            따라서 법령에 의거하여 모니터링을 진행하고 있으며 음란물 및 비속어가
            기재된 리뷰를 차단하고 있습니다
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            권리침해신고가 되었다고 메일을 받았어요. 이게 뭔 소리인가요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            공개된 리뷰로 인해 명예훼손, 사생활 침해, 저작권 침해 등으로
            누군가의 권리를 침해한다는 주장을 받게 될 경우 권리침해신고가
            접수되어 메일로 안내드립니다
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>주류 구매 시 연령인증은 꼭 해야 하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            청소년 보호법에 따라 19세 미만에게는 주류 판매가 금지되고 있어, 주류
            구매 시에는 연령인증이 필요합니다
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>본인인증 메일이 안와요.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>스팸함을 확인 해주세요</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>주문한 메뉴를 변경하거나 취소하고 싶습니다</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            주문상태가 '주문 수락 전'이라면 주문한 메뉴를 직접 취소할 수 있으면
            변경을 위해서는 취소 후 재주문을 해주시면 됩니다
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            배달 예상시간보다 훨씬 늦게 음식이 되착했어요, 환불이나 보상을 받을
            수 있나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            안내해드린 배달 예상시간은 조리와 배달에 소요되는 예상 시간
            정보입니다. 주문량 및 날씨, 교통상황 등의 상황에 따라 실제
            도착시간은 다소 차이가 날 수 있으면, 실제 도착시간이 배달 예상시간
            보다 지연되었음을 이유로 환불이나 별도의 보상이 어려운 점 양해
            부탁드립니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            음식에서 이물질이 나왔는데 고객안심센터로 연락하면 되나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            네, 맞습니다. 고객안심센터는 ZMT를 이용하면 발생된 가게와 관련된
            불편사항을 접수하여 문제를 해결해드립니다
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>ZMT 제휴/입점 방법이 알고 싶어요.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>사업자 페이지에서 가능합니다.</Typography>
        </AccordionDetails>
      </Accordion>
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
                history.push('/main');
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
              자주묻는 질문
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
