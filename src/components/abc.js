import React, { useState } from "react";
import { useForm } from "react-hook-form";

const BootstrapForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();


  const creditorType = watch("creditorType"); 
  





  

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Add form submission logic here (e.g., API calls)
  };

  return (
    <div className="container mt-5 bigForm">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-10 col-md-3 col-lg-3 mb-3">
          <div className="bg-upload  p-3 p-lg-4">
            Upload Image
            <img src="../img/computer-img.webp" class="img-thumbnail" alt="..."></img>
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
                  Display Name
                </label>

              
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
          {...register("authorizationLetter", {
            required: "Authorization letter is required",
          })}
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
