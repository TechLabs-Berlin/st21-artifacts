import React from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import NotFoundPage from "../components/NotFoundPage";
import SearchPage from "../components/SearchPage";
import Messenger from "../components/Messenger";
import Fav from "../components/Favorites";
import Profile from "../components/Profile";
import OfferArtifact from "../components/OfferArtifact";
import { firebase } from "../firebase/firebase";

// dynamic routing with :id

export const history = createHistory();

// definition of routing that forbids access if not logged in
// ... in front of rest deleted ... compared to video, maybe put though of props not possible
// https://ui.dev/react-router-v4-protected-routes-authentication/
const PrivateRoute = ({ component: Component, rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !!firebase.auth().currentUser === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

// definition of routing
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
        <PrivateRoute path="/search" component={SearchPage} />
        <PrivateRoute path="/messenger" component={Messenger} />
        <PrivateRoute path="/fav" component={Fav} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/offerArtifact" component={OfferArtifact} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
