import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Stepper, Step, StepLabel, Button } from "@mui/material";

const BootstrapForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [currentStep, setCurrentStep] = useState(0);

  const creditorType = watch("creditorType");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Add form submission logic here (e.g., API calls)
  };

  const saveDraft = () => {
    console.log("Form data saved as draft.");
  };

  // Steps for the form
  const steps = ["Part A - Creditor Details", "Part B - Additional Details"];

  // Go to the next step if validation passes
  const handleNext = (data) => {
    if (currentStep === steps.length - 1) {
      onSubmit(data);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container mt-5 bigForm">
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="row justify-content-center mt-4">
        <div className="col-xs-12 col-sm-10 col-md-9 col-lg-9">
          <div className="card p-4 p-lg-5 shadow-lg" style={{ borderRadius: "15px" }}>
            <h2 className="text-center text-primary mb-5">Creditor Information Form</h2>

            {currentStep === 0 && (
              <>
                <h5 className="mb-4">PART A - DETAILS OF CREDITOR</h5>
                <form onSubmit={handleSubmit(handleNext)}>
                  {/* Creditor ID Dropdown */}
                  <div className="row mb-3">
                    <label htmlFor="creditorID" className="col-sm-2 col-form-label">
                      Creditor ID
                    </label>
                    <div className="col-sm-10">
                      <select
                        id="creditorID"
                        className={`form-select ${errors.creditorID ? "is-invalid" : ""}`}
                        {...register("creditorID", { required: "Creditor ID is required" })}
                      >
                        <option value="">Select ID Type</option>
                        <option value="pan">PAN</option>
                        <option value="aadhar">Aadhar</option>
                      </select>
                      {errors.creditorID && (
                        <div className="invalid-feedback">{errors.creditorID.message}</div>
                      )}
                    </div>
                  </div>

                  {/* Type of Creditor Radio Buttons */}
                  <div className="mb-4">
                    <label className="form-label text-muted">Type of Creditor</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          id="individual"
                          value="individual"
                          className="form-check-input"
                          {...register("creditorType", { required: "Please select a creditor type" })}
                        />
                        <label className="form-check-label" htmlFor="individual">
                          Individual
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          id="organization"
                          value="organization"
                          className="form-check-input"
                          {...register("creditorType", { required: "Please select a creditor type" })}
                        />
                        <label className="form-check-label" htmlFor="organization">
                          Organization
                        </label>
                      </div>
                    </div>
                    {errors.creditorType && (
                      <div className="invalid-feedback d-block">{errors.creditorType.message}</div>
                    )}
                  </div>

                  {/* Conditional fields for organization */}
                  {creditorType === "organization" && (
                    <div className="border p-3 rounded bg-light mb-4">
                      <h5 className="text-muted">Organization Details</h5>
                      <div className="mb-4">
                        <label htmlFor="organizationName" className="form-label text-muted">
                          Name of Organization
                        </label>
                        <input
                          type="text"
                          id="organizationName"
                          className={`form-control ${errors.organizationName ? "is-invalid" : ""}`}
                          placeholder="Enter organization name"
                          {...register("organizationName", { required: "Organization name is required" })}
                        />
                        {errors.organizationName && (
                          <div className="invalid-feedback">{errors.organizationName.message}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="text-end">
                    <Button variant="contained" color="secondary" onClick={saveDraft} className="me-2">
                      Save as Draft
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Next
                    </Button>
                  </div>
                </form>
              </>
            )}

            {currentStep === 1 && (
              <>
                <h5 className="mb-4">PART B - Additional Details</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label text-muted">Name</label>
                    <input
                      type="text"
                      id="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Enter name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label text-muted">Email</label>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter email"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mobileNumber" className="form-label text-muted">Mobile Number</label>
                    <input
                      type="text"
                      id="mobileNumber"
                      className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`}
                      placeholder="Enter mobile number"
                      {...register("mobileNumber", { required: "Mobile number is required" })}
                    />
                    {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber.message}</div>}
                  </div>

                  <div className="text-end">
                    <Button onClick={handleBack} variant="contained" color="secondary" className="me-2">
                      Previous
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapForm;
