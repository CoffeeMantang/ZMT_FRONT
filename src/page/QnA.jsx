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
  Button,
  Divider,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useInView } from 'react-intersection-observer';
import styles from '../css/Basket.module.css';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function QnA() {
  return (
    <>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>리뷰 작성은 어떻게 하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          주문 내역에서 리뷰를 작성하고 자하는 주문 건 하단의 [리뷰쓰기] 버튼을 클릭하면 리뷰를 작성할 수 있습니다
          </Typography>
          <Typography>
          작성한 리뷰는 [리뷰관리] 메뉴에서 확인할 수 있습니다 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>리뷰 작성은 어떻게 하나요?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          주문 내역에서 리뷰를 작성하고 자하는 주문 건 하단의 [리뷰쓰기] 버튼을 클릭하면 리뷰를 작성할 수 있습니다
          </Typography>
          <Typography>
          작성한 리뷰는 [리뷰관리] 메뉴에서 확인할 수 있습니다 
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </>
  )
}
