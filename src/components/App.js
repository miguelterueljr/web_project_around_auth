import { useState, useEffect } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

/*Importação dos componentes*/
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import apiInstance from '../utils/api';
import CurrentUSerContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [initialCards, setInitialCards] = useState([]);
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const handleCardLike = (card) => {
    // Verifica se o card é undefined antes de acessar a propriedade likes
    if (!card) {
      console.error("Tentativa de curtir/descurtir um card undefined");
      return;
    }
  
    const isLiked = card.likes.some(i => i._id === currentUser._id);
  
    apiInstance.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(error => {
        console.error("Erro ao curtir/descurtir o card:", error);
      });
  };

  // Function to handle card delete
  const handleCardDelete = (card) => {
    apiInstance.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(error => {
        console.error("Erro ao deletar o card:", error);
      });
  };

  //funcao de adicionar ou remover opacidade
  const togglePageOpacity = () => {
    const page = document.querySelector('.page');
    page.classList.toggle('page_opacity');
  }
  
  //abre o modal para editar a foto do avatar
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    togglePageOpacity();
  }

  //abre modal para editar os dados do perfil
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    togglePageOpacity();
  }

  //abre modal para adicionar um card
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    togglePageOpacity();
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    togglePageOpacity()
  };

  //funcao para fechar os pop-ups
  const closeAllPopups = () => {
    togglePageOpacity();
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null)
    
  };

  const handleUpdateUser = (userData) => {
    apiInstance.setUserInfo(userData)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(error => {
        console.error("Erro ao atualizar o perfil do usuário:", error);
      });
  };

  const handleUpdateAvatar = (userData) => {
    apiInstance.setUserAvatar(userData)
      .then(updateAvatar => {
        setCurrentUser(updateAvatar)
        closeAllPopups()
      })
      .catch(error => {
        console.error("Erro ao atualiar a foto do avatar", error)
      })
  }

  //entender isso aqui melhor
  function onAddPlaceSubmit(newCard) {
    setCards([newCard, ...cards])
  }

  


  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true)
          history.push('/protected')
        }

      })
    }
  }

  const handleLogin = (evt) => {
    evt.preventDefault();
    setLoggedIn(true);
  };

  useEffect(() => {
    apiInstance.getProfile()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(error => {
        console.error("Erro ao buscar o perfil do usuário:", error);
      });

    
    apiInstance.fetchInitialCards()
      .then(cardData => {
        setCards(cardData);
      })
      .catch(error => {
        console.error("Erro ao buscar os cards iniciais:", error);
      });  
      
    tokenCheck();
  }, []);
  
  return (
    <>
      
      <Switch>
        
        <ProtectedRoute path='/protected' loggedIn={loggedIn}>
          <CurrentUSerContext.Provider value={{currentUser, initialCards}}>
            <div className='root'>
              {/*modal do edit-profile-->*/}
              <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose = {closeAllPopups} 
                onUpdateUser={handleUpdateUser}
              />

              {/*<!--modal do adicionar card-->*/}
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                setCards={setCards}
                onAddPlaceSubmit = {onAddPlaceSubmit}
              />
              

              {/*<!--modal de confirmação de delete card-->*/}
              <PopupWithForm name='modal-delete' buttonclose='button-close' buttonclassetwo='modal__button-close_close' title='Tem certeza ?'>
                <button className="modal__button modal__button-create modal__button_confirm" type="submit">Sim</button> 
              </PopupWithForm>

              {/*<!--modal de alterar foto do perfil-->*/}
              <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />

              <ImagePopup card={selectedCard} onClose={closeAllPopups} />

              <Main 
                onEditProfileClick = {handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick= {handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}  // Pass cards as a prop
                onCardLike={handleCardLike}  // Pass like handler as a prop
                onCardDelete={handleCardDelete}  // Pass delete handler as a prop
              />

            </div>
          </CurrentUSerContext.Provider>
        </ProtectedRoute>
        
        <Route path='/login'>
          <Login handleLogin={handleLogin}/>
        </Route>

        <Route path='/register'>
          <Register />
        </Route>
        
        <Route>
          {loggedIn ? <Redirect to='/protected' /> : <Redirect to='/Login' />}
        </Route>

      </Switch>
    </>
  );
}

export default App;
