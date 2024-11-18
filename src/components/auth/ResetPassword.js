import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for passwords
    if (!newPassword || !confirmPassword) {
      setError("Please enter both new password and confirm password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Assuming password is reset successfully
    setError(""); // Clear error
    setSuccessMessage("Your password has been reset successfully.");

    // Optionally, redirect user to login page after successful reset
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}
      >
        <div className="text-center mb-4">
          <h2 className="font-weight-bold text-primary">Reset Password</h2>
          <p className="text-muted">Enter a new password and confirm it.</p>
        </div>

        {/* Error message display */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Success message */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          {/* New Password field */}
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password field */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPasswordForm;
