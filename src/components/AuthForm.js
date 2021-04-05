import React from "react";

export default function AuthForm({ title, name, textButton, onSubmit, children }) {
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(evt) {
    const { name, value } = evt.target
    setUserData({
      ...userData,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = userData;
    onSubmit(email, password);
    setUserData({email: '', password: ''});
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">{title}</h2>
      <form
        className="auth__form"
        name={name}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="auth__input-text">
          <label className="auth__field">
            <input
              id="email-input"
              // className={`auth__input auth__input_el_email${
              //   info.nameValidMessage ? ' popup__input_type_error' : ''}`}
              className="auth__input"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              type="email"
              name="email"
              required
              minLength="2"
              maxLength="40"
            />
            {/* <span className={`popup__input-error name-input-error${
              info.nameValid ? '' : ' popup__input-error_active'}`}
            >
              {info.nameValid ? '' : info.nameValidMessage}
            </span> */}
          </label>
          <label className="auth__field">
            <input
              id="password-input"
              // className={`auth__input auth__input_el_job${
              //   info.descriptionValidMessage ? ' auth__input_type_error' : ''}`}
              className="auth__input"
              placeholder="Пароль"
              value={userData.password}
              onChange={handleChange}
              type="password"
              name="password"
              required
              minLength="2"
              maxLength="200"
            />
            {/* <span className={`popup__input-error job-input-error${
              info.descriptionValid ? '' : ' popup__input-error_active'}`}
            >
              {info.descriptionValid ? '' : info.descriptionValidMessage}
            </span> */}
          </label>
        </fieldset>
        <button
          // className={`auth__save-button${
          //   isValid ? '' : ' auth__save-button_inactive'}`}
          className="auth__save-button"
          // disabled={!isValid}
          type="submit"
        >
          {/* {isLoading ? (
            <div className="popup__spinner"></div>
            ) : textButton} */}
          {textButton}
        </button>
      </form>
      {children}
    </div>
  );
}
