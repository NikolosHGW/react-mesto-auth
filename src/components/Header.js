import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import logo from '../images/Vector.svg';
import LogHeader from "./LogHeader";

export default React.memo(({ email }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLoggOut = React.useCallback(() => {
    localStorage.removeItem('token');
    setIsOpen(false);
  }, []);

  return (
    <header className="header">
      {isOpen && (
        <LogHeader
          openedSelector=" header__login_opened"
          email={email}
          onLoggOut={handleLoggOut}
        />
      )}
      <div className="header__container">
        <a className="header__link" target="_blank" href="#">
          <img className="header__logo" src={logo} alt="логотип Место Россия"/>
        </a>
        <Route exact path="/">
          <LogHeader
            openedSelector=""
            email={email}
            onLoggOut={handleLoggOut}
          />
          {isOpen ? (
            <button
              className="header__menu-close-button"
              type="button"
              aria-label="close"
              onClick={() => setIsOpen(false)}
            ></button>
          ) : (
            <button
              className="header__menu-button"
              type="button"
              aria-label="open menu"
              onClick={() => setIsOpen(true)}
            >
              <span className="header__menu-line"></span>
            </button>
          )}
        </Route>
        <Route path="/sign-in">
          <Link
            className="header__nav-link header__nav-link_color"
            to="/sign-up"
          >Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link
            className="header__nav-link header__nav-link_color"
            to="/sign-in"
          >Войти</Link>
        </Route>
      </div>
    </header>
  );
});
