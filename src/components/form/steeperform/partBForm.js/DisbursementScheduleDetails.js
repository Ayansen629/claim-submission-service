import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Cookies from "js-cookie";

const DisbursementScheduleForm = ({ onNext, onPrevious }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({ mode: "onChange" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "disbursementSchedule",
  });

  const COOKIE_KEY = "disbursementScheduleFormData";

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    Cookies.set(COOKIE_KEY, JSON.stringify(data), { expires: 7 });
    onNext();
  };

  useEffect(() => {
    const savedData = Cookies.get(COOKIE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => setValue(key, parsedData[key]));
      trigger();
    } else {
      // When the page loads for the first time, automatically append Disbursement 1
      append({
        disbursedAmount: "",
        dateOfDisbursement: "",
        disbursedTo: {
          name: "",
          PAN: "",
        },
      });
    }
  }, [setValue, trigger, append]);

  const handleRemove = (index) => {
    remove(index);
    const savedData = Cookies.get(COOKIE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.disbursementSchedule = parsedData.disbursementSchedule.filter((_, idx) => idx !== index);
      Cookies.set(COOKIE_KEY, JSON.stringify(parsedData), { expires: 7 });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light p-4 rounded shadow-sm w-75"
      >
        <h4 className="mb-3 text-muted">Disbursement Schedule</h4>

        <div className="p-3 rounded bg-light mb-4">
          {fields.map((item, index) => (
            <div key={item.id} className="border p-3 mb-3 rounded">
              <h5>Disbursement {index + 1}</h5>

              {/* Disbursed Amount */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-muted">Disbursed Amount</label>
                <div className="col-md-8">
                  <input
                    type="number"
                    className={`form-control ${errors?.disbursementSchedule?.[index]?.disbursedAmount ? "is-invalid" : ""}`}
                    {...register(`disbursementSchedule[${index}].disbursedAmount`, { required: "This field is required" })}
                  />
                  {errors?.disbursementSchedule?.[index]?.disbursedAmount && (
                    <div className="invalid-feedback">
                      {errors.disbursementSchedule[index].disbursedAmount.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Date of Disbursement */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-muted">Date of Disbursement</label>
                <div className="col-md-8">
                  <input
                    type="date"
                    className={`form-control ${errors?.disbursementSchedule?.[index]?.dateOfDisbursement ? "is-invalid" : ""}`}
                    {...register(`disbursementSchedule[${index}].dateOfDisbursement`, { required: "This field is required" })}
                  />
                  {errors?.disbursementSchedule?.[index]?.dateOfDisbursement && (
                    <div className="invalid-feedback">
                      {errors.disbursementSchedule[index].dateOfDisbursement.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Disbursed To - Name */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-muted">Disbursed To (Name)</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    className={`form-control ${errors?.disbursementSchedule?.[index]?.disbursedTo?.name ? "is-invalid" : ""}`}
                    {...register(`disbursementSchedule[${index}].disbursedTo.name`, { required: "This field is required" })}
                  />
                  {errors?.disbursementSchedule?.[index]?.disbursedTo?.name && (
                    <div className="invalid-feedback">
                      {errors.disbursementSchedule[index].disbursedTo.name.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Disbursed To - PAN */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-muted">Disbursed To (PAN)</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    className={`form-control ${errors?.disbursementSchedule?.[index]?.disbursedTo?.PAN ? "is-invalid" : ""}`}
                    {...register(`disbursementSchedule[${index}].disbursedTo.PAN`, { required: "This field is required" })}
                  />
                  {errors?.disbursementSchedule?.[index]?.disbursedTo?.PAN && (
                    <div className="invalid-feedback">
                      {errors.disbursementSchedule[index].disbursedTo.PAN.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Remove Disbursement Button */}
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(index)}
                >
                  Remove Disbursement
                </button>
              )}
            </div>
          ))}

          {/* Add Another Disbursement Button */}
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() =>
              append({
                disbursedAmount: "",
                dateOfDisbursement: "",
                disbursedTo: {
                  name: "",
                  PAN: "",
                },
              })
            }
          >
            Add Another Disbursement
          </button>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onPrevious}>
            Previous
          </button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={!isValid}>
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default DisbursementScheduleForm;
