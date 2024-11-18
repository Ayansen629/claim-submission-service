import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Forgot Password</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
