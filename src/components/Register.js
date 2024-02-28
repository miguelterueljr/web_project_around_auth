import { useState } from "react";
import { Link, withRouter, useHistory } from 'react-router-dom';

import usLogo from "../images/around-the-us-logo.png";
import * as auth from '../utils/auth';

function Register() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email:'',
    password: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevFormData) => ({
      ...prevFormData, //copia todas as prorpeidades do estando anterior do formulario, e adiciona um novo objeto que representa o novo estado do formulário mantendo a imutabildiades
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  
    const { email, password } = formData;
    auth.register(email, password)
      .then((res) => {
        if (res) {
          // Registro bem-sucedido
          console.log('Registro bem-sucedido:', res);
          // Redireciona o usuário para a página de login
          history.push("/login");
        } else {
          // Algo deu errado no registro
          console.error('Algo deu errado no registro');
        }
      })
      .catch((error) => {
        console.error('Erro durante o registro:', error);
      });
  }

  return (
    <div className="register-page">
      <section className="register">
        <div className="register__container">
            <img src={usLogo} alt="Logotipo around US" className="register__image" />
            <Link to='/login' className="register__textEnter">Faça o Login</Link>
          </div>
          <hr className="register__line" />
      </section>
        
      <section className='register-info'>
        <h1 className="register-info__title">Inscrever-se</h1>
        <form className="register-info__container" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            id="email-input"
            placeholder="E-mail"
            required
            className="register-info__input"
            onChange={handleChange}
            value={formData.email}
          />

          <input
            name="password" 
            type="password"
            id="password-input"
            placeholder="Senha"
            required
            className="register-info__input"
            onChange={handleChange}
            value={formData.password}  
          />

          <section className="register-action">
            <button className="register-action__button" type="submit">Inscrever-se</button>
            <Link to='/login' className="register-action__link">Já é um membro? Faça o Login aqui</Link>
          </section>
        </form>
      </section>
    </div>
  )
}

export default withRouter(Register);