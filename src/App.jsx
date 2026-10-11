import { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import RegisterSuccessModal from "./components/RegisterSuccessModal/RegisterSuccessModal";
import { searchArticles } from "./utils/NewsApi";
import * as mainApi from "./utils/MockMainApi";
import "./App.css";

const TOKEN_KEY = "jwt";

function App() {
  const location = useLocation();
  const history = useHistory();
  const isMainPage = location.pathname === "/";

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isAuthLoading, setIsAuthLoading] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_KEY)),
  );

  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | 'success' | null
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const loggedIn = Boolean(currentUser);

  // On load, restore the session from the saved token
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    mainApi
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        return mainApi.getSavedArticles(token);
      })
      .then((saved) => setSavedArticles(saved))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setIsAuthLoading(false));
  }, []);

  // Open the login popup when a protected page redirects here
  useEffect(() => {
    if (location.state && location.state.requireLogin) {
      setActiveModal("login");
    }
  }, [location]);

  function closeModal() {
    setActiveModal(null);
    setLoginError("");
    setRegisterError("");
  }

  function handleSearch(keyword) {
    setIsLoading(true);
    setError("");
    setHasSearched(true);
    setSearchKeyword(keyword);

    searchArticles(keyword)
      .then((results) => setArticles(results))
      .catch((err) => {
        console.error(err);
        setError(
          "Sorry, something went wrong during the request. Please try again later.",
        );
        setArticles([]);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister(data) {
    setRegisterError("");
    mainApi
      .register(data)
      .then(() => setActiveModal("success"))
      .catch((message) => setRegisterError(message));
  }

  function handleLogin(credentials) {
    setLoginError("");
    mainApi
      .login(credentials)
      .then(({ token }) => {
        localStorage.setItem(TOKEN_KEY, token);
        return mainApi.checkToken(token).then((user) => {
          setCurrentUser(user);
          return mainApi.getSavedArticles(token);
        });
      })
      .then((saved) => {
        setSavedArticles(saved);
        closeModal();
      })
      .catch(() => setLoginError("Something went wrong. Please try again."));
  }

  function handleSignOut() {
    localStorage.removeItem(TOKEN_KEY);
    setCurrentUser(null);
    setSavedArticles([]);
    history.push("/");
  }

  function handleSaveArticle(article) {
    const token = localStorage.getItem(TOKEN_KEY);
    mainApi
      .saveArticle(token, { ...article, keyword: searchKeyword })
      .then((saved) => setSavedArticles((prev) => [...prev, saved]))
      .catch(console.error);
  }

  function handleDeleteArticle(article) {
    const token = localStorage.getItem(TOKEN_KEY);
    mainApi
      .deleteArticle(token, article.url)
      .then(() =>
        setSavedArticles((prev) =>
          prev.filter((item) => item.url !== article.url),
        ),
      )
      .catch(console.error);
  }

  return (
    <div className="app">
      <Header
        isMainPage={isMainPage}
        loggedIn={loggedIn}
        userName={currentUser ? currentUser.name : ""}
        onSignInClick={() => setActiveModal("login")}
        onSignOutClick={handleSignOut}
        onSearch={handleSearch}
      />
      <Switch>
        <Route exact path="/">
          <Main
            articles={articles}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
            loggedIn={loggedIn}
            savedArticles={savedArticles}
            onSaveClick={handleSaveArticle}
            onRemoveClick={handleDeleteArticle}
          />
        </Route>
        <ProtectedRoute
          path="/saved-news"
          loggedIn={loggedIn}
          isAuthLoading={isAuthLoading}
        >
          <SavedNews
            savedArticles={savedArticles}
            userName={currentUser ? currentUser.name : ""}
            onRemoveClick={handleDeleteArticle}
          />
        </ProtectedRoute>
      </Switch>
      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onSwitchToRegister={() => setActiveModal("register")}
        onLogin={handleLogin}
        submitError={loginError}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={() => setActiveModal("login")}
        onRegister={handleRegister}
        submitError={registerError}
      />
      <RegisterSuccessModal
        isOpen={activeModal === "success"}
        onClose={closeModal}
        onSignInClick={() => setActiveModal("login")}
      />
    </div>
  );
}

export default App;
