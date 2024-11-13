import React from "react";
import { useForm } from "react-hook-form";

const BootstrapForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  
  const [pageNumber, setPageNumber] = React.useState(1); // Current page number
  const userId = 18; // User ID, for the API call

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
        // If data is saved successfully, move to the next page
        console.log("Data saved successfully");
        setPageNumber((prevPage) => prevPage + 1);
      } else {
        console.log("Error saving data:", response.status);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  const handleNext = handleSubmit(onSubmit); // Handle validation on "Next" click

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-5 shadow-lg" style={{ borderRadius: "15px" }}>
            <h2 className="text-center text-primary mb-5">Creditor Information Form</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapForm;
