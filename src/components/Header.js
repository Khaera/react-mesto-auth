import { Link, Route } from "react-router-dom";
import burgerIcon from "../images/burger-button.svg";
import closeIcon from "../images/close-button.svg";

function Header({ loggedIn, onSignout, userEmail, onBurgerClick, isOpen }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__menu">
        <p className="header__email">{userEmail.email}</p>
        <button
          className={loggedIn ? "header__button" : "header__button_hidden"}
          onClick={onSignout}
        >
          <Route path="/">
            <Link to="/sign-in">Выйти</Link>
          </Route>
        </button>
      </div>
      {loggedIn ? (
        <button
          type="button"
          className="header__burger-button"
          onClick={onBurgerClick}
        >
          <img
            src={isOpen ? closeIcon : burgerIcon}
            alt={isOpen ? "Закрыть" : "Открыть"}
            className="header__burger-image"
          />
        </button>
      ) : (
        <p className={!loggedIn ? "header__link" : "header__link_hidden"}>
          <Route path="/sign-up">
            <Link to="/sign-in">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up">Регистрация</Link>
          </Route>
        </p>
      )}
    </header>
  );
}

export default Header;
