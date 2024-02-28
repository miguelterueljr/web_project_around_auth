import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUSerContext from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUSerContext)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  // Função para lidar com o envio do formulário
  function handleSubmit(evt) {
    evt.preventDefault();
    
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title='Editar Perfil' isOpen = {props.isOpen} onClose = {props.onClose} name='edit' edit='Edit profile' onSubmit={handleSubmit}>
          <form className="modal__form" noValidate onSubmit={handleSubmit}>
            <div className="modal__input-separation">
              <input 
                type="text" 
                id="name-input" 
                className="modal__input modal__input_name" 
                placeholder="Digite o nome do Usuário" 
                required 
                minLength="2" 
                maxLength="40" 
                onChange={handleChangeName} 
                value={name}/>
              <span className="name-input-error modal__input-error"></span>
            </div>
            <div className="modal__input-separation">
              <input type="text" id="job-input" className="modal__input modal__input_job" placeholder="Digite profissão do Usuário" required minLength="2" maxLength="200" value={description} onChange={handleChangeDescription}/>
              <span className="job-input-error modal__input-error"></span>
            </div>
            <button className="modal__button modal__button-save" type="submit">Salvar</button>
          </form>
        </PopupWithForm>
  )
}

export default EditProfilePopup;  