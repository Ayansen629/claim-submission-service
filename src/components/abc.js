import React, { useEffect, useState } from "react";
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
  const userId = 18; // User ID for API call

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://localhost:8080/claim/load/userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          // Populate form with fetched data
          setValue("displayName", data.displayName || "");
          // Set other form fields here if available in the response
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
      const response = await fetch(
        `https://localhost:8080/claim/step?userId=${userId}&pageNumber=${pageNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Data saved successfully");
        setPageNumber((prevPage) => prevPage + 1);
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

                {/* Additional fields for each page go here */}

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
