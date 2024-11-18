// PartBForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";

const PartBForm = ({ onPrevious, onSubmit, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFinalSubmit = (data) => {
    onSubmit(data); // Pass final data to parent component
  };

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)}>
      <h3>Part B</h3>

      <TextField
        label="Bank Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("bankName", { required: "Bank Name is required" })}
        error={!!errors.bankName}
        helperText={errors.bankName && errors.bankName.message}
      />

      <TextField
        label="Account Number"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("accountNumber", { required: "Account Number is required" })}
        error={!!errors.accountNumber}
        helperText={errors.accountNumber && errors.accountNumber.message}
      />

      <TextField
        label="IFSC Code"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("ifsc", { required: "IFSC Code is required" })}
        error={!!errors.ifsc}
        helperText={errors.ifsc && errors.ifsc.message}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={onPrevious}
        style={{ marginRight: "10px" }}
      >
        Back
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading} // Disable button when loading
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default PartBForm;
