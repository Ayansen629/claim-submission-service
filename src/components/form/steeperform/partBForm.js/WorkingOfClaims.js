import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const WorkingOfClaimForm = ({ onNext, onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({ mode: "onChange" });

  const [isWorkingOfClaimVisible, setIsWorkingOfClaimVisible] = useState(false);

  const COOKIE_KEY = "workingOfClaimFormData";

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
          onClick={() => setIsWorkingOfClaimVisible(!isWorkingOfClaimVisible)}
          style={{ cursor: "pointer" }}
        >
          Working of Claim
        </h4>

        <div
          className={`p-3 rounded bg-light mb-4 ${isWorkingOfClaimVisible ? "show" : ""}`}
          id="workingOfClaim"
        >
          {/* Opening Balance */}
          <div className="row mb-3">
            <label className="col-md-4 col-form-label text-muted">Opening Balance</label>
            <div className="col-md-8">
              <input
                type="number"
                className={`form-control ${errors.openingBalance ? "is-invalid" : ""}`}
                {...register("openingBalance", { required: "This field is required" })}
                onBlur={() => trigger("openingBalance")}
              />
              {errors.openingBalance && <div className="invalid-feedback">{errors.openingBalance.message}</div>}
            </div>
          </div>

          {/* Transactions Section */}
          <div className="row mb-3">
            <h5 className="col-md-12 text-muted">Transactions</h5>
            <div className="col-md-12 table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type of Debit</th>
                    <th>Debit Amount</th>
                    <th>Type of Credit</th>
                    <th>Credit Amount</th>
                    <th>Closing Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="date"
                        className={`form-control ${errors.transactions?.[0]?.date ? "is-invalid" : ""}`}
                        {...register("transactions[0].date", { required: "This field is required" })}
                      />
                      {errors.transactions?.[0]?.date && (
                        <div className="invalid-feedback">{errors.transactions[0].date.message}</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`form-control ${errors.transactions?.[0]?.typeOfDebit ? "is-invalid" : ""}`}
                        {...register("transactions[0].typeOfDebit", { required: "This field is required" })}
                      />
                      {errors.transactions?.[0]?.typeOfDebit && (
                        <div className="invalid-feedback">{errors.transactions[0].typeOfDebit.message}</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        className={`form-control ${errors.transactions?.[0]?.debitAmount ? "is-invalid" : ""}`}
                        {...register("transactions[0].debitAmount", { required: "This field is required" })}
                      />
                      {errors.transactions?.[0]?.debitAmount && (
                        <div className="invalid-feedback">{errors.transactions[0].debitAmount.message}</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`form-control ${errors.transactions?.[0]?.typeOfCredit ? "is-invalid" : ""}`}
                        {...register("transactions[0].typeOfCredit", { required: "This field is required" })}
                      />
                      {errors.transactions?.[0]?.typeOfCredit && (
                        <div className="invalid-feedback">{errors.transactions[0].typeOfCredit.message}</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        className={`form-control ${errors.transactions?.[0]?.creditAmount ? "is-invalid" : ""}`}
                        {...register("transactions[0].creditAmount", { required: "This field is required" })}
                      />
                      {errors.transactions?.[0]?.creditAmount && (
                        <div className="invalid-feedback">{errors.transactions[0].creditAmount.message}</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        className={`form-control ${errors.transactions?.[0]?.closingBalance ? "is-invalid" : ""}`}
                        {...register("transactions[0].closingBalance", { required: "This field is required" })}
                      />
                      {errors.transactions?.[0]?.closingBalance && (
                        <div className="invalid-feedback">{errors.transactions[0].closingBalance.message}</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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

export default WorkingOfClaimForm;
