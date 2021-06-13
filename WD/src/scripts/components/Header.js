import React from "react";
import { NavLink } from "react-router-dom";
import { firebase, googleAuthProvider } from "../firebase/firebase";
import SearchBar from "../components/SearchBar";

export default class Header extends React.Component {
  startLogin = () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  };
  startLogout = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <header>
        <div className="container-header">
          <h1>
            <NavLink
              className="home-header"
              to="/"
              activeClassName="is-active"
              exact={true}
            >
              Artifacts
            </NavLink>
          </h1>
          <SearchBar />
          <div className="container-buttons-header">
            <button onClick={this.startLogout} className="button-header">
              Logout
            </button>
            <button onClick={this.startLogin} className="button-header">
              Login
            </button>
            <NavLink to="/profile" activeClassName="is-active">
              <i className="icofont-ui-user"></i>
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}

/*             <NavLink to="/messenger" activeClassName="is-active">
              <i className="icofont-mail"></i>
            </NavLink> */

/* <NavLink to="/fav" activeClassName="is-active">
  <i className="icofont-heart"></i>
</NavLink>; */
