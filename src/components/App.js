import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { checkToken } from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [selectedCardForDelete, setSelectedCardForDelete] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState({isLoggedIn: false, loggedEmail: ''});
  const history = useHistory();

  React.useEffect(() => {
    api.getInfoUser()
    .then(data => {
      setCurrentUser({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id
      });
    })
    .catch(res => console.log(res));
  }, []);

  React.useEffect(() => {
    api.getInitialCard()
      .then(data => {
        setCards(data);
      })
      .catch(res => console.log(res));
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      checkToken(token)
        .then(data => {
          console.log(data);
          setLoggedIn({isLoggedIn: true, loggedEmail: data.data.email});
          history.push('/');
        })
        .catch(res => console.log(res));
    }
  }, [history, localStorage.getItem('token')]);

  function handleCardLike(card) {
    const isLiked = card.likes
      .some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(prevState => prevState
          .map(c => c._id === card._id ? newCard : c));
      })
      .catch(res => console.log(res));
  }
  function handleCardDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setSelectedCardForDelete(card);
  }
  function handleConfirmCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(prevState => prevState
          .filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch(res => console.log(res));
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(false);
  }
  function handleUpdateUser({ name, about }) {
    api.setInfoUser(name, about)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          'name': res.name,
          'about': res.about
        });
        closeAllPopups();
      })
      .catch(res => console.log(res));
  }
  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar(avatar)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          'avatar': res.avatar,
        });
        closeAllPopups();
      })
      .catch(res => console.log(res));
  }
  function handleAddPlaceSubmit({ name, link }) {
    api.createCard({name, link})
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(res => console.log(res))
  }

  const handleLogin = React.useCallback(() => setLoggedIn(prev => ({...prev, isLoggedIn: true})), []);

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header email={loggedIn.loggedEmail} />
      <Switch>
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn.isLoggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register />
        </Route>
      </Switch>
      <Footer />
    </div>

    <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
    />

    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
    />

    <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    <ConfirmDeletePopup
      isOpen={isConfirmDeletePopupOpen}
      onClose={closeAllPopups}
      onConfirmCardDelete={handleConfirmCardDelete}
      card={selectedCardForDelete}
    />

    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
    />

  </CurrentUserContext.Provider>
  );
}

export default App;
