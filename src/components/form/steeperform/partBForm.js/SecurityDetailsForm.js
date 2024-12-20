import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const SecurityDetailsForm = ({ setValue, savedData }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "securityDetails",
  });

  // Initialize form with savedData if available
  useEffect(() => {
    if (savedData?.securityDetails) {
      savedData.securityDetails.forEach((item) => append(item));
    }
  }, [savedData, append]);

  return (
    <div className="p-3 rounded bg-light mb-4">
      <h5 className="mb-3">Security Details</h5>
      {fields.map((item, index) => (
        <div key={item.id} className="border p-3 mb-3 rounded">
          {/* Type of Security */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Type of Security</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`securityDetails[${index}].typeOfSecurity`, {
                  required: "This field is required",
                })}
                placeholder="Enter type of security"
              />
              {errors?.securityDetails?.[index]?.typeOfSecurity && (
                <div className="invalid-feedback">
                  {errors.securityDetails[index].typeOfSecurity.message}
                </div>
              )}
            </div>
          </div>

          {/* Given By - Name */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Given By - Name</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`securityDetails[${index}].givenBy.name`, {
                  required: "This field is required",
                })}
                placeholder="Enter name"
              />
              {errors?.securityDetails?.[index]?.givenBy?.name && (
                <div className="invalid-feedback">
                  {errors.securityDetails[index].givenBy.name.message}
                </div>
              )}
            </div>
          </div>

          {/* Given By - PAN */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Given By - PAN</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`securityDetails[${index}].givenBy.PAN`, {
                  required: "This field is required",
                })}
                placeholder="Enter PAN"
              />
              {errors?.securityDetails?.[index]?.givenBy?.PAN && (
                <div className="invalid-feedback">
                  {errors.securityDetails[index].givenBy.PAN.message}
                </div>
              )}
            </div>
          </div>

          {/* ROC Charge ID */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">ROC Charge ID</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`securityDetails[${index}].ROCChargeID`, {
                  required: "This field is required",
                })}
                placeholder="Enter ROC Charge ID"
              />
              {errors?.securityDetails?.[index]?.ROCChargeID && (
                <div className="invalid-feedback">
                  {errors.securityDetails[index].ROCChargeID.message}
                </div>
              )}
            </div>
          </div>

          {/* CERSAI Security Interest ID */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">
              CERSAI Security Interest ID
            </label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`securityDetails[${index}].CERSAISecurityInterestID`, {
                  required: "This field is required",
                })}
                placeholder="Enter CERSAI Security Interest ID"
              />
              {errors?.securityDetails?.[index]?.CERSAISecurityInterestID && (
                <div className="invalid-feedback">
                  {errors.securityDetails[index].CERSAISecurityInterestID.message}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Details</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`securityDetails[${index}].details`, {
                  required: "This field is required",
                })}
                placeholder="Enter details"
              />
              {errors?.securityDetails?.[index]?.details && (
                <div className="invalid-feedback">
                  {errors.securityDetails[index].details.message}
                </div>
              )}
            </div>
          </div>

          {/* Priority of Charge */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label">Priority of Charge</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                {...register(`securityDetails[${index}].priorityOfCharge`, {
                  required: "This field is required",
                })}
                placeholder="Enter priority of charge"
              />
              {errors?.securityDetails?.[index]?.priorityOfCharge && (
                <div className="invalid-feedback">
                  {errors.securityDetails[index].priorityOfCharge.message}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-success btn-sm"
        onClick={() =>
          append({
            typeOfSecurity: "",
            givenBy: { name: "", PAN: "" },
            ROCChargeID: "",
            CERSAISecurityInterestID: "",
            details: "",
            priorityOfCharge: "",
          })
        }
      >
        Add Security Detail
      </button>
    </div>
  );
};

export default SecurityDetailsForm;
