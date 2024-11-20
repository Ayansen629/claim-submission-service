import React from "react";
import MainForm from "../form/claimForm";

const AdminPanel = ({ onLogout }) => {
  return (
    <div className="d-flex flex-column" id="adminPanel">
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #ddd",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)", // Increased shadow intensity and spread
        }}
        
      >
        {/* Left: Circular Logo and Header Text */}
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#f0f0f0",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src="../img/claim-logo.png" // Replace with your logo's path
              alt="Logo"
              style={{ width: "30px", height: "30px", objectFit: "contain" }}
            />
          </div>
          <div>
            <h4
              className="m-0"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
                textTransform: "capitalize",
              }}
            >
              Claim Submission
            </h4>
            <p
              className="m-0"
              style={{
                fontSize: "14px",
                color: "#777",
                marginTop: "4px",
                textTransform: "capitalize",
              }}
            >
              Service
            </p>
          </div>
        </div>

        {/* Right: User Menu */}
        <div className="dropdown">
          <img
            src="../img/computer-img.webp" // Replace with your profile icon's path
            alt="User"
            className="rounded-circle"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              border: "1px solid #ddd",
            }}
            id="userMenuDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="userMenuDropdown"
            style={{ minWidth: "150px" }}
          >
            <li>
              <button className="dropdown-item">My Profile</button>
            </li>
            <li>
              <button className="dropdown-item">Change Password</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Main Content Area */}
      <div
        className="main-content flex-fill p-4"
        style={{
          backgroundColor: "#fdfdfd",
          minHeight: "100vh",
        }}
      >
        {/* Title Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5
            className="m-0"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#333",
              textTransform: "capitalize",
            }}
          >
            My application
          </h5>
          <div
            className="d-flex align-items-center"
            style={{
              borderBottom: "1px solid #ccc",
              paddingBottom: "5px",
              width: "300px",
            }}
          >
            <label
              htmlFor="applicationNo"
              style={{ fontSize: "14px", marginRight: "10px", color: "#555" }}
            >
              Application No:
            </label>
            <input
              id="applicationNo"
              type="text"
              placeholder="Enter Application No"
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "14px",
                color: "#333",
              }}
            />
          </div>
        </div>

        {/* Content Placeholder */}
        <div>
          <p>WorkList Applications:</p>
          <MainForm/>
         
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
