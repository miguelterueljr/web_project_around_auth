import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";
import apiInstance from "../utils/api";

function AddPlacePopup(props) {
  const titleRef = useRef();
  const urlRef = useRef();
  
  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('teste')

    //aqui so to definindo um objeto com o titulo que vem do current e a sua respectiva url
    //falta eu enviar para a api e criar o card
    //fazer isso fazendo uma solicitacao a api
    //rendereizando na nova pagina  usando useEffect ??
    const newCard = {
      title: titleRef.current.value,
      url: urlRef.current.value
    }

    
    apiInstance.addCard(newCard)
    .then((addedCard) => {
      props.setCards((prevCards) => [addedCard, ...prevCards]);
      props.onClose()
    })
    .catch((error) => {
      console.error("Error adding card to API:", error);
      
    });
    
  }
  return (
    <PopupWithForm name='modal-add' buttonclose='button-close' title='Novo Local' isOpen = {props.isOpen} onClose = {props.onClose}>
          <form className="modal__form modal__form_add" noValidate onSubmit={handleSubmit}>
            <div className="modal__input-separation">
              <input 
                type="text" 
                id="title-input" 
                className="modal__input modal__input_title" 
                placeholder="Título" 
                required 
                minLength="2" 
                maxLength="30"
                ref={titleRef} 
              />
              <span className="title-input-error modal__input-error"></span>
            </div>
            <div className="modal__input-separation">
              <input 
                type="url" 
                id="url-input" 
                className="modal__input modal__input_link" 
                placeholder="URL da Imagem" 
                required 
                ref={urlRef}
              />
              <span className="url-input-error modal__input-error"></span>
            </div>
            <button className="modal__button modal__button-create" type="submit">Criar</button> 
          </form>
        </PopupWithForm>
  )
}

export default AddPlacePopup;