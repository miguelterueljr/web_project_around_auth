import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUSerContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUSerContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  function handleChangeName(evt) {
    const value = evt.target.value;
    setName(value);
    setNameError(value.trim() === '' ? 'Nome é obrigatório' : '');
  }

  function handleChangeDescription(evt) {
    const value = evt.target.value;
    setDescription(value);
    setDescriptionError(value.trim() === '' ? 'Profissão é obrigatória' : '');
  }

  function validateForm() {
    setNameError(name.trim() === '' ? 'Nome é obrigatório' : '');
    setDescriptionError(description.trim() === '' ? 'Profissão é obrigatória' : '');
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (isFormValid) {
      props.onUpdateUser({
        name,
        about: description,
      });
    }
  }

  useEffect(() => {
    validateForm();
    setIsFormValid(name.trim() !== '' && description.trim() !== '');
  }, [name, description]);

  return (
    <PopupWithForm title='Editar Perfil' isOpen={props.isOpen} onClose={props.onClose} name='edit' edit='Edit profile' onSubmit={handleSubmit}>
      <form className="modal__form" noValidate onSubmit={handleSubmit}>
        <div className="modal__input-separation">
          <input
            type="text"
            id="name-input"
            className={`modal__input modal__input_name ${nameError ? 'modal__input-error_active' : ''}`}
            placeholder="Digite o nome do Usuário"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
            value={name}
          />
          {nameError && <span className={`name-input-error modal__input-error_active`}>{nameError}</span>}
        </div>
        <div className="modal__input-separation">
          <input
            type="text"
            id="job-input"
            className={`modal__input modal__input_job ${descriptionError ? 'modal__input-error_active' : ''}`}
            placeholder="Digite profissão do Usuário"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleChangeDescription}
          />
          {descriptionError && <span className={`job-input-error modal__input-error_active`}>{descriptionError}</span>}
        </div>
        <button className="modal__button modal__button-save" type="submit" disabled={!isFormValid}>
          Salvar
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
