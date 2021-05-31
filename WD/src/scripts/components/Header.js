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
              className="home"
              to="/"
              activeClassName="is-active"
              exact={true}
            >
              Home
            </NavLink>
          </h1>
          <div className="container-buttons">
            <div>
              <button onClick={this.startLogin}>Login</button>
              <button onClick={this.startLogout}>Logout</button>
            </div>
            <div>
              <NavLink to="/messenger" activeClassName="is-active">
                <img src="../../../public/images/mail.png" />
              </NavLink>
              <NavLink to="/fav" activeClassName="is-active">
                <img src="../../../public/images/heart.png" />
              </NavLink>
              <NavLink to="/search" activeClassName="is-active">
                <img src="../../../public/images/search.png" />
              </NavLink>
              <NavLink to="/profile" activeClassName="is-active">
                <img src="../../../public/images/face.png" />
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
