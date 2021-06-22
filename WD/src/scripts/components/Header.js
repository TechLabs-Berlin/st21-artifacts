import React from "react";
import { NavLink } from "react-router-dom";
import { firebase, googleAuthProvider } from "../firebase/firebase";
import SearchBar from "../components/SearchBar";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.startLogin = this.startLogin.bind(this);
    this.startLogout = this.startLogout.bind(this);
  }
  startLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(() => {
        this.setState({
          loggedIn: true,
        });
      });
  };
  startLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          loggedIn: false,
        });
      });
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
            {this.state.loggedIn && (
              <button onClick={this.startLogout} className="button-header">
                Logout
              </button>
            )}
            {!this.state.loggedIn && (
              <button onClick={this.startLogin} className="button-header">
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
  }
}

/*             <NavLink to="/messenger" activeClassName="is-active">
              <i className="icofont-mail"></i>
            </NavLink> */
