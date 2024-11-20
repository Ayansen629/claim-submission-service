import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"; // Import js-cookie

const SecurityForm = ({ onNext, onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger, // Added trigger function
  } = useForm({ mode: "onChange" }); // Added mode: onChange for immediate validation

  const COOKIE_KEY = "formData"; // Key for storing data in cookies

  // Save form data to cookies
  const onSubmit = (data) => {
    console.log("Form Data:", data);

    // Get existing data from cookies (if any) and merge with the new data
    const savedData = Cookies.get(COOKIE_KEY) ? JSON.parse(Cookies.get(COOKIE_KEY)) : {};
    const updatedData = { ...savedData, ...data };

    // Store the updated data back to cookies (expires in 7 days)
    Cookies.set(COOKIE_KEY, JSON.stringify(updatedData), { expires: 7 });

    // Proceed to next step
    onNext();
  };

  // Load data from cookies when the form is loaded or when it becomes active
  useEffect(() => {
    const savedData = Cookies.get(COOKIE_KEY) ? JSON.parse(Cookies.get(COOKIE_KEY)) : {};
    if (savedData) {
      // Set the saved data in the form
      Object.keys(savedData).forEach((key) => {
        setValue(key, savedData[key]);
      });

      // Trigger validation after setting the values
      trigger();
    }
  }, [setValue, trigger]);

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
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light p-4 rounded shadow-sm w-75"
      >
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
          <div className="mb-3">
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
          <div className="mb-3">
            <label className="form-label text-muted">
              Name and PAN of the person (if security given by a person other than CD)
            </label>
            <div className="row">
              {/* Name Field */}
              <div className="col-12 col-md-6 mb-3">
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
              <div className="col-12 col-md-6 mb-3">
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
          <div className="mb-3">
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
              rows={3}
            />
            {errors.securityDetails && (
              <div className="invalid-feedback">{errors.securityDetails.message}</div>
            )}
          </div>

          {/* ROC Charge ID */}
          <div className="mb-3">
            <label className="form-label text-muted">ROC Charge ID (Asset-wise or Contract-wise)</label>
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
          <div className="mb-3">
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
          <div className="mb-3">
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

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onPrevious}>
            Previous
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!isValid}
          >
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecurityForm;
