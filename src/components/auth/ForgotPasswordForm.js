import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for email
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Here you can add logic for sending reset password link (e.g., via email)
    setError(""); // Clear error
    setSuccessMessage("A reset password link has been sent to your email.");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}
      >
        <div className="text-center mb-4">
          <h2 className="font-weight-bold text-primary">Forgot Password</h2>
          <p className="text-muted">Enter your email to reset your password.</p>
        </div>

        {/* Error message display */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Success message */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Reset Password
          </button>
        </form>

        {/* Back to login link */}
        <div className="d-flex justify-content-center mt-4">
          <Link to="/login" className="btn btn-link text-muted">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
