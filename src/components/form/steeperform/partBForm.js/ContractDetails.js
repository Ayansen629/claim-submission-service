import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const ContractDetailsForm = ({ onNext, onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({ mode: "onChange" });

  const [isContractDetailsVisible, setIsContractDetailsVisible] = useState(false);

  const COOKIE_KEY = "contractDetailsFormData";

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
    }
  }, [setValue, trigger]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light p-4 rounded shadow-sm w-75"
      >
        <h4
          className="mb-3 text-muted"
          onClick={() => setIsContractDetailsVisible(!isContractDetailsVisible)}
          style={{ cursor: "pointer" }}
        >
          Contract Details
        </h4>

        <div
          className={`p-3 rounded bg-light mb-4 ${
            isContractDetailsVisible ? "show" : ""
          }`}
          id="contract"
        >
          <div className="mb-3">
            <label className="form-label text-muted">Debt Contract Date</label>
            <input
              type="date"
              className={`form-control ${errors.debtContractDate ? "is-invalid" : ""}`}
              {...register("debtContractDate", { required: "This field is required" })}
              onBlur={() => trigger("debtContractDate")}
            />
            {errors.debtContractDate && <div className="invalid-feedback">{errors.debtContractDate.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Sanction Currency</label>
            <input
              type="text"
              className={`form-control ${errors.sanctionCurrency ? "is-invalid" : ""}`}
              {...register("sanctionCurrency", { required: "This field is required" })}
              onBlur={() => trigger("sanctionCurrency")}
            />
            {errors.sanctionCurrency && <div className="invalid-feedback">{errors.sanctionCurrency.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Sanctioned Amount</label>
            <input
              type="number"
              className={`form-control ${errors.sanctionedAmount ? "is-invalid" : ""}`}
              {...register("sanctionedAmount", {
                required: "This field is required",
                min: { value: 1, message: "Amount must be greater than zero" },
              })}
              onBlur={() => trigger("sanctionedAmount")}
            />
            {errors.sanctionedAmount && <div className="invalid-feedback">{errors.sanctionedAmount.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Type of Debt</label>
            <input
              type="text"
              className={`form-control ${errors.typeOfDebt ? "is-invalid" : ""}`}
              {...register("typeOfDebt", { required: "This field is required" })}
              onBlur={() => trigger("typeOfDebt")}
            />
            {errors.typeOfDebt && <div className="invalid-feedback">{errors.typeOfDebt.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Tenure of Debt</label>
            <input
              type="text"
              className={`form-control ${errors.tenureOfDebt ? "is-invalid" : ""}`}
              {...register("tenureOfDebt", { required: "This field is required" })}
              onBlur={() => trigger("tenureOfDebt")}
            />
            {errors.tenureOfDebt && <div className="invalid-feedback">{errors.tenureOfDebt.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Remarks</label>
            <textarea
              className={`form-control ${errors.remarks ? "is-invalid" : ""}`}
              {...register("remarks")}
              onBlur={() => trigger("remarks")}
            ></textarea>
            {errors.remarks && <div className="invalid-feedback">{errors.remarks.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Attachments</label>
            <input
              type="file"
              className="form-control"
              {...register("attachments.statementOfAccount")}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between">
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

export default ContractDetailsForm;
