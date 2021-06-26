import React from 'react';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h3 className="landing-header">Welcome to Artifacts</h3>
      <div className="container-actions">
        <NavLink to="/search" className="action">
          <img
            className="landing-picture-linked"
            src="https://thumbs.dreamstime.com/b/minimal-camera-isolated-pastel-pink-background-photography-concept-d-rendering-184683455.jpg"
          />
          <div className="landing-overlay">
            Find <span className="boldItalic">Artifacts</span>
          </div>
        </NavLink>
        <div className="action">
          <img
            className="landing-picture"
            src="https://image.freepik.com/free-photo/abstract-geometric-shape-with-minimal-style-pastel-color-use-cosmetic-products-presentations-3d-rendering-illustration_61337-216.jpg"
          />
          <div className="landing-overlay">
            Find <span className="boldItalic">Services</span>
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
            Offer <span className="boldItalic">Artifacts</span>
          </div>
        </NavLink>
        <div className="action">
          <img
            className="landing-picture"
            src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/05/5-2.jpg"
          />
          <div className="landing-overlay">
            Offer <span className="boldItalic">Services</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
