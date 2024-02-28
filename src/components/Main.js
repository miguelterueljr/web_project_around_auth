import { useState, useEffect, useContext } from 'react';

import editPhotoProfile from '../images/edit-photo-profile.png';
import buttonEdit from '../images/button-edit.png';
import addButton from '../images/add-button.png';

import Header from './Header';
import Footer from './Footer';
import Card from './Card';
import CurrentUSerContext from '../contexts/CurrentUserContext';


function Main(props) {
  //acesso valor do contexto atraves do hook useContext
  const currentUser = useContext(CurrentUSerContext);
  const initialCards = currentUser.initialCards;
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(props.cards);
  }, [props.cards]);


  return (
    <div>
      <main className="page">
        <Header />
        <section className="profile">
          <div className="profile__container">
            <div className="profile__image-overlay" onClick={props.onEditAvatarClick}>
              <img src={currentUser.currentUser ? currentUser.currentUser.avatar: 'Loading'} alt="Foto JAcques Costeau" className="profile__image" />
              <img src={editPhotoProfile} alt="Simbolo de editar a foto do profile" className="profile__edit-picture" />
            </div>
            <div className="profile__info">
              <div className="profile__title">
                <h1 className="profile__name">{currentUser.currentUser ? currentUser.currentUser.name : 'Loading...'}</h1>
                <button className="button button-edit" onClick={props.onEditProfileClick}><img src={buttonEdit} alt="Simbolo de um botão de editar" /></button>
              </div>
              <span className="profile__about">{currentUser.currentUser ? currentUser.currentUser.about : 'Loading...'}</span>
            </div>
          </div>
          <button className="button button-add" onClick={props.onAddPlaceClick}>
            <img src={addButton} alt="Botão com o símbolo mais, para adicionar um card" />
          </button>
        </section>

        <section className="elements">
          {cards.map((cardData, index) => (
            <Card
              key={cardData._id}
              title={cardData.name}
              image={cardData.link}
              likes={cardData.likes}
              owner={cardData.owner}
              id={cardData._id}
              onCardClick={() => props.onCardClick(cardData)}
              onCardLike={() => props.onCardLike(cardData)}
              onCardDelete={() => props.onCardDelete(cardData)}
              isLiked={cardData.likes.some(i => i._id === currentUser._id)}
            />
          ))}
        </section>
        <Footer />
      </main>
    </div>
  )
  
}

export default Main;
