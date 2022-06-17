import likeImage from "../images/like.svg";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  //проверяем кто создал карточку
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_visible" : "element__delete-button_hidden"
  }`;

  //проверяем кто лайкнул карточку
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-image ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleClickCard() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClickCard}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <button type="button" className="element__like">
          <img
            src={likeImage}
            alt="Кнопка Лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element__like-count">{card.likes.length}</span>
        </button>
      </div>
    </li>
  );
}

export default Card;
