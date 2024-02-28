import deleteIcon from '../images/delete-icon.png'
import likeButton from '../images/like-button.svg'
import { useContext, useEffect } from 'react';
import CurrentUSerContext from '../contexts/CurrentUserContext';

//preciso fazer com q o contexto funcione
function Card (props) {
  const myId = "436e74c115dfe006750ac205"
  //acessa dados do usuario atual 
  const currentUser = useContext(CurrentUSerContext);
  const isOwn = props.owner._id === myId
  const cardDeleteButtonClassName = `element__delete ${isOwn ? 'element__delete_active' : 'element__delete'}`;

  //variavel que pega os likes de cada card, iterando sobre o array e verificando se é igual ao meu Id
  const isLiked = props.likes.some((like) => like._id === myId)
  const cardLikeButtonClassName = `element__button ${isLiked ? 'element__button_active': ''}`
  
  return (
    <article className="element">
      <img className="element__image" alt={`Imagem de ${props.title}`} src={props.image} onClick={props.onCardClick}/>
      <button className={cardDeleteButtonClassName} onClick={props.onCardDelete}>
        <img src={deleteIcon} alt="botão em formato de delete" />
      </button>
      <div className="element__text">
        <h3 className="element__title">{props.title}</h3>
        <div className="element__text_liked">
          <button className="element__button" onClick={props.onCardLike}>
            <img src={likeButton} alt="Símbolo de curtir no formato de coração." className={cardLikeButtonClassName} />
          </button>
          <p className="element__number">{props.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;