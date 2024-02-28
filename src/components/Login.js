import React, { Component } from "react";
import usLogo from "../images/around-the-us-logo.png";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: "",
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state.formData)
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = this.state.formData;
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        console.log("Response data:", data);
        if (data.token) {
          this.setState({
            formData: {
              email: "",
              password: "",
            },
          }, () => {
            this.props.handleLogin(evt);
            this.props.history.push('/protected')
          });
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  render() {
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
          <form className="login-info__container" onSubmit={this.handleSubmit}>
            <input
              name="email"
              type="email"
              id="email-input"
              placeholder="E-mail"
              required
              className="login-info__input"
              value={this.state.formData.email}
              onChange={this.handleChange}
            />
            <input
              name="password"
              type="password"
              id="password-input"
              placeholder="Senha"
              required
              className="login-info__input"
              value={this.state.formData.password}
              onChange={this.handleChange}
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
  }
}

export default withRouter(Login);
