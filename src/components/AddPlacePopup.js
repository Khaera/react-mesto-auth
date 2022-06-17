import React, { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  // стейт-переменная хранить в себе все состояние всех инпутов
  const [formValues, setFormValues] = useState({
    place: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    link: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  });

  useEffect(() => {
    setFormValues({
      place: {
        value: "",
        isValid: false,
        errorMessage: "",
      },
      link: {
        value: "",
        isValid: false,
        errorMessage: "",
      },
    });
  }, [isOpen]);

  function handleChange(e) {
    // деструктуризируем свойство target, получая значения инпутов и ошибки
    const { name, value, validity, validationMessage } = e.target;
    // устанавливаем новое состояние, обязательно совмещая с предыдущим
    // чтобы значения других инпутов не перезаписались на undefined
    setFormValues((prevState) => ({
      ...prevState,
      [name]: {
        ...formValues[name],
        value,
        isValid: validity.valid,
        errorMessage: validationMessage,
      },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: formValues.place.value,
      link: formValues.link.value,
    });

    setFormValues({
      place: {
        value: "",
        isValid: false,
        errorMessage: "",
      },
      link: {
        value: "",
        isValid: false,
        errorMessage: "",
      },
    });
  }

  const isValid = formValues.place.isValid && formValues.link.isValid;

  const spanPlaceErrorClassName = `popup__input-error ${
    formValues.place.errorMessage ? "popup__input-error_active" : ""
  }`;
  const inputPlaceErrorClassName = `popup__input ${
    formValues.place.errorMessage ? "popup__input_invalid" : ""
  }`;
  const spanLinkErrorClassName = `popup__input-error ${
    formValues.link.errorMessage ? "popup__input-error_active" : ""
  }`;
  const inputLinkErrorClassName = `popup__input ${
    formValues.link.errorMessage ? "popup__input_invalid" : ""
  }`;

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      submitButtonText={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__field">
        <input
          value={formValues.place.value}
          onChange={handleChange}
          id="place-input"
          name="place"
          type="text"
          className={inputPlaceErrorClassName}
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
        />
        <span className={spanPlaceErrorClassName}>
          {formValues.place.errorMessage}
        </span>
      </label>
      <label className="popup__field">
        <input
          value={formValues.link.value}
          onChange={handleChange}
          id="url-input"
          name="link"
          type="url"
          className={inputLinkErrorClassName}
          required
          placeholder="Ссылка на картинку"
        />
        <span className={spanLinkErrorClassName}>
          {formValues.link.errorMessage}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
