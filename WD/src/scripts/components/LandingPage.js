import React from 'react';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <h3>Welcome to</h3>
        <img
          src={require('../../../public/images/artifacts logo.svg')}
          className="headline-Artifacts"
        />
      </div>
      <div className="container-actions">
        <NavLink to="/search" className="action">
          <img
            className="landing-picture-linked"
            src="https://i.pinimg.com/564x/53/7b/15/537b15cb6e0115e90dc8c55987b1db48.jpg"
          />
          <div className="landing-overlay">
            <span className="boldItalic">Find </span> Items
          </div>
        </NavLink>
        <div className="action">
          <img
            className="landing-picture"
            src="https://image.freepik.com/free-photo/abstract-geometric-shape-with-minimal-style-pastel-color-use-cosmetic-products-presentations-3d-rendering-illustration_61337-216.jpg"
          />
          <div className="landing-overlay">
            <span className="boldItalic">Find </span> Services
          </div>
        </div>
      </div>
      <div className="container-actions">
        <NavLink to="/offerArtifact" className="action">
          <img
            className="landing-picture-linked"
            src="https://cdn.pixabay.com/photo/2018/05/28/12/10/headphones-3435888_1280.jpg"
          />
          <div className="landing-overlay">
            <span className="boldItalic">Offer </span> Items
          </div>
        </NavLink>
        <div className="action">
          <img
            className="landing-picture"
            src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/05/5-2.jpg"
          />
          <div className="landing-overlay">
            <span className="boldItalic">Offer </span> Services
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
