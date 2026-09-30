import { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import { searchArticles } from "./utils/NewsApi";
import "./App.css";

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | null

  function handleSearch(keyword) {
    setIsLoading(true);
    setError("");
    setHasSearched(true);
    setSearchKeyword(keyword);

    searchArticles(keyword)
      .then((results) => {
        setArticles(results);
      })
      .catch((err) => {
        console.error(err);
        setError("Sorry, something went wrong. Please try again later.");
        setArticles([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeModal() {
    setActiveModal(null);
  }

  return (
    <div className="app">
      <Header
        isMainPage={isMainPage}
        loggedIn={false}
        userName=""
        onSignInClick={() => setActiveModal("login")}
        onSignOutClick={() => {}}
        onSearch={handleSearch}
      />
      <Switch>
        <Route exact path="/">
          <Main
            articles={articles}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
            searchKeyword={searchKeyword}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNews />
        </Route>
      </Switch>
      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onSwitchToRegister={() => setActiveModal("register")}
        onLogin={(data) => console.log("login attempt:", data)}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={() => setActiveModal("login")}
        onRegister={(data) => console.log("register attempt:", data)}
      />
    </div>
  );
}

export default App;
