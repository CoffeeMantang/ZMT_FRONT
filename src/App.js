import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Main from './page/Main';
import BottomNav from './component/BottomNav.jsx'
import Search from './page/Search';
import Category from './page/Category';
import OrderList from './page/OrderList';
import MyPage from './page/MyPage';
import TopNav from './component/TopNav';
import Login from './page/Login';
import { useEffect, useState } from 'react';
import Store from './page/Store';
import Address from './page/Address';
import NewAddress from './page/NewAddress';
import SearchResult from './page/SearchResult';
import { useSearchParams } from "react-router-dom";
import Review from './page/Review';
import Bookmark from './page/Bookmark';
import Help from './page/Help';
import CategorySearch from './page/CategorySearch';
import StoreInfo from './page/StoreInfo';
import Menu from './page/Menu';
import Basket from './page/Basket';
import Question from './page/Question';
import axios from 'axios';
import Partners from './partners/Partners';

function App() {
  const [isLogin, setLogin] = useState(false); // 로그인 여부 체크용 state
  const [address, setAddress] = useState("로그인"); // 대표주소를 담을 state
  const [top, setTop] = useState(true); // 상단바
  const [bottom, setBottom] = useState(true); // 하단바
  const [bottomPage, setBottomPage] = useState(0);
  const history = useHistory();

  useEffect(() => { // 최초 기동시 로그인 체크
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    // 로컬 스토리지에 access token이 없으면 로그인 상태 false로
    if (accessToken === "null" || accessToken === null || accessToken === undefined) {
      setLogin(false);
    } else {
      loginCheck();
    }
  }, [])

  const loginCheck = async () => {
    // 로컬 스토리지에서 access token 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    await axios.get(
      `http://localhost:8080/token/getNewToken`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then(response => {
      // 성공 시 response 안의 토큰 받아와 갱신하고 로그인상태 true로
      localStorage.setItem("ACCESS_TOKEN", response.data);
      setLogin(true);
      history("/main");
    }).catch(error => {
      // 실패 시 status가 403이면 유효하지 않은 token 이므로 로컬스토리지의 토큰 제거하고 로그인상태 false로
      if (error.status === 403) {
        //로그인상태를 false로
        setLogin(false);
      }
    })
  }
  return (
    <BrowserRouter>
      <Switch>
        { /** 사업자 페이지 */}
        <Route path="/partners" render={() => <Partners isLogin={isLogin} setLogin={setLogin} />}>
        </Route>
        <Route path="/login" render={() => <Login isLogin={isLogin} setLogin={setLogin} />} />
        <Route path="/store/:storeId" render={() => <Store isLogin={isLogin} setLogin={setLogin} bottomPage={bottomPage} setBottomPage={setBottomPage} />} />
        <Route path="/address" render={() => <Address isLogin={isLogin} setLogin={setLogin} bottomPage={bottomPage} setBottomPage={setBottomPage} />} />
        <Route path="/review/:storeId" render={() => <Review isLogin={isLogin} setLogin={setLogin} bottomPage={bottomPage} setBottomPage={setBottomPage} />} />
        <Route path="/newAddress" render={() => <NewAddress isLogin={isLogin} setLogin={setLogin} bottomPage={bottomPage} setBottomPage={setBottomPage} />} />
        <Route path="/help" render={() => <Help />} />
        <Route path="/storeInfo/:storeId" render={() => <StoreInfo setTop={setTop} setBottom={setBottom} />} />
        <Route path="/Menu/:menuId" render={() => <Menu setTop={setTop} setBottom={setBottom} isLogin={isLogin} setLogin={setLogin} />} />
        <Route path="/basket" render={() => <Basket isLogin={isLogin} setLogin={setLogin} />} />
        <Route path="/question" render={() => <Question isLogin={isLogin} setLogin={setLogin} />} />
        <>

          <Route path="/search" render={() => <Search isLogin={isLogin} setLogin={setLogin} setTop={setTop} setBottomPage={setBottomPage} />} />
          <Route path="/searchResult/:keyword" render={() => <SearchResult setTop={setTop} setBottomPage={setBottomPage} isLogin={isLogin} setLogin={setLogin} setBottom={setBottom} />} />
          <Route path="/main" render={() => <Main isLogin={isLogin} setLogin={setLogin} setTop={setTop} setBottomPage={setBottomPage} setBottom={setBottom} />} />
          <Route path="/category" render={() => <Category isLogin={isLogin} setLogin={setLogin} setTop={setTop} setBottomPage={setBottomPage} />} />
          <Route path="/orderlist" render={() => <OrderList isLogin={isLogin} setLogin={setLogin} setTop={setTop} setBottomPage={setBottomPage} />} />
          <Route path="/mypage" render={() => <MyPage isLogin={isLogin} setLogin={setLogin} setTop={setTop} setBottomPage={setBottomPage} />} />
          <Route path="/bookmark" render={() => <Bookmark isLogin={isLogin} setLogin={setLogin} setTop={setTop} />} />
          <Route path="/categorySearch/:category" render={() => <CategorySearch isLogin={isLogin} setLogin={setLogin} setTop={setTop} setBottom={setBottom} setBottomPage={setBottomPage} />} />
          {(top === true) && (
            <TopNav isLogin={isLogin} setLogin={setLogin} />
          )}
          {(bottom === true) && (
            <BottomNav bottomPage={bottomPage} setBottomPage={setBottomPage} />
          )}

        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
