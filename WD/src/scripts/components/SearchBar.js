import React from "react";
import { NavLink } from "react-router-dom";
export default class SearchBar extends React.Component {
  handleFindService = () => {
    alert("Functionality not available.");
  };
  handleOfferService = () => {
    alert("Functionality not available.");
  };
  render() {
    return (
      <div className="search-bar">
        <NavLink
          to="/search"
          activeClassName="is-active"
          className="search-bar-nav"
        >
          <button className="search-bar-button">find Artifacts</button>
        </NavLink>
        <NavLink
          to="/offerArtifact"
          activeClassName="is-active"
          className="search-bar-nav"
        >
          <button className="search-bar-button">offer Artifacts</button>
        </NavLink>
        <h2 className="search-bar-I">I</h2>
        <NavLink to="" activeClassName="is-active" className="search-bar-nav">
          <button
            onClick={this.handleOfferService}
            className="search-bar-button"
          >
            find services
          </button>
        </NavLink>
        <NavLink to="" activeClassName="is-active" className="search-bar-nav">
          <button
            onClick={this.handleFindService}
            className="search-bar-button"
          >
            offer services
          </button>
        </NavLink>
      </div>
    );
  }
}
