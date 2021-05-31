import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import NotFoundPage from "../components/NotFoundPage";
import SearchPage from "../components/SearchPage";
import Messenger from "../components/Messenger";
import Fav from "../components/Favorites";
import Profile from "../components/Profile";

// dynamic routing with :id

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
        <Route path="/search" component={SearchPage} />
        <Route path="/messenger" component={Messenger} />
        <Route path="/fav" component={Fav} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
