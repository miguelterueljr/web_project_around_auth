export const BASE_URL = 'https://register.nomoreparties.co';

//aqui é feito a solicitacao para registro de um novo usuario com seu email e senha
export const register = (email, password) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "email": email, "password": password}),
  })
    .then((response) => {
      return response.json();
    })
    .then((res)=> {
      return res;
    })
    .catch((err) => {
      console.error('Erro durante a requisição:', err);
      throw err; // Propaga o erro para quem chamou a função, para que possa ser tratado no componente Register
    });
}

//solicitaçao para login
export const authorize = (email, password) => {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({ "email": email, "password": password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
      } else {
        return;
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getContent = (token) => {
 return fetch (`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
 })
 .then(res => res.json())
 .then(data => data)
}