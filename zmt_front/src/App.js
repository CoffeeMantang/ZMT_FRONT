import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Address from "./pages/Address";
import Mypage from "./pages/Mypage";
import Orderlist from "./pages/Orderlist";
import Signinpage from "./pages/Signinpage";
import BottomNav from "./bottomNav/BottomNav";
import Signupp from "./pages/Signupp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<BottomNav />}>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/orderlist" element={<Orderlist />} />
        </Route>
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/signinpage" element={<Signinpage />} />
        <Route path="/signupp" element={<Signupp />} />
      </Routes>
    </div>
  );
}

export default App;
