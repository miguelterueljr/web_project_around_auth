//variaveis para uso na Api
const authorizationCode = "85c06b76-d1bb-40cc-b9fa-fda6b61002da";
const urlApi = "https://around.nomoreparties.co/v1/web_ptbr_04";

class Api {
  constructor() {
    this.authorization = authorizationCode;
    this.baseUrl = urlApi;
  }

  //metodo para pegar informaçoes do perfil
  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authorization
      }
    })
      .then(response => response.json())
      .catch(error => {
        console.error("Erro ao carregar as informações do perfil:", error);
        throw error;
      });
  }

  //pegar os cards iniciais
  fetchInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authorization
      }
    })
      .then(res => res.json())
      .catch((error) => {
        console.error("Erro ao buscar os cards iniciais:", error);
        return [];
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: {
        authorization: this.authorization
      }
    })
      .then(response => response.json())
      .catch(error => {
        console.error("Erro ao alterar o status de curtida do cartão:", error);
        throw error;
      });
  }

  // Método para excluir um cartão
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization
      }
    })
      .then(response => response.json())
      .catch(error => {
        console.error("Erro ao excluir o cartão:", error);
        throw error;
      });
  }

  // Método para atualizar as informações do perfil do usuário
  setUserInfo(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH', // método PATCH para atualizar as informações existentes
      headers: {
        'Content-Type': 'application/json',
        authorization: this.authorization,
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error("Erro ao atualizar as informações do perfil:", error);
        throw error;
      });
  }

  setUserAvatar(userData) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: this.authorization,
      },
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error("Erro ao atualizar o avatar do usuário:", error);
        throw error;
      });
  }

   // Método para adicionar um novo cartão
   addCard(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: this.authorization,
      },
      body: JSON.stringify({
        name: newCard.title,
        link: newCard.url,
      }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error("Erro ao adicionar um novo cartão:", error);
        throw error;
      });
    }
}

const apiInstance = new Api();
export default apiInstance;