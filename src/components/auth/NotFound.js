// NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
