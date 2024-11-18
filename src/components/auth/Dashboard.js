import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainForm from "../form/claimForm"; // Ensure this is the correct path

const AdminPanel = ({ onLogout }) => {
  const [showClaimForm, setShowClaimForm] = useState(false); // State to control form visibility
  const [showNotification, setShowNotification] = useState(true); // Show Claim Submission Notification

  const toggleClaimForm = () => {
    setShowClaimForm(!showClaimForm); // Toggle the form visibility
  };

  const closeNotification = () => {
    setShowNotification(false); // Close notification after clicking "Got it"
  };

  return (
    <div className="d-flex" id="adminPanel">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: "250px", minHeight: "100vh", borderRadius: "8px 0 0 8px" }}>
        <div className="p-4">
          <h4 className="text-center mb-4">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/settings">
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container-fluid p-5" style={{ flex: 1 }}>
        <h2 className="text-primary">Welcome to the Admin Panel</h2>
        <p className="text-muted mb-4">Here you can manage users, settings, products, and more.</p>

        {/* Show Claim Submission Notification */}
        {showNotification && (
          <div className="alert alert-info d-flex justify-content-between align-items-center">
            <span>Need to submit a claim? Click below to get started.</span>
            <button onClick={closeNotification} className="btn btn-sm btn-outline-dark">
              Got it!
            </button>
          </div>
        )}

        {/* Dashboard Overview */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">120</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Total Products</h5>
                <p className="card-text">56</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Orders Today</h5>
                <p className="card-text">15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button for Claim Form */}
        <div className="d-flex justify-content-center mt-4">
          <button
            onClick={toggleClaimForm}
            className="btn btn-lg btn-success rounded-circle shadow-lg position-fixed"
            style={{
              width: "60px",
              height: "60px",
              bottom: "20px",
              right: "20px",
              zIndex: 999,
              fontSize: "30px",
            }}
          >
            <i className="bi bi-file-earmark-plus"></i>
          </button>
        </div>

        {/* Conditionally Render the Claim Submission Form */}
        {showClaimForm && <MainForm />}
      </div>
    </div>
  );
};

export default AdminPanel;
