import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Register({ onRegister }) {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    onRegister({ email, password });
  }

  return (
    <div className="entry">
      <p className="entry__title">Регистрация</p>
      <form name="register" className="entry__form" onSubmit={handleSubmit}>
        <label className="entry__field">
          <input
            value={data.email}
            onChange={handleChange}
            className="entry__input"
            name="email"
            type="email"
            required
            placeholder="Email"
          />
        </label>
        <label className="entry__field">
          <input
            value={data.password}
            onChange={handleChange}
            className="entry__input"
            name="password"
            type="password"
            required
            placeholder="Пароль"
          />
        </label>
        <button className="entry__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="entry__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="sign-in" className="entry__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Register);
