import React from "react";
import { useHistory } from "react-router";
import { authorize } from "../utils/auth";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";

export default React.memo(({ onLogin }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const history = useHistory();

  const handleClose = React.useCallback(() => setIsOpen(false), []);

  function handleSubmit(email, password) {
    authorize(email, password)
      .then(res => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          onLogin();
          history.push('/');
        }
        else {
          return Promise.reject('Почему-то не нашелся token.');
        }
      })
      .catch(res => {
        setIsOpen(true);
        console.log(res);
      });
  }

  return (
    <>
      <AuthForm
        title="Вход"
        name="login"
        textButton="Войти"
        onSubmit={handleSubmit}
      />
      <InfoTooltip
        isOpen={isOpen}
        onClose={handleClose}
        isSuccess={false}
      />
    </>
  );
});
