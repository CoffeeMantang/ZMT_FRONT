/* import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Header } from "./header";
import "../style/nav.scss";

const menus = [
  { name: "1", path: "/" },
  { name: "2", path: "/2" },
  { name: "3", path: "/3" },
  { name: "4", path: "/4" },
  { name: "5", path: "/5" },
  { name: "6", path: "/6" },
  { name: "7", path: "/7" },
  { name: "8", path: "/8" },
];

export const Nav = () => {
  return (
    <>
      <Header />
      <nav>
        {menus.map((arr, i) => (
          <Menu key={i} name={`page${arr.name}`} path={arr.path} />
        ))}
      </nav>
    </>
  );
};

const Menu = ({ name, path }) => {
  const elementRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === path) {
      elementRef.current.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return (
    <NavLink
      to={path}
      ref={elementRef}
      className={({ isActive }) => (isActive ? "active" : "inactive")}
    >
      <span>{name}</span>
    </NavLink>
  );
};
 */