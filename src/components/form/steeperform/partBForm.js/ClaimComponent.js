import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const ClaimComponents = ({ setValue, savedData, onNext, onPrevious }) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { claimComponentDetails: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "claimComponentDetails",
  });

  useEffect(() => {
    if (savedData?.claimComponentDetails) {
      savedData.claimComponentDetails.forEach((item) => append(item));
    }
  }, [savedData, append]);

  const handleNext = (data) => {
    if (onNext) onNext(data);
  };

  const handlePrevious = () => {
    if (onPrevious) onPrevious();
  };

  return (
    <form onSubmit={handleSubmit(handleNext)} className="p-3 rounded bg-light mb-4">
      <h5 className="mb-3">Claim Components</h5>
      {fields.map((item, index) => (
        <div key={item.id} className="border p-3 mb-3 rounded">
          {/* Component Name */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Component Name</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`claimComponentDetails[${index}].name`, { required: "This field is required" })}
                defaultValue={item.name || ""}
              />
              {errors?.claimComponentDetails?.[index]?.name && (
                <div className="invalid-feedback">
                  {errors.claimComponentDetails[index].name.message}
                </div>
              )}
            </div>
          </div>

          {/* From Date */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">From Date</label>
            <div className="col-md-8">
              <input
                type="date"
                className="form-control"
                {...register(`claimComponentDetails[${index}].fromDate`, { required: "This field is required" })}
                defaultValue={item.fromDate || ""}
              />
              {errors?.claimComponentDetails?.[index]?.fromDate && (
                <div className="invalid-feedback">
                  {errors.claimComponentDetails[index].fromDate.message}
                </div>
              )}
            </div>
          </div>

          {/* To Date */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">To Date</label>
            <div className="col-md-8">
              <input
                type="date"
                className="form-control"
                {...register(`claimComponentDetails[${index}].toDate`, { required: "This field is required" })}
                defaultValue={item.toDate || ""}
              />
              {errors?.claimComponentDetails?.[index]?.toDate && (
                <div className="invalid-feedback">
                  {errors.claimComponentDetails[index].toDate.message}
                </div>
              )}
            </div>
          </div>

          {/* Amount Basis */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Amount Basis</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`claimComponentDetails[${index}].amountBasis`, { required: "This field is required" })}
                defaultValue={item.amountBasis || ""}
              />
              {errors?.claimComponentDetails?.[index]?.amountBasis && (
                <div className="invalid-feedback">
                  {errors.claimComponentDetails[index].amountBasis.message}
                </div>
              )}
            </div>
          </div>

          {/* Rate */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Rate</label>
            <div className="col-md-8">
              <input
                type="number"
                step="0.01"
                className="form-control"
                {...register(`claimComponentDetails[${index}].rate`, { required: "This field is required" })}
                defaultValue={item.rate || ""}
              />
              {errors?.claimComponentDetails?.[index]?.rate && (
                <div className="invalid-feedback">
                  {errors.claimComponentDetails[index].rate.message}
                </div>
              )}
            </div>
          </div>

          {/* Compounding Interval */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Compounding Interval</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`claimComponentDetails[${index}].compoundingInterval`, { required: "This field is required" })}
                defaultValue={item.compoundingInterval || ""}
              />
              {errors?.claimComponentDetails?.[index]?.compoundingInterval && (
                <div className="invalid-feedback">
                  {errors.claimComponentDetails[index].compoundingInterval.message}
                </div>
              )}
            </div>
          </div>

          {/* Calculated Amount */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Calculated Amount</label>
            <div className="col-md-8">
              <input
                type="number"
                className="form-control"
                {...register(`claimComponentDetails[${index}].calculatedAmount`, { required: "This field is required" })}
                defaultValue={item.calculatedAmount || ""}
              />
              {errors?.claimComponentDetails?.[index]?.calculatedAmount && (
                <div className="invalid-feedback">
                  {errors.claimComponentDetails[index].calculatedAmount.message}
                </div>
              )}
            </div>
          </div>

          {/* Remove Button */}
          <div className="text-end">
            <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(index)}>
              Remove Claim Component
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
          Previous
        </button>
        <button type="submit" className="btn btn-primary" disabled={Object.keys(errors).length > 0}>
          Save & Next
        </button>
      </div>
    </form>
  );
};

export default ClaimComponents;
