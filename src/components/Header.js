import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, onSignout }) {
  const location = useLocation();
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Link
        className={loggedIn ? "header__link" : "header__link_hidden"}
        to={location.pathname === "/" ? "/sign-in" : ""}
        onClick={onSignout}
      >
        {location.pathname === "/" ? "Выйти" : ""}
      </Link>
      <Link
        className={!loggedIn ? "header__link" : "header__link_hidden"}
        to={location.pathname === "/sign-up" ? "/sign-in" : "/sign-up"}
      >
        {location.pathname === "/sign-up" ? "Войти" : "Зарегистрироваться"}
      </Link>
    </header>
  );
}

export default Header;
