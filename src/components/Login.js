import React from "react";

function Login() {
  return (
    <div className="register">
      <p className="register__title">Вход</p>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
