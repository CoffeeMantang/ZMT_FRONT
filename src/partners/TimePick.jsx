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
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Main.module.css';
import { Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateStore1 from './CreateStore1';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePick(props) {
  const [openTime, setOpenTime] = useState(null);
  const [closeTime, setCloseTime] = useState(null);
  const [breakTimeStart, setBreakTimeStart] = useState(null);
  const [breakTimeEnd, setBreakTimeEnd] = useState(null);

  useEffect(() => {
    switch (props.value) {
      case 0:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime1}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime1}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart1}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd1}:00 GMT+0900`
        );
        break;
      case 1:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime2}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime2}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart2}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd2}:00 GMT+0900`
        );
        break;
      case 2:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime3}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime3}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart3}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd3}:00 GMT+0900`
        );
        break;
      case 3:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime4}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime4}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart4}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd4}:00 GMT+0900`
        );
        break;
      case 4:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime5}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime5}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart5}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd5}:00 GMT+0900`
        );
        break;
      case 5:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime6}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime6}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart6}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd6}:00 GMT+0900`
        );
        break;
      case 6:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime7}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime7}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart7}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd7}:00 GMT+0900`
        );
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    switch (props.value) {
      case 0:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime1}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime1}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart1}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd1}:00 GMT+0900`
        );
        break;
      case 1:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime2}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime2}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart2}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd2}:00 GMT+0900`
        );
        break;
      case 2:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime3}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime3}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart3}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd3}:00 GMT+0900`
        );
        break;
      case 3:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime4}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime4}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart4}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd4}:00 GMT+0900`
        );
        break;
      case 4:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime5}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime5}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart5}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd5}:00 GMT+0900`
        );
        break;
      case 5:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime6}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime6}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart6}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd6}:00 GMT+0900`
        );
        break;
      case 6:
        setOpenTime(`Fri Dec 09 2022 ${props.form.openTime7}:00 GMT+0900`);
        setCloseTime(`Fri Dec 09 2022 ${props.form.closeTime7}:00 GMT+0900`);
        setBreakTimeStart(
          `Fri Dec 09 2022 ${props.form.breakTimeStart7}:00 GMT+0900`
        );
        setBreakTimeEnd(
          `Fri Dec 09 2022 ${props.form.breakTimeEnd7}:00 GMT+0900`
        );
        break;
      default:
        break;
    }
  }, [props.value, props.form]);

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
      <Grid container>
        <Grid xs="12">
          <Typography>오픈시간</Typography>
        </Grid>
        <Grid xs="12">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="openTime"
              value={openTime}
              onChange={(newValue) => {
                console.log(openTime);
                switch (props.value) {
                  case 0:
                    props.setForm({
                      ...props.form,
                      openTime1: newValue.format('HH:mm'),
                    });
                    break;
                  case 1:
                    props.setForm({
                      ...props.form,
                      openTime2: newValue.format('HH:mm'),
                    });
                    break;
                  case 2:
                    props.setForm({
                      ...props.form,
                      openTime3: newValue.format('HH:mm'),
                    });
                    break;
                  case 3:
                    props.setForm({
                      ...props.form,
                      openTime4: newValue.format('HH:mm'),
                    });
                    break;
                  case 4:
                    props.setForm({
                      ...props.form,
                      openTime5: newValue.format('HH:mm'),
                    });
                    break;
                  case 5:
                    props.setForm({
                      ...props.form,
                      openTime6: newValue.format('HH:mm'),
                    });
                    break;
                  case 6:
                    props.setForm({
                      ...props.form,
                      openTime7: newValue.format('HH:mm'),
                    });
                    break;
                  default:
                    console.log('timepick에서 opentime 넣기 오류 발생!');
                }
                setOpenTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs="12">
          <Typography>폐점시간</Typography>
        </Grid>
        <Grid xs="12">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="closeTime"
              value={closeTime}
              onChange={(newValue) => {
                switch (props.value) {
                  case 0:
                    props.setForm({
                      ...props.form,
                      closeTime1: newValue.format('HH:mm'),
                    });
                    break;
                  case 1:
                    props.setForm({
                      ...props.form,
                      closeTime2: newValue.format('HH:mm'),
                    });
                    break;
                  case 2:
                    props.setForm({
                      ...props.form,
                      closeTime3: newValue.format('HH:mm'),
                    });
                    break;
                  case 3:
                    props.setForm({
                      ...props.form,
                      closeTime4: newValue.format('HH:mm'),
                    });
                    break;
                  case 4:
                    props.setForm({
                      ...props.form,
                      closeTime5: newValue.format('HH:mm'),
                    });
                    break;
                  case 5:
                    props.setForm({
                      ...props.form,
                      closeTime6: newValue.format('HH:mm'),
                    });
                    break;
                  case 6:
                    props.setForm({
                      ...props.form,
                      closeTime7: newValue.format('HH:mm'),
                    });
                    break;
                  default:
                    console.log('timepick에서 closeTime 넣기 오류 발생!');
                }
                setCloseTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs="12">
          <Typography>휴식시작시간</Typography>
        </Grid>
        <Grid xs="12">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="breakTimeStart"
              value={breakTimeStart}
              onChange={(newValue) => {
                switch (props.value) {
                  case 0:
                    props.setForm({
                      ...props.form,
                      breakTimeStart1: newValue.format('HH:mm'),
                    });
                    break;
                  case 1:
                    props.setForm({
                      ...props.form,
                      breakTimeStart2: newValue.format('HH:mm'),
                    });
                    break;
                  case 2:
                    props.setForm({
                      ...props.form,
                      breakTimeStart3: newValue.format('HH:mm'),
                    });
                    break;
                  case 3:
                    props.setForm({
                      ...props.form,
                      breakTimeStart4: newValue.format('HH:mm'),
                    });
                    break;
                  case 4:
                    props.setForm({
                      ...props.form,
                      breakTimeStart5: newValue.format('HH:mm'),
                    });
                    break;
                  case 5:
                    props.setForm({
                      ...props.form,
                      breakTimeStart6: newValue.format('HH:mm'),
                    });
                    break;
                  case 6:
                    props.setForm({
                      ...props.form,
                      breakTimeStart7: newValue.format('HH:mm'),
                    });
                    break;
                  default:
                    console.log('timepick에서 breakTimeStart 넣기 오류 발생!');
                }
                setBreakTimeStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs="12">
          <Typography>휴식종료시간</Typography>
        </Grid>
        <Grid xs="12">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="breakTimeEnd"
              value={breakTimeEnd}
              onChange={(newValue) => {
                switch (props.value) {
                  case 0:
                    props.setForm({
                      ...props.form,
                      breakTimeEnd1: newValue.format('HH:mm'),
                    });
                    break;
                  case 1:
                    props.setForm({
                      ...props.form,
                      breakTimeEnd2: newValue.format('HH:mm'),
                    });
                    break;
                  case 2:
                    props.setForm({
                      ...props.form,
                      breakTimeEnd3: newValue.format('HH:mm'),
                    });
                    break;
                  case 3:
                    props.setForm({
                      ...props.form,
                      breakTimeEnd4: newValue.format('HH:mm'),
                    });
                    break;
                  case 4:
                    props.setForm({
                      ...props.form,
                      breakTimeEnd5: newValue.format('HH:mm'),
                    });
                    break;
                  case 5:
                    props.setForm({
                      ...props.form,
                      breakTimeEnd6: newValue.format('HH:mm'),
                    });
                    break;
                  case 6:
                    props.setForm({
                      ...props.form,
                      breakTimeEnd7: newValue.format('HH:mm'),
                    });
                    break;
                  default:
                    console.log('timepick에서 breakTimeEnd 넣기 오류 발생!');
                }
                setBreakTimeEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
