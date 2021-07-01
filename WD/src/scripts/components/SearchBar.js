import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
  const handleFindService = useCallback(() => {
    alert('Functionality not available.');
  });
  const handleOfferService = useCallback(() => {
    alert('Functionality not available.');
  });

  return (
    <div className="search-bar">
      <NavLink
        to="/search"
        activeClassName="is-active"
        className="search-bar-nav"
      >
        <button className="search-bar-button">find items</button>
      </NavLink>
      <NavLink
        to="/offerArtifact"
        activeClassName="is-active"
        className="search-bar-nav"
      >
        <button className="search-bar-button">offer items</button>
      </NavLink>
      <NavLink to="" activeClassName="is-active" className="search-bar-nav">
        <button
          onClick={handleOfferService}
          className="search-bar-button"
        >
            find services
        </button>
      </NavLink>
      <NavLink to="" activeClassName="is-active" className="search-bar-nav">
        <button
          onClick={handleFindService}
          className="search-bar-button"
        >
            offer services
        </button>
      </NavLink>
    </div>
  );
};

export default SearchBar;
