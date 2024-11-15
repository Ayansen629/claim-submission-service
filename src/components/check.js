import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const BootstrapForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(true); // Loader state
  const userId = 18; // User ID for API call

  // Recursive function to set values from nested data structure
  const setFormValues = (data, prefix = "") => {
    Object.keys(data).forEach((key) => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      const value = data[key];

      // Check if the value is an object and recurse
      if (value && typeof value === "object" && !Array.isArray(value)) {
        setFormValues(value, fieldName);
      } else {
        // Set value if it's a simple field
        setValue(fieldName, value);
      }
    });
  };

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("https://localhost:8080/claim/load", { userId });

        if (response.status === 200) {
          const data = response.data.claimMstDetailsModel;
          setFormValues(data); // Populate form fields
        } else {
          console.error("Error loading data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `https://localhost:8080/claim/step?userId=${userId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Data saved successfully");
      } else {
        console.log("Error saving data:", response.status);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  const handleNext = handleSubmit(onSubmit);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-5 shadow-lg" style={{ borderRadius: "15px" }}>
            <h2 className="text-center text-primary mb-5">Creditor Information Form</h2>

            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNext}>
                {/* Form Fields */}
                <div className="mb-4">
                  <label htmlFor="creditorId" className="form-label text-muted">
                    Creditor ID
                  </label>
                  <input
                    type="text"
                    id="creditorId"
                    className={`form-control ${errors.creditorId ? "is-invalid" : ""}`}
                    {...register("creditorId", { required: "Creditor ID is required" })}
                  />
                  {errors.creditorId && (
                    <div className="invalid-feedback">{errors.creditorId.message}</div>
                  )}
                </div>
                
                {/* Additional fields can be registered here based on form structure */}

                <div className="text-end">
                  <button type="submit" className="btn btn-lg btn-primary">
                    Next
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapForm;
