import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found">
    <h1>404 - Page not found</h1>
    <h3>Bring me back to</h3>
    <Link to="/">
      <img
        src={require('../../../public/images/artifacts logo.svg')}
        className="headline-Artifacts"
      />
    </Link>
  </div>
);

export default NotFoundPage;
