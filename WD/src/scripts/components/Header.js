import React from "react";
import { NavLink } from "react-router-dom";
import { firebase, googleAuthProvider } from "../firebase/firebase";
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
              Home
            </NavLink>
          </h1>
          <div className="container-buttons-header">
            <button onClick={this.startLogout} className="button-header">
              Logout
            </button>
            <button onClick={this.startLogin} className="button-header">
              Login
            </button>
            <NavLink to="/profile" activeClassName="is-active">
              <img
                src="https://image.flaticon.com/icons/png/512/633/633780.png"
                className="icon-header"
                alt="Profile icon"
              />
            </NavLink>
            <NavLink to="/search" activeClassName="is-active">
              <img
                src="https://image.flaticon.com/icons/png/512/751/751463.png"
                className="icon-header"
                alt="Search icon"
              />
            </NavLink>
            <NavLink to="/fav" activeClassName="is-active">
              <img
                src="https://image.flaticon.com/icons/png/512/812/812327.png"
                className="icon-header"
                alt="Favorite icon"
              />
            </NavLink>
            <NavLink to="/messenger" activeClassName="is-active">
              <img
                src="https://image.flaticon.com/icons/png/512/1334/1334110.png"
                className="icon-header"
                alt="Messenge icon"
              />
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}
