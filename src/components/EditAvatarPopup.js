import PopupWithForm from "./PopupWithForm";
import { useState, useRef, useContext } from "react";
import CurrentUSerContext from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUSerContext);
  const [avatar, setAvatar] = useState('');
  const avatarRef = useRef(null)
  
  /*
  useEffect(() => {
    // Verifique se currentUser está definido antes de acessar os dados, senao pode retornar null
    if (currentUser && currentUser.currentUser) {
      setAvatar(currentUser.currentUser.avatar);
    }
  }, [currentUser]);
  */

  function handleChangeAvatar (evt) {
    setAvatar(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }


  return (
    <PopupWithForm name='modal_photo' buttonclose='button-close' buttonclassetwo='button-close-photo' title='Alterar a foto do perfil' isOpen={props.isOpen} onClose = {props.onClose}>
      <form className="modal__form modal__form_add modal__form_editPhoto" noValidate onSubmit={handleSubmit}>
        <div className="modal__input-separation">
          <input type="url" 
            id="photo-input" 
            className="modal__input modal__input_link modal__input_save-photo" 
            placeholder="URL da Imagem" 
            required
            onChange={handleChangeAvatar}
            value={avatar} 
            ref={avatarRef}
          />
            
          <span className="url-input-error modal__input-error"></span>
        </div>
        <button className="modal__button modal__button-create modal__button_save" type="submit">Salvar</button> 
      </form>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;