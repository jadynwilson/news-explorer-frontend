import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

function Header({
  isMainPage,
  loggedIn,
  userName,
  onSignInClick,
  onSignOutClick,
  onSearch,
}) {
  return (
    <header
      className={`header ${isMainPage ? "header_theme_dark" : "header_theme_light"}`}
    >
      <div className="header__nav-bar">
        <div className="header__container">
          <p className="header__logo">NewsExplorer</p>
          <Navigation
            loggedIn={loggedIn}
            userName={userName}
            isMainPage={isMainPage}
            onSignInClick={onSignInClick}
            onSignOutClick={onSignOutClick}
          />
        </div>
      </div>
      {isMainPage && (
        <div className="header__hero">
          <h1 className="header__title">What&apos;s going on in the world?</h1>
          <p className="header__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      )}
    </header>
  );
}

export default Header;
