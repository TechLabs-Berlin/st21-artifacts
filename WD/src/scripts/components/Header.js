import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <h1>Artifacts</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Home
    </NavLink>
    <br />
    <NavLink to="/page1" activeClassName="is-active">
      Page 1
    </NavLink>
    <br />
    <NavLink to="/page2" activeClassName="is-active">
      Page 2
    </NavLink>
    <br />
    <NavLink to="/page3" activeClassName="is-active">
      Page 3
    </NavLink>
    <br />
    <br />
  </header>
);

export default Header;
