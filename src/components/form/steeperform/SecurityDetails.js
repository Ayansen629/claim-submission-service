import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const SecurityForm = ({ onNext,onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors ,isValid},
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    onNext(); // Proceed to the next step
  };

  // Ensure the "Security" section is visible when this form is active
  useEffect(() => {
    const securitySection = document.getElementById("security");
    if (securitySection) {
      securitySection.classList.add("show"); // Force the collapse to expand
    }
    return () => {
      if (securitySection) {
        securitySection.classList.remove("show"); // Clean up when unmounting
      }
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4
        className="mb-3 text-muted"
        data-bs-toggle="collapse"
        data-bs-target="#security"
        aria-expanded="true"
        aria-controls="security"
      >
        Security
      </h4>
      <div className="p-3 rounded bg-light mb-4 collapse show" id="security">
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
          {errors.securityType && (
            <div className="invalid-feedback">{errors.securityType.message}</div>
          )}
        </div>

        {/* Name and PAN of the person */}
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
                    value: /^[A-Za-z\s]+$/,
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
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
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
          <label className="form-label text-muted">
            ROC Charge ID (Asset-wise or Contract-wise)
          </label>
          <input
            type="text"
            className={`form-control ${errors.rocChargeId ? "is-invalid" : ""}`}
            placeholder="Enter ROC Charge ID"
            {...register("rocChargeId", {
              pattern: {
                value: /^\d+$/,
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
                value: /^\d+$/,
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

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={onPrevious}>
          Previous
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isValid} // Disable submit button if the form is not valid
        >
          {isValid ? "Save & Next" : "Save & Next"}
        </button>
      </div>
    </form>
  );
};

export default SecurityForm;
