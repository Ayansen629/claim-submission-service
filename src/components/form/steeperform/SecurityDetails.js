import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const SecurityForm = ({ onNext, onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm({ mode: "onChange" });

  const COOKIE_KEY = "formData";
  const [fields, setFields] = useState([]);

  // JSON schema for dynamic fields
  const fieldSchema = [
    {
      key: "securityType",
      label: "Type of Security",
      type: "select",
      options: [
        "Mortgage",
        "Pledge",
        "Lien",
        "Hypothecation",
        "Assignment",
        "Other",
      ],
      validation: { required: "Please select type of security" },
    },
    {
      key: "securityPersonName",
      label: "Name of Person",
      type: "text",
      placeholder: "Enter Name",
      validation: {
        pattern: {
          value: /^[A-Za-z\s]+$/,
          message: "Name must only contain letters and spaces",
        },
      },
    },
    {
      key: "securityPersonPan",
      label: "PAN of Person",
      type: "text",
      placeholder: "Enter PAN",
      validation: {
        pattern: {
          value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
          message: "Invalid PAN format",
        },
      },
    },
    {
      key: "securityDetails",
      label: "Details of Security",
      type: "textarea",
      placeholder: "Enter details of security",
      validation: {
        required: "Details of security are required",
        minLength: {
          value: 10,
          message: "Details should be at least 10 characters long",
        },
      },
    },
    {
      key: "rocChargeId",
      label: "ROC Charge ID",
      type: "text",
      placeholder: "Enter ROC Charge ID",
      validation: {
        pattern: {
          value: /^\d+$/,
          message: "ROC Charge ID must be a number",
        },
      },
    },
    {
      key: "cersaiSecurityId",
      label: "CERSAI Security Interest ID",
      type: "text",
      placeholder: "Enter CERSAI Security Interest ID",
      validation: {
        pattern: {
          value: /^\d+$/,
          message: "CERSAI Security Interest ID must be a number",
        },
      },
    },
    {
      key: "priorityOfCharge",
      label: "Priority of Charge",
      type: "select",
      options: ["Exclusive", "First", "Second", "Third", "Other"],
      validation: { required: "Please select priority of charge" },
    },
  ];

  // Add or remove fields dynamically based on checkboxes
  const toggleField = (key) => {
    if (fields.includes(key)) {
      setFields(fields.filter((field) => field !== key));
    } else {
      setFields([...fields, key]);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const savedData = Cookies.get(COOKIE_KEY)
      ? JSON.parse(Cookies.get(COOKIE_KEY))
      : {};
    const updatedData = { ...savedData, ...data };

    Cookies.set(COOKIE_KEY, JSON.stringify(updatedData), { expires: 7 });
    onNext();
  };

  useEffect(() => {
    const savedData = Cookies.get(COOKIE_KEY)
      ? JSON.parse(Cookies.get(COOKIE_KEY))
      : {};
    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        setValue(key, savedData[key]);
      });
      trigger();
    }
  }, [setValue, trigger]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light p-4 rounded shadow-sm w-75"
      >
        <h4 className="mb-3 text-muted">Dynamic Security Form</h4>

        {/* Checkboxes for adding fields */}
        <div className="mb-3">
          {fieldSchema.map((field) => (
            <div key={field.key} className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id={field.key}
                onChange={() => toggleField(field.key)}
              />
              <label className="form-check-label" htmlFor={field.key}>
                Add {field.label}
              </label>
            </div>
          ))}
        </div>

        {/* Render dynamic fields */}
        {fields.map((key) => {
          const field = fieldSchema.find((f) => f.key === key);
          if (!field) return null;

          if (field.type === "select") {
            return (
              <div className="mb-3" key={field.key}>
                <label className="form-label">{field.label}</label>
                <select
                  className={`form-control ${
                    errors[key] ? "is-invalid" : ""
                  }`}
                  {...register(key, field.validation)}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors[key] && (
                  <div className="invalid-feedback">
                    {errors[key]?.message}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div className="mb-3" key={field.key}>
              <label className="form-label">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  className={`form-control ${
                    errors[key] ? "is-invalid" : ""
                  }`}
                  placeholder={field.placeholder}
                  {...register(key, field.validation)}
                  rows={3}
                />
              ) : (
                <input
                  type={field.type}
                  className={`form-control ${
                    errors[key] ? "is-invalid" : ""
                  }`}
                  placeholder={field.placeholder}
                  {...register(key, field.validation)}
                />
              )}
              {errors[key] && (
                <div className="invalid-feedback">
                  {errors[key]?.message}
                </div>
              )}
            </div>
          );
        })}

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onPrevious}
          >
            Previous
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!isValid}
          >
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecurityForm;
