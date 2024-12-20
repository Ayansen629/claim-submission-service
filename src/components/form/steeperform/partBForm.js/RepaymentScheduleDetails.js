import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Cookies from "js-cookie";

const RepaymentScheduleForm = ({ onNext, onPrevious }) => {
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
    name: "repaymentSchedule",
  });

  const COOKIE_KEY = "repaymentScheduleFormData";

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    Cookies.set(COOKIE_KEY, JSON.stringify(data), { expires: 7 });
    onNext();
  };

  // On initial load, append the first repayment schedule
  useEffect(() => {
    const savedData = Cookies.get(COOKIE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => setValue(key, parsedData[key]));
      trigger();
    } else {
      // Append the first repayment schedule when the page loads
      append({
        fromDate: "",
        toDate: "",
        scheduledRepaymentAmount: "",
        interval: "",
      });
    }
  }, [setValue, trigger, append]);

  const handleRemove = (index) => {
    remove(index);
    const savedData = Cookies.get(COOKIE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.repaymentSchedule = parsedData.repaymentSchedule.filter((_, idx) => idx !== index);
      Cookies.set(COOKIE_KEY, JSON.stringify(parsedData), { expires: 7 });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light p-4 rounded shadow-sm w-75"
      >
        <h4 className="mb-3 text-muted">Repayment Schedule</h4>

        <div className="p-3 rounded bg-light mb-4">
          {fields.map((item, index) => (
            <div key={item.id} className="border p-3 mb-3 rounded">
              <h5>Repayment {index + 1}</h5>

              {/* From Date */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-muted">From Date</label>
                <div className="col-md-8">
                  <input
                    type="date"
                    className={`form-control ${errors?.repaymentSchedule?.[index]?.fromDate ? "is-invalid" : ""}`}
                    {...register(`repaymentSchedule[${index}].fromDate`, { required: "This field is required" })}
                  />
                  {errors?.repaymentSchedule?.[index]?.fromDate && (
                    <div className="invalid-feedback">
                      {errors.repaymentSchedule[index].fromDate.message}
                    </div>
                  )}
                </div>
              </div>

              {/* To Date */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-muted">To Date</label>
                <div className="col-md-8">
                  <input
                    type="date"
                    className={`form-control ${errors?.repaymentSchedule?.[index]?.toDate ? "is-invalid" : ""}`}
                    {...register(`repaymentSchedule[${index}].toDate`, { required: "This field is required" })}
                  />
                  {errors?.repaymentSchedule?.[index]?.toDate && (
                    <div className="invalid-feedback">
                      {errors.repaymentSchedule[index].toDate.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Scheduled Repayment Amount */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-muted">Scheduled Repayment Amount</label>
                <div className="col-md-8">
                  <input
                    type="number"
                    className={`form-control ${errors?.repaymentSchedule?.[index]?.scheduledRepaymentAmount ? "is-invalid" : ""}`}
                    {...register(`repaymentSchedule[${index}].scheduledRepaymentAmount`, { required: "This field is required" })}
                  />
                  {errors?.repaymentSchedule?.[index]?.scheduledRepaymentAmount && (
                    <div className="invalid-feedback">
                      {errors.repaymentSchedule[index].scheduledRepaymentAmount.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Interval */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-muted">Interval</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    className={`form-control ${errors?.repaymentSchedule?.[index]?.interval ? "is-invalid" : ""}`}
                    {...register(`repaymentSchedule[${index}].interval`, { required: "This field is required" })}
                  />
                  {errors?.repaymentSchedule?.[index]?.interval && (
                    <div className="invalid-feedback">
                      {errors.repaymentSchedule[index].interval.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Remove Repayment Schedule */}
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(index)}
                >
                  Remove Repayment Schedule
                </button>
              )}
            </div>
          ))}

          {/* Add Another Repayment Schedule */}
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() =>
              append({
                fromDate: "",
                toDate: "",
                scheduledRepaymentAmount: "",
                interval: "",
              })
            }
          >
            Add Another Repayment Schedule
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

export default RepaymentScheduleForm;
