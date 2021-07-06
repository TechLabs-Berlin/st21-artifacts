import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { firebase, googleAuthProvider } from '../firebase/firebase';
import SearchBar from '../components/SearchBar';
import { useIsLoggedIn } from '../context/user-context/UserContext';
import MobileNavBar from './MobileNavBar';

const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const startLogin = useCallback(() => {
    firebase
        .auth()
        .signInWithPopup(googleAuthProvider);
  }, []);
  const startLogout = useCallback(() => {
    firebase
        .auth()
        .signOut();
  }, []);
  return (
    <header>
      <div className="container-header">
        <NavLink
          className="home-header"
          to="/"
          activeClassName="is-active"
          exact={true}
        >
          <img
            src={require('../../../public/images/artifacts logo.svg')}
            className="header-Artifacts"
          />
        </NavLink>
        <SearchBar />
        <MobileNavBar />
        <div className="container-buttons-header">
          {isLoggedIn ? (
            <button onClick={startLogout} className="button-header">
              Logout
            </button>
          ) : (
            <button onClick={startLogin} className="button-header">
              Login
            </button>
          )}
          <NavLink to="/profile" activeClassName="is-active">
            <i className="icofont-ui-user"></i>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
