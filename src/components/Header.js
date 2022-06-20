import React from "react";
import { Link } from "react-router-dom";
import burgerIcon from "../images/burger-button.svg";
import closeIcon from "../images/close-button.svg";

function Header({
  loggedIn,
  onSignout,
  userEmail,
  location,
  onBurgerClick,
  isOpen
}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__menu">
        <p className="header__email">{userEmail.email}</p>
        <button
          className={loggedIn ? "header__button" : "header__button_hidden"}
          onClick={onSignout}
        >
          {location.pathname === "/" ? "Выйти" : ""}
        </button>
      </div>
      {loggedIn ? (
        <button
          type="button"
          className="header__burger-button"
          onClick={onBurgerClick}
        >
          <img
            src={!isOpen ? burgerIcon : closeIcon}
            alt={isOpen ? "Закрыть" : "Открыть"}
            className="header__burger-image"
          />
        </button>
      ) : (
        <Link
          className={!loggedIn ? "header__link" : "header__link_hidden"}
          to={location.pathname === "/sign-up" ? "/sign-in" : "/sign-up"}
        >
          {location.pathname === "/sign-up" ? "Войти" : "Регистрация"}
        </Link>
      )}
    </header>
  );
}

export default Header;
