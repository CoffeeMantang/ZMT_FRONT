import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import AddMenu from './AddMenu';
import AddOption from './AddOption';
import CreateStore from './CreateStore';
import EditMenu from './EditMenu';
import EditStore from './EditStore';
import EditStoreInfo from './EditStoreInfo';
import Main from './Main';
import Menu from './Menu';
import Store from './Store';
import TopNav from './TopNav';

export default function Partners(props) {
  const [thisTop, setThisTop] = useState(true);
  const history = useHistory();
  useEffect(() => {
    // 최초 기동시 로그인 체크
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    // 로컬 스토리지에 access token이 없으면 로그인 상태 false로
    if (
      accessToken === 'null' ||
      accessToken === null ||
      accessToken === undefined
    ) {
      props.setLogin(false);
    } else {
      loginCheck();
    }
  }, []);

  const loginCheck = async () => {
    // 로컬 스토리지에서 access token 가져오기
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    await axios
      .get(`http://localhost:8080/token/getNewToken`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // 성공 시 response 안의 토큰 받아와 갱신하고 로그인상태 true로
        localStorage.setItem('ACCESS_TOKEN', response.data);
        props.setLogin(true);
        history('/main');
      })
      .catch((error) => {
        // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
        if (error.status === 403) {
          //로그인상태를 false로
          props.setLogin(false);
        }
      });
  };
  return (
    <>
      <Route
        path="/partners/main"
        exact
        render={() => (
          <Main
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      ></Route>
      <Route
        path="/partners/store/:storeId"
        exact
        render={() => (
          <Store
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      ></Route>
      <Route
        path="/partners/addMenu/:storeId"
        exact
        render={() => (
          <AddMenu
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      ></Route>
      <Route
        path="/partners/editMenu/:menuId"
        exact
        render={() => (
          <EditMenu
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      ></Route>
      <Route
        path="/partners/addOption/:menuId"
        exact
        render={() => (
          <AddOption
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      />
      <Route
        path="/partners/menu/:menuId"
        exact
        render={() => (
          <Menu
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      />
      <Route
        path="/partners/editStoreInfo/:storeId"
        exact
        render={() => (
          <EditStoreInfo
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      ></Route>
      <Route
        path="/partners/editStore/:storeId"
        exact
        render={() => (
          <EditStore
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      ></Route>
      <Route
        path="/partners/createStore"
        exact
        render={() => (
          <CreateStore
            isLogin={props.isLogin}
            setLogin={props.setLogin}
            setThisTop={setThisTop}
          />
        )}
      ></Route>
      {thisTop === true && (
        <TopNav isLogin={props.isLogin} setThisTop={setThisTop} />
      )}
    </>
  );
}
