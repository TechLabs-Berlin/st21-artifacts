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
          <h1>Artifacts</h1>
          <div className="container-nav">
            <NavLink to="/" activeClassName="is-active" exact={true}>
              Home
            </NavLink>
            <NavLink to="/search" activeClassName="is-active">
              Search Page
            </NavLink>
            <NavLink to="/page1" activeClassName="is-active">
              Page 1
            </NavLink>
            <NavLink to="/page2" activeClassName="is-active">
              Page 2
            </NavLink>
          </div>
          <div className="container-buttons">
            <button onClick={this.startLogin}>Login</button>
            <button onClick={this.startLogout}>Logout</button>
          </div>
        </div>
        <br />
      </header>
    );
  }
}
