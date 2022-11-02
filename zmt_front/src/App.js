import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Menulist from "./pages/Menulist";
import Mypage from "./pages/Mypage";
import Orderlist from "./pages/Orderlist";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/menulist" element={<Menulist />} />
        <Route path="/orderlist" element={<Orderlist />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
