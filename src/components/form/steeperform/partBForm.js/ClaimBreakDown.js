import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ClaimBreakdown = ({ setValue, savedData, onNext, onPrevious }) => {
  const {
    register,
    watch,
    setValue: updateField,
    formState: { errors },
  } = useForm();

  // Watch for changes in these fields
  const watchedFields = watch(["principalAmount", "interest", "other"]);

  // Automatically update the total whenever inputs change
  useEffect(() => {
    const principalAmount = parseFloat(watchedFields.principalAmount || 0);
    const interest = parseFloat(watchedFields.interest || 0);
    const other = parseFloat(watchedFields.other || 0);

    updateField("total", principalAmount + interest + other);
  }, [watchedFields, updateField]);

  // Initialize form with savedData (if available)
  useEffect(() => {
    if (savedData?.claimBreakdown) {
      updateField("principalAmount", savedData.claimBreakdown.principalAmount || 0);
      updateField("interest", savedData.claimBreakdown.interest || 0);
      updateField("other", savedData.claimBreakdown.other || 0);
      updateField("total", savedData.claimBreakdown.total || 0);
    }
  }, [savedData, updateField]);

  return (
    <div className="p-3 rounded bg-light mb-4">
      <h5 className="mb-3">Claim Breakdown</h5>

      {/* Principal Amount */}
      <div className="row mb-3">
        <label className="col-md-4 col-form-label">Principal Amount</label>
        <div className="col-md-8">
          <input
            type="number"
            className="form-control"
            {...register("principalAmount", { required: "This field is required" })}
            placeholder="Enter principal amount"
          />
          {errors.principalAmount && (
            <div className="invalid-feedback">{errors.principalAmount.message}</div>
          )}
        </div>
      </div>

      {/* Interest */}
      <div className="row mb-3">
        <label className="col-md-4 col-form-label">Interest</label>
        <div className="col-md-8">
          <input
            type="number"
            className="form-control"
            {...register("interest", { required: "This field is required" })}
            placeholder="Enter interest amount"
          />
          {errors.interest && (
            <div className="invalid-feedback">{errors.interest.message}</div>
          )}
        </div>
      </div>

      {/* Other */}
      <div className="row mb-3">
        <label className="col-md-4 col-form-label">Other</label>
        <div className="col-md-8">
          <input
            type="number"
            className="form-control"
            {...register("other", { required: "This field is required" })}
            placeholder="Enter other amount"
          />
          {errors.other && (
            <div className="invalid-feedback">{errors.other.message}</div>
          )}
        </div>
      </div>

      {/* Total (Read-only) */}
      <div className="row mb-3">
        <label className="col-md-4 col-form-label">Total</label>
        <div className="col-md-8">
          <input
            type="number"
            className="form-control"
            {...register("total")}
            readOnly
            placeholder="Calculated total"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClaimBreakdown;
