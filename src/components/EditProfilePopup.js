import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  // стейт-переменная хранить в себе все состояние всех инпутов
  const [formValues, setFormValues] = useState({
    name: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    description: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
  });

  React.useEffect(() => {
    setFormValues({
      name: {
        value: currentUser.name,
        isValid: true,
        errorMessage: "",
      },
      description: {
        value: currentUser.about,
        isValid: true,
        errorMessage: "",
      },
    });
  }, [currentUser, isOpen]);

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
    onUpdateUser({
      name: formValues.name.value,
      about: formValues.description.value,
    });
  }

  const isValid = formValues.name.isValid && formValues.description.isValid;

  const spanNameErrorClassName = `popup__input-error ${
    !formValues.name.isValid ? "popup__input-error_active" : ""
  }`;
  const inputNameErrorClassName = `popup__input ${
    formValues.name.errorMessage ? "popup__input_invalid" : ""
  }`;
  const spanDescriptionErrorClassName = `popup__input-error ${
    !formValues.description.isValid ? "popup__input-error_active" : ""
  }`;
  const inputDescriptionErrorClassName = `popup__input ${
    formValues.description.errorMessage ? "popup__input_invalid" : ""
  }`;

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      submitButtonText={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__field">
        <input
          value={formValues.name.value || ""}
          onChange={handleChange}
          id="name-input"
          name="name"
          type="text"
          className={inputNameErrorClassName}
          minLength="2"
          maxLength="40"
          required
          placeholder="Ваше имя"
        />
        <span className={spanNameErrorClassName}>
          {formValues.name.errorMessage}
        </span>
      </label>
      <label className="popup__field">
        <input
          value={formValues.description.value || ""}
          onChange={handleChange}
          id="about-input"
          name="description"
          type="text"
          className={inputDescriptionErrorClassName}
          minLength="2"
          maxLength="200"
          required
          placeholder="Род деятельности"
        />
        <span className={spanDescriptionErrorClassName}>
          {formValues.description.errorMessage}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
