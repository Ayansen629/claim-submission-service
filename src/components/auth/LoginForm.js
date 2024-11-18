import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dummy credentials for demonstration
  const validCredentials = { username: "admin", password: "password123" };

  // Check if user is already authenticated from localStorage
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === "true") {
      navigate("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // Validate if username or password is empty
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Check if credentials are correct
    if (username === validCredentials.username && password === validCredentials.password) {
      // Set authentication state and persist login status
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Store authentication status
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}
      >
        <div className="text-center mb-4">
          <h2 className="font-weight-bold text-primary">Login</h2>
          <p className="text-muted">Welcome back! Please enter your credentials to continue.</p>
        </div>

        {/* Error message display */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          {/* Username field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>

        {/* Links to Register and Forgot Password */}
        <div className="d-flex justify-content-between mt-4">
          <Link to="/forgot-password" className="btn btn-link text-muted">
            Forgot Password?
          </Link>
          <Link to="/register" className="btn btn-link text-muted">
            New user? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
