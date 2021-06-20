import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => (
  <div className="landing-page">
    <div className="container-actions">
      <div className="action">
        <div className="action-content">
          <NavLink
            to="/search"
            activeClassName="is-active"
          >
            find an <span className="boldItalic">Artifact</span>
          </NavLink>
        </div>
      </div>
      <div className="action">
        <div className="action-content">
          <NavLink
            to="/"
            activeClassName="is-active"
          >
            find a <span className="boldItalic">service / collaborator</span>
          </NavLink>
        </div>
      </div>
      <div className="action">
        <div className="action-content">
          <NavLink
            to="/offerArtifact"
            activeClassName="is-active"
          >
            offer an <span className="boldItalic">Artifact</span>
          </NavLink>
        </div>
      </div>
      <div className="action">
        <div className="action-content">
          <NavLink
            to="/"
            activeClassName="is-active"
          >
            offer a <span className="boldItalic">service / collaborator</span>
          </NavLink>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
