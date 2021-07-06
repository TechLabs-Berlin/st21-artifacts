import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MobileNavBar = () => {
  const [ burgerToggle, setBurgerToggle ] = useState(false);
  const handleBurgerToggle = () => {
    setBurgerToggle(!burgerToggle);
  };
  return (
    <div className="mobile-nav-bar">
      <a className="burgerIcon" onClick={handleBurgerToggle}>
        <i className="fa fa-bars"></i>
      </a>
      <div className="burger-links" style={{ display: burgerToggle ? 'block' : 'none' }}>
        <div className="nav-bar-link">
          <NavLink to="/search" activeClassName="is-active">
            find items
          </NavLink>
        </div>
        <div className="nav-bar-link">
          <NavLink
            to="/offerArtifact"
            activeClassName="is-active"
          >
            offer items
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
