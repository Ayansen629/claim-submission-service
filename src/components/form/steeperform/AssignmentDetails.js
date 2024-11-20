import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AssignmentDetailsForm = ({  onNext, enablePartBTab,onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({
    mode: "onChange", // Trigger validation on field change
  });

  const [isAssignmentDetailsVisible, setIsAssignmentDetailsVisible] = useState(true);

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log("Assignment Details:", data);
    onNext(); // Pass data for submission or further handling

  };

  // Watch form validity
  useEffect(() => {
    if (isValid) {
      // Set button state to enabled if form is valid
    }
  }, [isValid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4
        className="mb-3 text-muted"
        onClick={() => setIsAssignmentDetailsVisible(!isAssignmentDetailsVisible)} // Toggle visibility
        style={{ cursor: "pointer" }}
      >
        Assignment Details
      </h4>

      {/* Assignment Details Form Section */}
      {isAssignmentDetailsVisible && (
        <div className="p-3 rounded bg-light mb-4">
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
            {errors.assignorName && (
              <div className="invalid-feedback">{errors.assignorName.message}</div>
            )}
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
            {errors.assignorPan && (
              <div className="invalid-feedback">{errors.assignorPan.message}</div>
            )}
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
            {errors.dateOfAssignment && (
              <div className="invalid-feedback">{errors.dateOfAssignment.message}</div>
            )}
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
            {errors.amountAssigned && (
              <div className="invalid-feedback">{errors.amountAssigned.message}</div>
            )}
          </div>

          {/* Remarks */}
          <div className="mb-4">
            <label className="form-label text-muted">Remarks (if any)</label>
            <textarea
              className={`form-control ${errors.assignmentRemarks ? "is-invalid" : ""}`}
              placeholder="Enter remarks"
              {...register("assignmentRemarks", {
                maxLength: {
                  value: 500,
                  message: "Remarks should not exceed 500 characters",
                },
              })}
            />
            {errors.assignmentRemarks && (
              <div className="invalid-feedback">{errors.assignmentRemarks.message}</div>
            )}
          </div>
        </div>
      )}

      {/* Button Section */}
      <div className="d-flex justify-content-between">
        {/* Previous Button */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onPrevious}
          
        >
          Previous
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isValid} // Disable until form is valid
        >
          {isValid ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default AssignmentDetailsForm;
