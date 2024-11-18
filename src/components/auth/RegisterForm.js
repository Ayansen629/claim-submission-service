import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { Link } from "react-router-dom";

// Password validation function
const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Check if password is valid
    if (!validatePassword(password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    } else {
      // Implement registration logic here (e.g., sending data to backend)
      console.log("User registered:", { username, email, firstName, lastName, phoneNumber, password });

      setError(""); // Clear any previous errors
      // After successful registration, navigate to login page
      navigate("/login"); // This redirects the user to the login page
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Register</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleRegister}>
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

            {/* First Name field */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Last Name field */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Phone Number field */}
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <div className="d-flex justify-content-center mt-3">
            <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
