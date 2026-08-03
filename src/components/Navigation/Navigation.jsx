import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  loggedIn,
  userName,
  isMainPage,
  onSignInClick,
  onSignOutClick,
}) {
  return (
    <nav className="navigation">
      <Link
        to="/"
        className={`navigation__link ${isMainPage ? "navigation__link_active" : ""}`}
      >
        Home
      </Link>
      {loggedIn && (
        <Link to="/saved-news" className="navigation__link">
          Saved articles
        </Link>
      )}
      {loggedIn ? (
        <button
          type="button"
          className="navigation__user-pill"
          onClick={onSignOutClick}
        >
          <span>{userName}</span>
          <span className="navigation__logout-icon" aria-hidden="true">
            ⏏
          </span>
        </button>
      ) : (
        <button
          type="button"
          className="navigation__signin-btn"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
