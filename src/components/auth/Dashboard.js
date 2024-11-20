import React from "react";
import { Link } from "react-router-dom";
import MainForm from "../form/claimForm"; // Ensure this is the correct path

const AdminPanel = ({ onLogout }) => {
  return (
    <div className="d-flex" id="adminPanel">
      {/* Sidebar */}
      <div
        className="sidebar p-3"
        style={{
          width: "250px",
          backgroundColor: "#f8f9fa",
          height: "100vh",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center text-primary mb-4">Claim Submission Form</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-secondary">
              Dashboard
            </Link>
          </li>
         
          <li className="nav-item mb-2">
            <Link to="#" className="nav-link text-danger" onClick={onLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        className="main-content flex-fill p-4"
        style={{
          backgroundColor: "#fdfdfd",
          minHeight: "100vh",
        }}
      >
        <h2 className="text-primary">Claim Submission Form</h2>

        {/* Always show the Claim Submission Form */}
        <div className="claim-form-container">
          <MainForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
