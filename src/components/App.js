import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import MobileBurgerMenu from "./MobileBurgerMenu";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../utils/api";

function App() {
  const location = useLocation();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState({
    email: ""
  });
  const [success, setSuccess] = useState(false); //успешная регистрация
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    id: ""
  });
  const [cards, setCards] = useState([]);

  //проверка токена 1 раз при отрисовке страницы
  useEffect(() => {
    tokenCheck();
  }, []);

  //если залогинены, то редирект на /
  useEffect(() => {
    history.push("/");
  }, [loggedIn]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setIsConfirmDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function toggleBurgerMenuClick() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  function handleLogin({ email, password }) {
    auth
      .authorize({ email, password })
      .then((data) => {
        if (!data) {
          return console.log("Что-то пошло не так!");
        }

        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserEmail({
            email: email
          });
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch(() => {
        setIsTooltipPopupOpen(true);
        setSuccess(false);
      });
  }

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then(() => {
        setIsTooltipPopupOpen(true);
        setSuccess(true);
        history.push("/sign-in");
      })
      .catch(() => {
        setIsTooltipPopupOpen(true);
        setSuccess(false);
      });
  }

  function handleSignout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/sign-in");
    setIsBurgerMenuOpen(false);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((response) => {
          if (response) {
            setUserEmail({
              email: response.data.email
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err}`));
    }
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editUserInfo({ name, about })
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .editProfileAvatar({ avatar })
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setTimeout(() => setSelectedCard({ name: "", link: "" }), 700); //добавление задержки перед обнулением карточки, иначе картинка обнуляется раньше закрытия попапа
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MobileBurgerMenu
        loggedIn={loggedIn}
        onSignout={handleSignout}
        userEmail={userEmail}
        location={location}
        isOpen={isBurgerMenuOpen}
      />
      <Header
        loggedIn={loggedIn}
        onSignout={handleSignout}
        userEmail={userEmail}
        location={location}
        onBurgerClick={toggleBurgerMenuClick}
        isOpen={isBurgerMenuOpen}
      />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onDeleteClick={handleDeleteClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          loggedIn={loggedIn}
        />
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegister} history={history} />
        </Route>
      </Switch>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <DeleteCardPopup
        card={selectedCard}
        isOpen={isConfirmDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        isLoading={isLoading}
      />

      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        isOpen={isImagePopupOpen}
      />

      <InfoTooltip
        isOpen={isTooltipPopupOpen}
        onClose={closeAllPopups}
        success={success}
      />
      {loggedIn && <Footer />}
    </CurrentUserContext.Provider>
  );
}

export default App;
