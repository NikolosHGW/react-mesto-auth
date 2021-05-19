export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const options = {
  baseUrl: 'http://localhost:3001',
  optionsForFetch: {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  },
};
