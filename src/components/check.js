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

  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [loading, setLoading] = useState(true); // Loader state
  const userId = 1; // Static user ID for API call as per requirements

  // Recursive function to set form values dynamically
  const setFormValues = (data, prefix = "") => {
    Object.keys(data).forEach((key) => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      const value = data[key];

      // If value is an object, call recursively
      if (value && typeof value === "object" && !Array.isArray(value)) {
        setFormValues(value, fieldName);
      } else {
        // Set value if it's a simple field
        setValue(fieldName, value);
      }
    });
  };

  // Load data after a 5-second delay
  useEffect(() => {
    const delayAndLoadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds

      try {
        setLoading(true); // Show loader
        const response = await axios.post(`https://localhost:8080/claim/load`, { userId });

        if (response.status === 200) {
          const data = response.data.claimMstDetailsModel;
          setFormValues(data); // Populate form fields
        } else {
          console.error("Error loading data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Hide loader once done
      }
    };

    delayAndLoadData();
  }, [userId, setValue]);

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `https://localhost:8080/claim/step?userId=${userId}&pageNumber=${pageNumber}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Data saved successfully");
        setPageNumber((prevPage) => prevPage + 1);
      } else {
        console.log("Error saving data:", response.status);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  // Validate and submit form on "Next" button click
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
                {/* Display Name Field */}
                <div className="mb-4">
                  <label htmlFor="displayName" className="form-label text-muted">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    className={`form-control ${errors.displayName ? "is-invalid" : ""}`}
                    {...register("displayName", {
                      required: "Display name is required",
                    })}
                  />
                  {errors.displayName && (
                    <div className="invalid-feedback">{errors.displayName.message}</div>
                  )}
                </div>

                {/* Additional fields based on structure */}

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
