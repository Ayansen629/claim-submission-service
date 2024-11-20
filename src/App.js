import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import Dashboard from "./components/auth/Dashboard";
import NotFound from "./components/auth/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication status when the app loads
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === "true") {
      setIsAuthenticated(true);  // User is authenticated
    }
  }, []);

  // To handle login action and set the isAuthenticated state
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");  // Store in localStorage

    // Optionally, set cookies related to the user session here
    Cookies.set("userSession", "active", { expires: 7 }); // Set a cookie for the session
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false"); // Remove authentication state

    // Clear cookies on logout
    Cookies.remove("userSession"); // Remove the session cookie
    Cookies.remove("formData");
    Cookies.remove("assignmentDetailsFormData"); 
    Cookies.remove("bankDetailsFormData"); 
  };

  return (
    <Router>
      <Routes>
        {/* Main Route (Redirect to login if not authenticated) */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={<LoginForm setIsAuthenticated={handleLogin} />}
        />

        {/* Register Route */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        {/* Dashboard Route (Only accessible after login) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-all Route for 404 Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
