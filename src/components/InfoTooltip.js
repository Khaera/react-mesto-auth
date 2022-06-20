import React from "react";
import successImage from "../images/success.svg";
import unsuccessImage from "../images/unsuccess.svg";

function InfoTooltip({ isOpen, onClose, success }) {
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}>
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
          {success
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
