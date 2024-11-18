import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="text-center"
        style={{
          maxWidth: "500px",
          padding: "30px",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
        }}
      >
        <h1
          className="display-3 text-danger"
          style={{ fontSize: "5rem", fontWeight: "bold" }}
        >
          404
        </h1>
        <h2 className="text-secondary">Oops! Page Not Found</h2>
        <p className="text-muted" style={{ fontSize: "1.2rem" }}>
          The page you are looking for doesn't exist, or has been moved.
        </p>
        <div className="mt-4">
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Go to Dashboard
          </Link>
        </div>
        <div className="mt-3">
          <Link to="/" className="btn btn-outline-secondary btn-lg">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
