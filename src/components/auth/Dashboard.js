import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainForm from "../form/claimForm"; // Ensure this is the correct path

const AdminPanel = ({ onLogout }) => {
  const [showClaimForm, setShowClaimForm] = useState(false); // State to control form visibility

  const toggleClaimForm = () => {
    setShowClaimForm(!showClaimForm); // Toggle the form visibility
  };

  return (
    <div className="d-flex" id="adminPanel">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: "250px", minHeight: "100vh" }}>
        <div className="p-3">
          <h4>Admin Panel</h4>
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
      <div className="container-fluid p-4">
        <h2>Welcome to the Admin Panel</h2>
        <p>Here you can manage users, settings, products, and more.</p>

        {/* Dashboard Overview */}
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">120</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Products</h5>
                <p className="card-text">56</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Orders Today</h5>
                <p className="card-text">15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Button to show Claim Submission Form */}
        <button className="btn btn-primary mt-4" onClick={toggleClaimForm}>
          Submit a Claim
        </button>

        {/* Conditionally Render the Claim Submission Form */}
        {showClaimForm && <MainForm />}
      </div>
    </div>
  );
};

export default AdminPanel;
