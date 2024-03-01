import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import usLogo from "../images/around-the-us-logo.png";
import * as auth from "../utils/auth";

const Login = ({ history, handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setFormData({
            email: "",
            password: "",
          });
          handleLogin(evt);
          history.push('/protected');
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="login-page">
      <section className="login">
        <div className="login__container">
          <img src={usLogo} alt="Logotipo around US" className="login__image" />
          <Link to="/" className="login__textEnter">
            Entrar
          </Link>
        </div>
        <hr className="login__line" />
      </section>

      <section className="login-info">
        <h1 className="login-info__tile">Entrar</h1>
        <form className="login-info__container" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            id="email-input"
            placeholder="E-mail"
            required
            className="login-info__input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            id="password-input"
            placeholder="Senha"
            required
            className="login-info__input"
            value={formData.password}
            onChange={handleChange}
          />

          <section className="login-action">
            <button className="login-action__button">Entrar</button>
            <Link to="/register" className="login-action__link">
              Ainda não é membro? Inscreva-se aqui!
            </Link>
          </section>
        </form>
      </section>
    </div>
  );
};

export default withRouter(Login);
