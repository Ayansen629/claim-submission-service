import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"; // Import js-cookie

const BankDetailsForm = ({ onNext, onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({ mode: "onChange" });

  const [isBankDetailsVisible, setIsBankDetailsVisible] = useState(false); // Toggle visibility of bank details section

  const indianBanks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "IndusInd Bank",
    "Yes Bank",
    "Union Bank of India",
    "IDFC First Bank",
    "Indian Bank",
    "Central Bank of India",
    "Bank of India",
    "UCO Bank",
    "Indian Overseas Bank",
    "Bank of Maharashtra",
    "Punjab & Sind Bank",
    "Federal Bank",
    "South Indian Bank",
    "RBL Bank",
    "Karnataka Bank",
  ];

  const COOKIE_KEY = "bankDetailsFormData"; // Define the cookie key

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Store form data in cookie (convert to JSON string)
    Cookies.set(COOKIE_KEY, JSON.stringify(data), { expires: 7 }); // Expires in 7 days
    onNext(); // Proceed to the next step
  };

  // Load saved data from cookies when the form loads
  useEffect(() => {
    const savedData = Cookies.get(COOKIE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Set the saved data in the form fields
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });

      // Trigger validation after setting the values
      trigger(); // Manually trigger validation
    }
  }, [setValue, trigger]); // Re-run if setValue or trigger changes

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light p-4 rounded shadow-sm w-75"
      >
        <h4
          className="mb-3 text-muted"
          onClick={() => setIsBankDetailsVisible(!isBankDetailsVisible)} // Toggle visibility
          style={{ cursor: "pointer" }}
        >
          Bank Details
        </h4>

        {/* Bank Details Form Section */}
        <div
          className={`p-3 rounded bg-light mb-4 ${isBankDetailsVisible ? "show" : ""}`} // Manage visibility using state
          id="bank"
        >
          {/* IFSC Code */}
          <div className="mb-3">
            <label className="form-label text-muted">IFSC Code</label>
            <input
              type="text"
              className={`form-control ${errors.ifsc ? "is-invalid" : ""}`}
              placeholder="Enter IFSC Code"
              {...register("ifsc", {
                required: "IFSC code is required",
                pattern: {
                  value: /^[A-Z]{4}0[A-Z0-9]{6}$/, // IFSC code format: 4 letters, '0', 6 alphanumeric characters
                  message: "Invalid IFSC code format",
                },
              })}
              onBlur={() => trigger("ifsc")} // Trigger validation when the field loses focus
            />
            {errors.ifsc && <div className="invalid-feedback">{errors.ifsc.message}</div>}
          </div>

          {/* MICR Code */}
          <div className="mb-3">
            <label className="form-label text-muted">MICR Code</label>
            <input
              type="text"
              className={`form-control ${errors.micr ? "is-invalid" : ""}`}
              placeholder="Enter MICR Code"
              {...register("micr", {
                required: "MICR code is required",
                pattern: {
                  value: /^\d{9}$/, // MICR code format: 9-digit numeric
                  message: "MICR code must be a 9-digit number",
                },
              })}
              onBlur={() => trigger("micr")}
            />
            {errors.micr && <div className="invalid-feedback">{errors.micr.message}</div>}
          </div>

          {/* Bank Name Dropdown */}
          <div className="mb-3">
            <label className="form-label text-muted">Bank Name</label>
            <select
              className={`form-control ${errors.bankName ? "is-invalid" : ""}`}
              {...register("bankName", { required: "Bank name is required" })}
              onBlur={() => trigger("bankName")}
            >
              <option value="">Select Bank</option>
              {indianBanks.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {errors.bankName && <div className="invalid-feedback">{errors.bankName.message}</div>}
          </div>

          {/* Branch */}
          <div className="mb-3">
            <label className="form-label text-muted">Branch</label>
            <input
              type="text"
              className={`form-control ${errors.branch ? "is-invalid" : ""}`}
              placeholder="Enter Branch Name"
              {...register("branch", {
                required: "Branch name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
                  message: "Branch name must not contain numbers or special characters",
                },
              })}
              onBlur={() => trigger("branch")}
            />
            {errors.branch && <div className="invalid-feedback">{errors.branch.message}</div>}
          </div>

          {/* Account Number */}
          <div className="mb-3">
            <label className="form-label text-muted">Account Number</label>
            <input
              type="text"
              className={`form-control ${errors.accountNumber ? "is-invalid" : ""}`}
              placeholder="Enter Account Number"
              {...register("accountNumber", {
                required: "Account number is required",
                pattern: {
                  value: /^\d{9,18}$/, // Common length for account numbers is between 9 and 18 digits
                  message: "Account number must be 9 to 18 digits",
                },
              })}
              onBlur={() => trigger("accountNumber")}
            />
            {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber.message}</div>}
          </div>

          {/* SWIFT Code (only for foreign accounts) */}
          <div className="mb-3">
            <label className="form-label text-muted">SWIFT Code (for foreign accounts)</label>
            <input
              type="text"
              className={`form-control ${errors.swiftCode ? "is-invalid" : ""}`}
              placeholder="Enter SWIFT Code"
              {...register("swiftCode", {
                pattern: {
                  value: /^[A-Z0-9]{8,11}$/, // SWIFT code is typically 8 or 11 alphanumeric characters
                  message: "Invalid SWIFT code format",
                },
              })}
              onBlur={() => trigger("swiftCode")}
            />
            {errors.swiftCode && <div className="invalid-feedback">{errors.swiftCode.message}</div>}
          </div>
        </div>

        {/* Button Section */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onPrevious}>
            Previous
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!isValid} // Disable submit button if the form is not valid
          >
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankDetailsForm;
