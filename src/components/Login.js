import { useState } from "react";
import { withRouter } from "react-router-dom";

function Login({ onLogin }) {
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
    if (!email || !password) {
      return;
    }
    onLogin({ email, password });
  }
  return (
    <div className="entry">
      <p className="entry__title">Вход</p>
      <form
        name="login"
        className="entry__form"
        noValidate
        onSubmit={handleSubmit}
      >
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
            autoComplete="on"
          />
        </label>
        <button className="entry__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);
