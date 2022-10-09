import React, { useState } from "react";
import "./BottomNav.css";
import { Link } from "react-router-dom";
// 사용할 아이콘 import
import "./FontAwesome";
// FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BottomNav = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = useState(1);
  return (
    <nav className="wrapper">
      {/* 하단 네비게이션 최상위 태그 */}

      <div>
        <Link to="/Main" className="nav-link" onClick={() => setActiveNav(1)}>
          <FontAwesomeIcon
            icon="home"
            className={activeNav === 1 ? "nav-item active" : "nav-item"}
          />{" "}
          {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
        </Link>
      </div>
      <div>
        <Link to="/Search" className="nav-link" onClick={() => setActiveNav(2)}>
          <FontAwesomeIcon
            icon="magnifying-glass"
            className={activeNav === 2 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
      <div>
        <Link
          to="/Menulist"
          className="nav-link"
          onClick={() => setActiveNav(3)}
        >
          <FontAwesomeIcon
            icon="plus"
            className={activeNav === 3 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
      <div>
        <Link
          to="/Orderlist"
          className="nav-link"
          onClick={() => setActiveNav(4)}
        >
          <FontAwesomeIcon
            icon="list"
            className={activeNav === 4 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
      <div>
        <Link to="/Mypage" className="nav-link" onClick={() => setActiveNav(5)}>
          <FontAwesomeIcon
            icon="user"
            className={activeNav === 5 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
