import buttonClose from '../images/close-icon.png';

//componente de janela modal que informa ao usuario se ele foi registrado com sucesso

function InfoToolTip(props) {
  return (
    <div className={`modal ${props.isOpen ? 'modal-opened' : ''}`}>
      <button className={`modal__button-close ${props.buttonclose}`} onClick={props.onClose}><img src={buttonClose} alt='Icone em formato de x, simbolizando fechar' /></button>
      <div className={`modal__container ${props.container}`}>
        <img src={props.image} className="modal__image-infotip" />
        <p className='modal__tooltip-text'>{props.text}</p>
      </div>
    </div>
  )
}

export default InfoToolTip;