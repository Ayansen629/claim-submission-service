import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import Dashboard from "./components/auth/Dashboard";
import NotFound from "./components/auth/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication status when the app loads
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
          }
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
              <Dashboard />
            ) : (
              <LoginForm setIsAuthenticated={setIsAuthenticated} />
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
