import { Link } from "react-router-dom";

export default function LogHeader({ openedSelector, email, onLoggOut }) {
  return (
    <div className={`header__login${openedSelector}`}>
      <p className="header__email">{email}</p>
      <Link
        className="header__nav-link"
        to="/sign-in"
        onClick={onLoggOut}
      >Выйти</Link>
    </div>);
}
