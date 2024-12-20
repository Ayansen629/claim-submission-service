import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const GuaranteeDetails = ({ savedData }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "guaranteeDetails.guarantors",
  });

  // Initialize form with savedData
  useEffect(() => {
    if (savedData?.guaranteeDetails?.guarantors) {
      savedData.guaranteeDetails.guarantors.forEach((guarantor) => append(guarantor));
    }
  }, [savedData, append]);

  return (
    <div className="p-3 rounded bg-light mb-4">
      <h5 className="mb-3">Guarantee Details</h5>

      {/* Principal Borrower Section */}
      <div className="border p-3 mb-4 rounded">
        <h6 className="mb-3">Principal Borrower</h6>

        {/* Name */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">Name</label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.name", { required: "This field is required" })}
              placeholder="Enter name"
            />
          </div>
        </div>

        {/* CIN */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">CIN</label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.CIN", { required: "This field is required" })}
              placeholder="Enter CIN"
            />
          </div>
        </div>

        {/* PAN */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">PAN</label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.PAN", { required: "This field is required" })}
              placeholder="Enter PAN"
            />
          </div>
        </div>

        {/* Loan Amount */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">Loan Amount</label>
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.loanAmount", { required: "This field is required" })}
              placeholder="Enter loan amount"
            />
          </div>
        </div>

        {/* Address */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">Address</label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.address", { required: "This field is required" })}
              placeholder="Enter address"
            />
          </div>
        </div>

        {/* Is In CIRP */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">Is in CIRP?</label>
          <div className="col-md-8">
            <select
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.isInCIRP")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {/* Claim Admitted Amount */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">Claim Admitted Amount</label>
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.claimAdmittedAmount")}
              placeholder="Enter claim admitted amount"
            />
          </div>
        </div>

        {/* Guarantee Invoked */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">Is Guarantee Invoked?</label>
          <div className="col-md-8">
            <select
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.isGuaranteeInvoked")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {/* Guarantee Invocation Date */}
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">Guarantee Invocation Date</label>
          <div className="col-md-8">
            <input
              type="date"
              className="form-control"
              {...register("guaranteeDetails.principalBorrower.guaranteeInvocationDate")}
            />
          </div>
        </div>
      </div>

      {/* Guarantors Section */}
      <div className="border p-3 mb-4 rounded">
        <h6 className="mb-3">Guarantors</h6>
        {fields.map((item, index) => (
          <div key={item.id} className="border p-3 mb-3 rounded">
            {/* Name */}
            <div className="row mb-3">
              <label className="col-md-4 col-form-label">Name</label>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  {...register(`guaranteeDetails.guarantors[${index}].name`, { required: "This field is required" })}
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* PAN */}
            <div className="row mb-3">
              <label className="col-md-4 col-form-label">PAN</label>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  {...register(`guaranteeDetails.guarantors[${index}].PAN`, { required: "This field is required" })}
                  placeholder="Enter PAN"
                />
              </div>
            </div>

            {/* Amount Guaranteed */}
            <div className="row mb-3">
              <label className="col-md-4 col-form-label">Amount Guaranteed</label>
              <div className="col-md-8">
                <input
                  type="number"
                  className="form-control"
                  {...register(`guaranteeDetails.guarantors[${index}].amountGuaranteed`, { required: "This field is required" })}
                  placeholder="Enter amount guaranteed"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => append({ name: "", PAN: "", amountGuaranteed: 0 })}
        >
          Add Guarantor
        </button>
      </div>

      {/* Attachments Section */}
      <div className="border p-3 mb-4 rounded">
        <h6 className="mb-3">Attachments</h6>
        <div className="row mb-3">
          <label className="col-md-4 col-form-label">Loan Agreement</label>
          <div className="col-md-8">
            <input type="file" className="form-control" {...register("attachments.debt.loanAgreement")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeDetails;
