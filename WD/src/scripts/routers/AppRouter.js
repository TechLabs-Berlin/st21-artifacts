import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import NotFoundPage from '../components/NotFoundPage';
import SearchPage from '../components/SearchPage';
import Profile from '../components/Profile';
import OfferArtifact from '../components/OfferArtifact';
import { useIsLoggedIn, UserContextProvider } from '../context/user-context/UserContext';
import { ItemContextProvider } from '../context/item-context/ItemContext';

export const history = createHistory();

// definition of routing that forbids access if not logged in
const PrivateRoute = ({ component: Component, rest }) => {
  const isLoggedIn = useIsLoggedIn();
  if (!isLoggedIn) {
    // alert('You shoud login first');
    return (
      <Redirect to="/" />
    );
  }
  return (<Route
    {...rest}
    component={Component}
  />);
};

// definition of routing
const AppRouter = () => (
  <UserContextProvider>
    <ItemContextProvider>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={LandingPage} exact={true} />
            <PrivateRoute path="/search" component={SearchPage} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/offerArtifact" component={OfferArtifact} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </ItemContextProvider>
  </UserContextProvider>
);

export default AppRouter;
