function ImagePopup({ card, onClose, isOpen }) {
  const { link, name } = card;
  return (
    <div className={`popup popup_type_picture ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__zoom">
        <img className="popup__image" src={link} alt={name} />
        <p className="popup__caption">{name}</p>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
