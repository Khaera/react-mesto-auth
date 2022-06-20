import React from "react";

function MobileBurgerMenu({
  userEmail,
  loggedIn,
  onSignout,
  location,
  isOpen
}) {
  return (
    <section
      className={`header__burger-menu ${
        isOpen ? "header__burger-menu_opened" : ""
      }`}
    >
      <p className="header__email">{userEmail.email}</p>
      <button
        className={loggedIn ? "header__button" : "header__button_hidden"}
        onClick={onSignout}
      >
        {location.pathname === "/" ? "Выйти" : ""}
      </button>
    </section>
  );
}

export default MobileBurgerMenu;
