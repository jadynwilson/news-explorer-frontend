import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header
        isMainPage={true}
        loggedIn={false}
        userName=""
        onSignInClick={() => {}}
        onSignOutClick={() => {}}
        onSearch={(kw) => console.log("searching for:", kw)}
      >
        <Navigation />
      </Header>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/saved-news">
          <SavedNews />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
