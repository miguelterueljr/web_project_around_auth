import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef, useState } from "react";
import apiInstance from "../utils/api";

function AddPlacePopup(props) {

  const [cardTitle, setCardTitle] = useState('');
  const [cardUrl, setCardUrl] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [cardTitleError, setCardTitleError] = useState('');
  const [cardUrlError, setCardUrlError] = useState('');
  const titleRef = useRef();
  const urlRef = useRef();
  
  function handleChangeCardTitle (evt) {
    const value = evt.target.value;
    setCardTitle(value)
    setCardTitleError(value.trim() === '' ? 'Título do Card é obrigatório!' : '')
  }

  function handleChangeCardUrl(evt) {
    const value = evt.target.value;
    setCardUrl(value);
    setCardUrlError(value.trim() === '' ? 'URL é obrigatória' : '');
  }
  
  function validateForm() {
    setCardTitleError(cardTitle.trim() === '' ? 'Título do Card é obrigatório!' : '');
    setCardUrlError(cardUrl.trim() === '' ? 'URL é obrigatória' : '');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  
    if (isFormValid) {
      const newCard = {
        title: titleRef.current.value,
        url: urlRef.current.value
      };
  
      apiInstance
        .addCard(newCard)
        .then((addedCard) => {
          props.setCards((prevCards) => [addedCard, ...prevCards]);
          props.onClose();
        })
        .catch((error) => {
          console.error("Error adding card to API:", error);
        });
    }
  }

  useEffect(() => {
    validateForm();
    setIsFormValid(cardTitle.trim() !== '' && cardUrl.trim() !== '');
  }, [cardTitle, cardUrl]);
  
  return (
    <PopupWithForm name='modal-add' buttonclose='button-close' title='Novo Local' isOpen = {props.isOpen} onClose = {props.onClose}>
          <form className="modal__form modal__form_add" noValidate onSubmit={handleSubmit}>
            <div className="modal__input-separation">
              <input 
                type="text" 
                id="title-input" 
                className={`modal__input modal__input_name ${cardTitleError ? 'modal__input-error_active' : ''}`}
                placeholder="Título" 
                required 
                minLength="2" 
                maxLength="30"
                ref={titleRef} 
                onChange={handleChangeCardTitle}
              />
              {cardTitleError && <span className={`title-input-error modal__input-error_active`}>{cardTitleError}</span>}
              
            </div>
            <div className="modal__input-separation">
              <input 
                type="url" 
                id="url-input"
                className={`modal__input modal__input_link ${cardUrlError ? 'modal__input-error_active' : ''}`} 
                placeholder="URL da Imagem" 
                required 
                ref={urlRef}
                onChange={handleChangeCardUrl}
              />
              {cardUrlError && <span className={`url-input-error modal__input-error_active`}>{cardUrlError}</span>}
            </div>
            <button className="modal__button modal__button-create" type="submit" disabled={!isFormValid}>Criar</button> 
          </form>
        </PopupWithForm>
  )
}

export default AddPlacePopup;