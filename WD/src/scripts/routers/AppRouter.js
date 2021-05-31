import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import NotFoundPage from "../components/NotFoundPage";
import Page1 from "../components/Page1";
import Page2 from "../components/Page2";
import SearchPage from "../components/SearchPage";

// dynamic routing with :id

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/search" component={SearchPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
