import successImage from "../images/success.svg";
import unsuccessImage from "../images/unsuccess.svg";

function InfoTooltip({ isOpen, onClose, success, successText, errorText }) {
  return (
    <div className={`popup popup_type_tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-image"
          src={success ? successImage : unsuccessImage}
          alt={success ? "Успешно" : "Неуспешно"}
        />
        <h2 className="popup__title popup__title_tooltip">
          {success ? successText : errorText}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
