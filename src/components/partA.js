// PartAForm.js
import React from "react";
import { useForm } from "react-hook-form";

const PartAForm = ({ onNext, saveDraft }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const creditorType = watch("creditorType");

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <h5>PART A - DETAILS OF CREDITOR</h5>
      {/* Creditor ID Dropdown */}
      <div>
        <label>Creditor ID</label>
        <select {...register("creditorID", { required: "Creditor ID is required" })}>
          <option value="">Select ID Type</option>
          <option value="pan">PAN</option>
          <option value="aadhar">Aadhar</option>
        </select>
        {errors.creditorID && <p>{errors.creditorID.message}</p>}
      </div>

      {/* Type of Creditor Radio Buttons */}
      <div>
        <label>Type of Creditor</label>
        <input type="radio" value="individual" {...register("creditorType", { required: "Please select a creditor type" })} /> Individual
        <input type="radio" value="organization" {...register("creditorType")} /> Organization
        {errors.creditorType && <p>{errors.creditorType.message}</p>}
      </div>

      {/* Conditional fields for organization */}
      {creditorType === "organization" && (
        <div>
          <label>Name of Organization</label>
          <input type="text" {...register("organizationName", { required: "Organization name is required" })} />
          {errors.organizationName && <p>{errors.organizationName.message}</p>}
        </div>
      )}

      <div>
        <button type="button" onClick={saveDraft}>Save as Draft</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default PartAForm;
