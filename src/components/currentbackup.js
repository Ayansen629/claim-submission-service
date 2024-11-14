import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import {  FaDownload } from "react-icons/fa";

const BootstrapForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  
  } = useForm();

  const [displayName, setDisplayName] = useState(""); // state to hold the display name
  const creditorType = watch("creditorType"); 
  const creditorID = watch("creditorID"); // Observe the selected value of creditorID
  const willAttend = watch("willAttend");
  const isRelatedParty = watch("isRelatedParty");
  const indianBanks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "IndusInd Bank",
    "Yes Bank",
    "Union Bank of India",
    "IDFC First Bank",
    "Indian Bank",
    "Central Bank of India",
    "Bank of India",
    "UCO Bank",
    "Indian Overseas Bank",
    "Bank of Maharashtra",
    "Punjab & Sind Bank",
    "Federal Bank",
    "South Indian Bank",
    "RBL Bank",
    "Karnataka Bank",
   
  ];

  const [pageNumber, setPageNumber] = React.useState(1); // Current page number
  const userId = 1; // User ID, for the API call
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Handle file input change
  const onFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setUploadedFiles(filePreviews);
  }

  const onSubmit = async (data) => {
    let name = "";

    if (creditorType === "individual") {
      // Use individual name
      name = data.individualName;
    } else if (creditorType === "organization") {
      // Use organization name
      name = data.organizationName;
    }
    
    setDisplayName(name); // Update the display name state
    const requestData = {
      RequestInfo: {},
      claimMstDetailsModel: {
        id: "claim123",
        creditorId: "creditor123",
        creditorIdType: data.creditorID,
        typeOfCreditor: data.creditorType,
        relatedParty: data.isRelatedParty,
        remarks: data.remarks,
        relationshipNature: data.natureOfRelationship,
        claimAppNum: data.claimAppNum || "",
        orgMstDetails: data.creditorType === "organization" ? {
          id: "org123",
          claimMst: "claim123",
          organizationName: data.organizationName,
          constitutionDetails: data.legalConstitution,
          isCinOrLlp: data.isCinOrLlp,
          registeredAddress: data.registeredAddress,
          emailId: data.emailAddress,
          authorizedFirstName: data.firstName,
          authorizedMiddleName: data.middleName,
          authorizedLastName: data.lastName,
          authorizedPersonDesignation: data.designation,
          authorizedPersonContactNumber: data.mobileNumber,
          authorizationLetter: data.authorizationLetter,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        } : null,
        individualCreditorMstDetails: data.creditorType === "individual" ? {
          id: "indiv123",
          claimMst: "claim123",
          name: data.name,
          creditorAddress: data.address,
          emailId: data.emailAddress,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        } : null,
        bankMstDetails: {
          id: "bank123",
          claimMst: "claim123",
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          ifscCode: data.ifsc,
          micrCode: data.micr,
          branchName: data.branch,
          swiftCode: data.swiftCode,
          scannedDocumentId: "",
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        },
        securityMstDetails: {
          claimMst: "claim123",
          id: "sec123",
          securityType: data.securityType,
          securityPersonName: data.securityPersonName,
          securityPersonPan: data.securityPersonPan,
          securityDetails: data.securityDetails,
          rocChargeId: data.rocChargeId,
          cersaiSecurityId: data.cersaiSecurityId,
          priorityOfChange: data.priorityOfChange,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        },
        assignmentMstDetails: {
          claimMst: "claim123",
          id: "assign123",
          assignorName: data.assignorName,
          assignorPan: data.assignorPan,
          assignmentDate: Date.now(),
          assignedAmount: data.assignedAssigned,
          remarks: data.assignmentRemarks,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        },
        auditDetails: {
          createdBy: "admin",
          createdTime: Date.now(),
          lastModifiedBy: "admin",
          lastModifiedTime: Date.now(),
        },
      },
    };
    
  
    try {
      const response = await axios.post(
        `https://localhost:8080/claim/step?userId=${userId}&pageNumber=${pageNumber}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Data saved successfully");
        setPageNumber((prevPage) => prevPage + 1);
      } else {
        console.log("Error saving data:", response.status);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };
  

 

  return (
    <div className="container mt-5 bigForm">
      <div className="row justify-content-center">
      <div className="col-xs-12 col-sm-10 col-md-3 col-lg-3 mb-3">
          <div className="bg-upload p-3 p-lg-4">
            <h5 className="text-center">Uploaded Images</h5>
            {uploadedFiles.length > 0 ? (
              <div className="d-flex flex-column align-items-center mt-3 gap-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-2 shadow-sm p-2 rounded"
                    style={{
                      width: "100%",
                      maxWidth: "150px",
                      border: "1px solid #ddd",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={file.url}
                      alt={file.name}
                      style={{ width: "40px", height: "40px", borderRadius: "5px" }}
                    />
                    <p
                      className="small mb-0 flex-grow-1 text-truncate"
                      title={file.name}
                      style={{ maxWidth: "80px" }}
                    >
                      {file.name}
                    </p>
                    <a href={file.url} download={file.name} className="text-decoration-none">
                      <FaDownload size={16} color="#007bff" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center">No uploaded images yet.</p>
            )}
          </div>
        </div>
    
        <div className="col-xs-12 col-sm-10 col-md-9 col-lg-9">
          <div className="card p-4 p-lg-5 shadow-lg" style={{ borderRadius: "15px" }}>
            <h2 className="text-center text-primary mb-5">
              Creditor Information Form
            </h2>
            <h5 className="mb-4">PART A- DETAILS OF CREDITOR</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Display Name Field */}

              
            
              <div className="mb-4">
                <label htmlFor="displayName" className="form-label text-muted">
                  Display Name  :
                  {displayName && (
                   <p>{displayName}</p>
                )}
                </label>

              
              </div>

              {/* Creditor ID Dropdown */}
              <div className="row mb-3">
                <label htmlFor="creditorID" className="col-sm-2 col-form-label">
                  Creditor ID
                </label>
                <div className="col-sm-10">
                  <select
                    id="creditorID"
                    className={`form-select ${errors.creditorID ? "is-invalid" : ""
                      }`}
                    {...register("creditorID", {
                      required: "Creditor ID is required",
                    })}
                  >
                    <option value="">Select ID Type</option>
                    <option value="pan">PAN</option>
                    <option value="aadhar">Aadhar</option>
                  </select>
                </div>
                {errors.creditorID && (
                  <div className="invalid-feedback">
                    {errors.creditorID.message}
                  </div>
                )}

              </div>

              
              {/* Conditional Input for PAN or Aadhar Number */}
              {creditorID && (
                <div className="mb-3">
                  <label htmlFor="idNumber" className="form-label text-muted">
                    {creditorID === "pan" ? "PAN Number" : "Aadhar Number"}
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    className={`form-control ${errors.idNumber ? "is-invalid" : ""}`}
                    {...register("idNumber", {
                      required: `${creditorID === "pan" ? "PAN" : "Aadhar"} Number is required`,
                      pattern: {
                        value: creditorID === "pan"
                          ? /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
                          : /^[0-9]{12}$/,
                        message: creditorID === "pan"
                          ? "Invalid PAN format"
                          : "Aadhar must be 12 digits",
                      },
                    })}
                  />
                  {errors.idNumber && (
                    <div className="invalid-feedback">
                      {errors.idNumber.message}
                    </div>
                  )}
                </div>
              )}
            


              

              {/* Type of Creditor Radio Buttons */}
              <div className="mb-4">
                <label className="form-label text-muted">
                  Type of Creditor
                </label>
                <div>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="individual"
                      value="individual"
                      className="form-check-input rBtn"
                      {...register("creditorType", {
                        required: "Please select a creditor type",
                      })} />
                    <label class="form-check-label" for="inlineRadio1">Individual</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input " type="radio" id="organization"
                      value="organization"
                      className="form-check-input rBtn"
                      {...register("creditorType", {
                        required: "Please select a creditor type",
                      })} />
                    <label class="form-check-label" for="inlineRadio2">Organization</label>
                  </div>

                </div>
               
                {errors.creditorType && (
                  <div className="invalid-feedback d-block">
                    {errors.creditorType.message}
                  </div>
                )}
              </div>

              {/* Conditional Fields for Organization */}
              {creditorType === "organization" && (
  <div className="border p-3 rounded bg-light mb-4">
    <h5 className="text-muted" data-bs-toggle="collapse" data-bs-target="#organization" aria-expanded="false" aria-controls="organization">Organization Details</h5>
    <div id="organization" className="collapse">
      
      {/* Organization Name */}
      <div className="mb-4">
        <label htmlFor="organizationName" className="form-label text-muted">
          Name of Organization
        </label>
        <input
          type="text"
          id="organizationName"
          className={`form-control ${errors.organizationName ? "is-invalid" : ""}`}
          placeholder="Enter organization name"
          {...register("organizationName", {
            required: "Organization name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Organization name should not contain numbers or special characters",
            },
          })}
        />
        {errors.organizationName && (
          <div className="invalid-feedback">
            {errors.organizationName.message}
          </div>
        )}
      </div>

      {/* Legal Construction */}
      <div className="mb-4">
        <label htmlFor="legalConstruction" className="form-label text-muted">
          Legal Construction
        </label>
        <select
          id="legalConstruction"
          className={`form-select ${errors.legalConstruction ? "is-invalid" : ""}`}
          {...register("legalConstruction", {
            required: "Legal construction is required",
          })}
        >
          <option value="">Select Type</option>
          <option value="privateLtd">Private Ltd. Company</option>
          {/* Add more options as needed */}
        </select>
        {errors.legalConstruction && (
          <div className="invalid-feedback">
            {errors.legalConstruction.message}
          </div>
        )}
      </div>

      {/* Choose CIN or LLP */}
      <div className="mb-4">
        <label className="form-label text-muted">Choose CIN or LLP</label>
        <div className="d-flex">
          <div className="form-check me-3">
            <input
              type="radio"
              id="cin"
              value="cin"
              className="form-check-input"
              {...register("cinOrLlp", { required: "Please select CIN or LLP" })}
            />
            <label className="form-check-label" htmlFor="cin">CIN</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="llp"
              value="llp"
              className="form-check-input"
              {...register("cinOrLlp", { required: "Please select CIN or LLP" })}
            />
            <label className="form-check-label" htmlFor="llp">LLP</label>
          </div>
        </div>
        {errors.cinOrLlp && (
          <div className="invalid-feedback d-block">
            {errors.cinOrLlp.message}
          </div>
        )}
      </div>

      {/* Registered Address */}
      <div className="mb-4">
        <label htmlFor="registeredAddress" className="form-label text-muted">
          Registered Address
        </label>
        <input
          type="text"
          id="registeredAddress"
          className={`form-control ${errors.registeredAddress ? "is-invalid" : ""}`}
          placeholder="Enter registered address"
          {...register("registeredAddress", {
            required: "Registered address is required",
          })}
        />
        {errors.registeredAddress && (
          <div className="invalid-feedback">
            {errors.registeredAddress.message}
          </div>
        )}
      </div>

      {/* Email Address */}
      <div className="mb-4">
        <label htmlFor="emailAddress" className="form-label text-muted">
          Email Address
        </label>
        <input
          type="email"
          id="emailAddress"
          className={`form-control ${errors.emailAddress ? "is-invalid" : ""}`}
          placeholder="Enter email address"
          {...register("emailAddress", {
            required: "Email address is required",
            pattern: {
              value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.emailAddress && (
          <div className="invalid-feedback">
            {errors.emailAddress.message}
          </div>
        )}
      </div>

      {/* Authorized Person Name */}
      <div className="mb-4">
        <label className="form-label text-muted">Name of Authorized Person</label>
        <div className="row">
          <div className="col">
            <input
              type="text"
              id="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="First name"
              {...register("firstName", {
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "First name should not contain numbers or special characters",
                },
              })}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
          </div>

          <div className="col">
            <input
              type="text"
              id="middleName"
              className={`form-control ${errors.middleName ? "is-invalid" : ""}`}
              placeholder="Middle name"
              {...register("middleName", {
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Middle name should not contain numbers or special characters",
                },
              })}
            />
            {errors.middleName && <div className="invalid-feedback">{errors.middleName.message}</div>}
          </div>

          <div className="col">
            <input
              type="text"
              id="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Last name"
              {...register("lastName", {
                required: "Last name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Last name should not contain numbers or special characters",
                },
              })}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
          </div>
        </div>
      </div>

      {/* Designation */}
      <div className="mb-4">
        <label htmlFor="designation" className="form-label text-muted">
          Designation
        </label>
        <input
          type="text"
          id="designation"
          className={`form-control ${errors.designation ? "is-invalid" : ""}`}
          placeholder="Enter designation"
          {...register("designation", {
            required: "Designation is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Designation should not contain numbers or special characters",
            },
          })}
        />
        {errors.designation && (
          <div className="invalid-feedback">
            {errors.designation.message}
          </div>
        )}
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label htmlFor="mobileNumber" className="form-label text-muted">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobileNumber"
          className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`}
          placeholder="Enter mobile number"
          {...register("mobileNumber", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Mobile number should be 10 digits",
            },
          })}
        />
        {errors.mobileNumber && (
          <div className="invalid-feedback">
            {errors.mobileNumber.message}
          </div>
        )}
      </div>

      {/* Authorization Letter */}
      <div className="mb-4">
                <label htmlFor="authorizationLetter" className="form-label text-muted">
                  Authorization Letter
                </label>
                <input
                  type="file"
                  id="authorizationLetter"
                  className={`form-control ${errors.authorizationLetter ? "is-invalid" : ""}`}
                  multiple
                  {...register("authorizationLetter", {
                    required: "At least one authorization letter is required",
                  })}
                  onChange={onFileChange}
                />
                {errors.authorizationLetter && (
                  <div className="invalid-feedback">
                    {errors.authorizationLetter.message}
                  </div>
                )}
              </div>
    </div>
  </div>
)}



              {/* Conditional Fields for Individual */}
              {
  creditorType === "individual" && (
    <div className="border p-3 rounded bg-light mb-4">
      <h5
        className="text-muted"
        data-bs-toggle="collapse"
        data-bs-target="#individual"
        aria-expanded="false"
        aria-controls="individual"
      >
        Individual Details
      </h5>
      <div id="individual" className="collapse">
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="form-label text-muted">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Enter name"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/, // Only allows letters and spaces
                message: "Name must not contain numbers or special characters",
              },
            })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label htmlFor="address" className="form-label text-muted">
            Address
          </label>
          <input
            type="text"
            id="address"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            placeholder="Enter address"
            {...register("address", {
              required: "Address is required",
            })}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}
        </div>

        {/* Mobile Number Field */}
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="form-label text-muted">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`}
            placeholder="Enter mobile number"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^\d{10}$/, // Ensures only 10-digit numbers
                message: "Mobile number must be exactly 10 digits",
              },
            })}
          />
          {errors.mobileNumber && (
            <div className="invalid-feedback">
              {errors.mobileNumber.message}
            </div>
          )}
        </div>

        {/* Email Address Field */}
        <div className="mb-4">
          <label htmlFor="emailAddress" className="form-label text-muted">
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            className={`form-control ${errors.emailAddress ? "is-invalid" : ""}`}
            placeholder="Enter email address"
            {...register("emailAddress", {
              required: "Email address is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // Basic email format validation
                message: "Invalid email address format",
              },
            })}
          />
          {errors.emailAddress && (
            <div className="invalid-feedback">
              {errors.emailAddress.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


              <div className="mb-4">
                <label className="form-label text-muted">Will the authorized person attend the COC?</label>

                <div className="d-flex">
                  {/* YES Option */}
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      id="attendYes"
                      value="yes"
                      className="form-check-input"
                      {...register("willAttend", { required: "Please select YES or NO" })}
                    />
                    <label className="form-check-label" htmlFor="attendYes">
                      YES
                    </label>
                  </div>

                  {/* NO Option */}
                  <div className="form-check">
                    <input
                      type="radio"
                      id="attendNo"
                      value="no"
                      className="form-check-input"
                      {...register("willAttend", { required: "Please select YES or NO" })}
                    />
                    <label className="form-check-label" htmlFor="attendNo">
                      NO
                    </label>
                  </div>
                </div>

                {errors.willAttend && (
                  <div className="invalid-feedback d-block">
                    {errors.willAttend.message}
                  </div>
                )}
              </div>

              {/* Conditional Fields for Proposed Member Details */}
              {willAttend === "no" && (
                <div className="mt-3">
                  <label className="form-label text-muted">Details of Proposed Member</label>

                  {/* Name Field */}
                  <input
                    type="text"
                    id="proposedMemberName"
                    className={`form-control mt-2 ${errors.proposedMemberName ? "is-invalid" : ""}`}
                    placeholder="Enter name of proposed member"
                    {...register("proposedMemberName", { required: "Proposed member name is required" })}
                  />
                  {errors.proposedMemberName && (
                    <div className="invalid-feedback">
                      {errors.proposedMemberName.message}
                    </div>
                  )}

                  {/* Designation Field */}
                  <input
                    type="text"
                    id="proposedMemberDesignation"
                    className={`form-control mt-2 ${errors.proposedMemberDesignation ? "is-invalid" : ""}`}
                    placeholder="Enter designation of proposed member"
                    {...register("proposedMemberDesignation", { required: "Designation is required" })}
                  />
                  {errors.proposedMemberDesignation && (
                    <div className="invalid-feedback">
                      {errors.proposedMemberDesignation.message}
                    </div>
                  )}

                  {/* Mobile Number Field */}
                  <input
                    type="text"
                    id="proposedMemberMobile"
                    className={`form-control mt-2 ${errors.proposedMemberMobile ? "is-invalid" : ""}`}
                    placeholder="Enter mobile number"
                    {...register("proposedMemberMobile", {
                      required: "Mobile number is required",
                      pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number" }
                    })}
                  />
                  {errors.proposedMemberMobile && (
                    <div className="invalid-feedback">
                      {errors.proposedMemberMobile.message}
                    </div>
                  )}

                  {/* Email Address Field */}
                  <input
                    type="email"
                    id="proposedMemberEmail"
                    className={`form-control mt-2 ${errors.proposedMemberEmail ? "is-invalid" : ""}`}
                    placeholder="Enter email address"
                    {...register("proposedMemberEmail", {
                      required: "Email address is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" }
                    })}
                  />
                  {errors.proposedMemberEmail && (
                    <div className="invalid-feedback">
                      {errors.proposedMemberEmail.message}
                    </div>
                  )}

                  {/* Authorization Letter Field */}
                  <label className="form-label text-muted mt-3">Authorization Letter (Attach a copy)</label>
                  <input
                    type="file"
                    id="authorizationLetter"
                    className={`form-control ${errors.authorizationLetter ? "is-invalid" : ""}`}
                    {...register("authorizationLetter", { required: "Authorization letter is required" })}
                  />
                  {errors.authorizationLetter && (
                    <div className="invalid-feedback">
                      {errors.authorizationLetter.message}
                    </div>
                  )}
                </div>
              )}

              {/* Related Party - YES/NO */}
              <div className="mb-4">
                <label className="form-label text-muted">Is this a related party to the Corporate Debtor (CD)?</label>

                <div className="d-flex">
                  {/* YES Option */}
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      id="relatedPartyYes"
                      value="yes"
                      className="form-check-input"
                      {...register("isRelatedParty", { required: "Please select YES or NO" })}
                    />
                    <label className="form-check-label" htmlFor="relatedPartyYes">
                      YES
                    </label>
                  </div>

                  {/* NO Option */}
                  <div className="form-check">
                    <input
                      type="radio"
                      id="relatedPartyNo"
                      value="no"
                      className="form-check-input"
                      {...register("isRelatedParty", { required: "Please select YES or NO" })}
                    />
                    <label className="form-check-label" htmlFor="relatedPartyNo">
                      NO
                    </label>
                  </div>
                </div>

                {errors.isRelatedParty && (
                  <div className="invalid-feedback d-block">
                    {errors.isRelatedParty.message}
                  </div>
                )}
              </div>

              {/* Nature of Relationship Dropdown */}
              {isRelatedParty === "yes" && (
                <div className="mb-4">
                  <label className="form-label text-muted">Nature of Relationship (as per definition u/s 5(24))</label>
                  <select
                    id="natureOfRelationship"
                    className={`form-control ${errors.natureOfRelationship ? "is-invalid" : ""}`}
                    {...register("natureOfRelationship", { required: "Please select the nature of relationship" })}
                  >
                    <option value="">Select a clause</option>
                    <option value="clause1">Clause 1 - Description</option>
                    <option value="clause2">Clause 2 - Description</option>
                    <option value="clause3">Clause 3 - Description</option>
                    {/* Add more options as per the clauses defined in u/s 5(24) */}
                  </select>

                  {errors.natureOfRelationship && (
                    <div className="invalid-feedback">
                      {errors.natureOfRelationship.message}
                    </div>
                  )}
                </div>
              )}

              {/* Remarks Field */}
              <div className="mb-4">
                <label className="form-label text-muted">Remarks (brief nature of relationship)</label>
                <textarea
                  id="remarks"
                  className={`form-control ${errors.remarks ? "is-invalid" : ""}`}
                  placeholder="Enter remarks here"
                  {...register("remarks", {
                    required: "Remarks are required",
                  })}
                ></textarea>

                {errors.remarks && (
                  <div className="invalid-feedback">
                    {errors.remarks.message}
                  </div>
                )}
              </div>

              {/* Bank Details Section Heading */}
              <h4 className="mb-3 text-muted" data-bs-toggle="collapse" data-bs-target="#bank" aria-expanded="false" aria-controls="bank">Bank Details</h4>
              <div className="p-3 rounded bg-light mb-4 collapse" id="bank">
  {/* IFSC Code */}
  <div className="mb-4">
    <label className="form-label text-muted">IFSC Code</label>
    <input
      type="text"
      className={`form-control ${errors.ifsc ? "is-invalid" : ""}`}
      placeholder="Enter IFSC Code"
      {...register("ifsc", {
        required: "IFSC code is required",
        pattern: {
          value: /^[A-Z]{4}0[A-Z0-9]{6}$/, // IFSC code format: 4 letters, '0', 6 alphanumeric characters
          message: "Invalid IFSC code format",
        },
      })}
    />
    {errors.ifsc && <div className="invalid-feedback">{errors.ifsc.message}</div>}
  </div>

  {/* MICR Code */}
  <div className="mb-4">
    <label className="form-label text-muted">MICR Code</label>
    <input
      type="text"
      className={`form-control ${errors.micr ? "is-invalid" : ""}`}
      placeholder="Enter MICR Code"
      {...register("micr", {
        required: "MICR code is required",
        pattern: {
          value: /^\d{9}$/, // MICR code format: 9-digit numeric
          message: "MICR code must be a 9-digit number",
        },
      })}
    />
    {errors.micr && <div className="invalid-feedback">{errors.micr.message}</div>}
  </div>

  {/* Bank Name Dropdown */}
  <div className="mb-4">
    <label className="form-label text-muted">Bank Name</label>
    <select
      className={`form-control ${errors.bankName ? "is-invalid" : ""}`}
      {...register("bankName", { required: "Bank name is required" })}
    >
      <option value="">Select Bank</option>
      {indianBanks.map((bank, index) => (
        <option key={index} value={bank}>
          {bank}
        </option>
      ))}
    </select>
    {errors.bankName && <div className="invalid-feedback">{errors.bankName.message}</div>}
  </div>

  {/* Branch */}
  <div className="mb-4">
    <label className="form-label text-muted">Branch</label>
    <input
      type="text"
      className={`form-control ${errors.branch ? "is-invalid" : ""}`}
      placeholder="Enter Branch Name"
      {...register("branch", {
        required: "Branch name is required",
        pattern: {
          value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
          message: "Branch name must not contain numbers or special characters",
        },
      })}
    />
    {errors.branch && <div className="invalid-feedback">{errors.branch.message}</div>}
  </div>

  {/* Account Number */}
  <div className="mb-4">
    <label className="form-label text-muted">Account Number</label>
    <input
      type="text"
      className={`form-control ${errors.accountNumber ? "is-invalid" : ""}`}
      placeholder="Enter Account Number"
      {...register("accountNumber", {
        required: "Account number is required",
        pattern: {
          value: /^\d{9,18}$/, // Common length for account numbers is between 9 and 18 digits
          message: "Account number must be 9 to 18 digits",
        },
      })}
    />
    {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber.message}</div>}
  </div>

  {/* SWIFT Code (only for foreign accounts) */}
  <div className="mb-4">
    <label className="form-label text-muted">SWIFT Code (for foreign accounts)</label>
    <input
      type="text"
      className={`form-control ${errors.swiftCode ? "is-invalid" : ""}`}
      placeholder="Enter SWIFT Code"
      {...register("swiftCode", {
        pattern: {
          value: /^[A-Z0-9]{8,11}$/, // SWIFT code is typically 8 or 11 alphanumeric characters
          message: "Invalid SWIFT code format",
        },
      })}
    />
    {errors.swiftCode && <div className="invalid-feedback">{errors.swiftCode.message}</div>}
  </div>
</div>

              {/* Security Section */}
              <h4 className="mb-3 text-muted" data-bs-toggle="collapse" data-bs-target="#security" aria-expanded="false" aria-controls="security"> Security</h4>
              <div className="p-3 rounded bg-light mb-4 collapse" id="security">
  {/* Type of Security */}
  <div className="mb-4">
    <label className="form-label text-muted">Type of Security</label>
    <select
      className={`form-control ${errors.securityType ? "is-invalid" : ""}`}
      {...register("securityType", { required: "Please select type of security" })}
    >
      <option value="">Select Type of Security</option>
      <option value="Mortgage">Mortgage</option>
      <option value="Pledge">Pledge</option>
      <option value="Lien">Lien</option>
      <option value="Hypothecation">Hypothecation</option>
      <option value="Assignment">Assignment</option>
      <option value="Other">Other</option>
    </select>
    {errors.securityType && <div className="invalid-feedback">{errors.securityType.message}</div>}
  </div>

  {/* Name and PAN of the person (if security given by a person other than CD) */}
  <div className="mb-4">
    <label className="form-label text-muted">
      Name and PAN of the person (if security given by a person other than CD)
    </label>
    <div className="row">
      {/* Name Field */}
      <div className="col-md-6 mb-3">
        <input
          type="text"
          className={`form-control ${errors.securityPersonName ? "is-invalid" : ""}`}
          placeholder="Enter Name"
          {...register("securityPersonName", {
            pattern: {
              value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
              message: "Name must only contain letters and spaces",
            },
          })}
        />
        {errors.securityPersonName && (
          <div className="invalid-feedback">{errors.securityPersonName.message}</div>
        )}
      </div>

      {/* PAN Field */}
      <div className="col-md-6 mb-3">
        <input
          type="text"
          className={`form-control ${errors.securityPersonPan ? "is-invalid" : ""}`}
          placeholder="Enter PAN"
          {...register("securityPersonPan", {
            pattern: {
              value: /^[A-Z]{5}[0-9]{4}[A-Z]$/, // Standard 10-character PAN format
              message: "Invalid PAN format",
            },
          })}
        />
        {errors.securityPersonPan && (
          <div className="invalid-feedback">{errors.securityPersonPan.message}</div>
        )}
      </div>
    </div>
  </div>

  {/* Details of Security */}
  <div className="mb-4">
    <label className="form-label text-muted">Details of Security</label>
    <textarea
      className={`form-control ${errors.securityDetails ? "is-invalid" : ""}`}
      placeholder="Enter details of security"
      {...register("securityDetails", {
        required: "Details of security are required",
        minLength: {
          value: 10,
          message: "Details should be at least 10 characters long",
        },
      })}
    />
    {errors.securityDetails && (
      <div className="invalid-feedback">{errors.securityDetails.message}</div>
    )}
  </div>

  {/* ROC Charge ID */}
  <div className="mb-4">
    <label className="form-label text-muted">ROC Charge ID (Asset-wise or Contract-wise)</label>
    <input
      type="text"
      className={`form-control ${errors.rocChargeId ? "is-invalid" : ""}`}
      placeholder="Enter ROC Charge ID"
      {...register("rocChargeId", {
        pattern: {
          value: /^\d+$/, // Numeric values only
          message: "ROC Charge ID must be a number",
        },
      })}
    />
    {errors.rocChargeId && (
      <div className="invalid-feedback">{errors.rocChargeId.message}</div>
    )}
  </div>

  {/* CERSAI Security Interest ID */}
  <div className="mb-4">
    <label className="form-label text-muted">CERSAI Security Interest ID</label>
    <input
      type="text"
      className={`form-control ${errors.cersaiSecurityId ? "is-invalid" : ""}`}
      placeholder="Enter CERSAI Security Interest ID"
      {...register("cersaiSecurityId", {
        pattern: {
          value: /^\d+$/, // Numeric values only
          message: "CERSAI Security Interest ID must be a number",
        },
      })}
    />
    {errors.cersaiSecurityId && (
      <div className="invalid-feedback">{errors.cersaiSecurityId.message}</div>
    )}
  </div>

  {/* Priority of Charge */}
  <div className="mb-4">
    <label className="form-label text-muted">Priority of Charge</label>
    <select
      className={`form-control ${errors.priorityOfCharge ? "is-invalid" : ""}`}
      {...register("priorityOfCharge", { required: "Please select priority of charge" })}
    >
      <option value="">Select Priority</option>
      <option value="Exclusive">Exclusive</option>
      <option value="First">First</option>
      <option value="Second">Second</option>
      <option value="Third">Third</option>
      <option value="Other">Other</option>
    </select>
    {errors.priorityOfCharge && (
      <div className="invalid-feedback">{errors.priorityOfCharge.message}</div>
    )}
  </div>
</div>

              {/* Assignment Details Section */}
              <h4 className="mb-3 text-muted" data-bs-toggle="collapse" data-bs-target="#assignment" aria-expanded="false" aria-controls="assignment" >Assignment Details</h4>
              <div className="p-3 rounded bg-light mb-4 collapse" id="assignment">
  {/* Name of Assignor */}
  <div className="mb-4">
    <label className="form-label text-muted">Name of Assignor</label>
    <input
      type="text"
      className={`form-control ${errors.assignorName ? "is-invalid" : ""}`}
      placeholder="Enter Name of Assignor"
      {...register("assignorName", {
        required: "Name of Assignor is required",
        pattern: {
          value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
          message: "Name must only contain letters and spaces",
        },
      })}
    />
    {errors.assignorName && <div className="invalid-feedback">{errors.assignorName.message}</div>}
  </div>

  {/* PAN of Assignor */}
  <div className="mb-4">
    <label className="form-label text-muted">PAN of Assignor</label>
    <input
      type="text"
      className={`form-control ${errors.assignorPan ? "is-invalid" : ""}`}
      placeholder="Enter PAN of Assignor"
      {...register("assignorPan", {
        required: "PAN of Assignor is required",
        pattern: {
          value: /^[A-Z]{5}[0-9]{4}[A-Z]$/, // Standard 10-character PAN format
          message: "Invalid PAN format",
        },
      })}
    />
    {errors.assignorPan && <div className="invalid-feedback">{errors.assignorPan.message}</div>}
  </div>

  {/* Date of Assignment */}
  <div className="mb-4">
    <label className="form-label text-muted">Date of Assignment</label>
    <input
      type="date"
      className={`form-control ${errors.dateOfAssignment ? "is-invalid" : ""}`}
      {...register("dateOfAssignment", {
        required: "Date of assignment is required",
        validate: {
          isFutureDate: (value) =>
            new Date(value) <= new Date() || "Date cannot be in the future",
        },
      })}
    />
    {errors.dateOfAssignment && <div className="invalid-feedback">{errors.dateOfAssignment.message}</div>}
  </div>

  {/* Amount Assigned */}
  <div className="mb-4">
    <label className="form-label text-muted">Amount Assigned</label>
    <input
      type="number"
      className={`form-control ${errors.amountAssigned ? "is-invalid" : ""}`}
      placeholder="Enter Amount Assigned"
      {...register("amountAssigned", {
        required: "Amount assigned is required",
        min: { value: 0.01, message: "Amount must be greater than 0" },
      })}
    />
    {errors.amountAssigned && <div className="invalid-feedback">{errors.amountAssigned.message}</div>}
  </div>

  {/* Remarks */}
  <div className="mb-4">
    <label className="form-label text-muted">Remarks (if any)</label>
    <textarea
      className={`form-control ${errors.remarks ? "is-invalid" : ""}`}
      placeholder="Enter remarks"
      {...register("remarks", {
        maxLength: {
          value: 500,
          message: "Remarks should not exceed 500 characters",
        },
      })}
    />
    {errors.remarks && <div className="invalid-feedback">{errors.remarks.message}</div>}
  </div>
</div>


              <div className="text-end">
                <button type="submit" className=" btn btn-lg btn-primary"  >
                  Next
                </button>

              </div>
              

            </form>
          </div>
        </div>
      </div>


    </div>
  );
};

export default BootstrapForm;
