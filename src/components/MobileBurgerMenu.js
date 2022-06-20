import { Link, Route } from "react-router-dom";

function MobileBurgerMenu({ userEmail, loggedIn, onSignout, isOpen }) {
  return (
    <section
      className={`header__burger-menu ${
        isOpen && "header__burger-menu_opened"
      }`}
    >
      <p className="header__email">{userEmail.email}</p>
      <button
        className={loggedIn ? "header__button" : "header__button_hidden"}
        onClick={onSignout}
      >
        <Route path="/">
          <Link to="sign-in">Выйти</Link>
        </Route>
      </button>
    </section>
  );
}

export default MobileBurgerMenu;
