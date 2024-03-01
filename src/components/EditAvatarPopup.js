import PopupWithForm from "./PopupWithForm";
import { useState, useRef, useContext, useEffect } from "react";
import CurrentUSerContext from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUSerContext);
  const [avatar, setAvatar] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const avatarRef = useRef(null)

  function handleChangeAvatar (evt) {
    const value = evt.target.value;
    setAvatar(value)
    setAvatarError(value.trim() === '' ? 'URL é obrigatória!' : '')
  }

  function validateForm() {
    setAvatarError(avatar.trim() === '' ? 'URL é obrigatória!' : '');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isFormValid) {
      props.onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    }
  }

  useEffect(() => {
    validateForm();
    setIsFormValid(avatar.trim() !== '');
  }, [avatar]);
  
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
            {avatarError && <span className={`url-input-error modal__input-error_active`}>{avatarError}</span>}
          
        </div>
        <button className={`modal__button modal__button-create modal__button_save ${!isFormValid ? 'modal__button-save' : ''}`} type="submit" disabled={!isFormValid}>Salvar</button>

      </form>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;