import buttonClose from '../images/close-icon.png';

function ImagePopup(props) {
  return (
    <div className={`modal-image ${props.card ? 'modal-image__active' : ''}`}>
      <button className="modal-image__button" onClick={props.onClose}>
        <img src={buttonClose} alt="Botão com imagem de x para fechar modal" />
      </button>
      {props.card && (
        <div className="modal-image__container">
          <img
            alt="imagem maximizada"
            className="modal-image__image"
            src={props.card.link}
          />
        </div>
      )}
      <h4 className="modal-image__title">{props.card ? props.card.name : ''}</h4>
    </div>
  );
}

export default ImagePopup;