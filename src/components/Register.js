import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form className="register__form">
        <label className="register__field">
          <input
            className="register__input"
            name="email"
            type="email"
            required
            placeholder="Email"
          />
        </label>
        <label className="register__field">
          <input
            className="register__input"
            name="password"
            type="password"
            required
            placeholder="Пароль"
            autoComplete="on"
          />
        </label>
        <button className="register__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
