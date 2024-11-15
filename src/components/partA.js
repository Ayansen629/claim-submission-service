// PartAForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { Button ,TextField} from "@mui/material";
import { useSnackbar } from 'notistack'; // Optional for notification

const PartAForm = ({ onNext, onSaveDraft, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { enqueueSnackbar } = useSnackbar(); // To show notifications

  const onSubmit = (data) => {
    onNext(data); // Pass data to parent component to trigger API call and page change
  };

  const handleSaveDraft = async (data) => {
    // Trigger save draft logic in the parent component
    try {
      await onSaveDraft(data);
      enqueueSnackbar("Draft saved successfully!", { variant: 'success' }); // Show success notification
    } catch (error) {
      enqueueSnackbar("Error saving draft!", { variant: 'error' }); // Show error notification
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Part A</h3>

      <TextField
        label="Display Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("displayName", { required: "Display Name is required" })}
        error={!!errors.displayName}
        helperText={errors.displayName && errors.displayName.message}
      />

      <TextField
        label="Creditor ID"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("creditorID", { required: "Creditor ID is required" })}
        error={!!errors.creditorID}
        helperText={errors.creditorID && errors.creditorID.message}
      />

      <TextField
        label="Organization Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("organizationName")}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading} // Disable button when loading
      >
        {loading ? "Submitting..." : "Next"}
      </Button>

      <Button
        variant="contained"
        color="secondary"
        type="button"
        onClick={handleSaveDraft} // Trigger save as draft
        disabled={loading} // Disable button when loading
      >
        {loading ? "Saving Draft..." : "Save as Draft"}
      </Button>
    </form>
  );
};

export default PartAForm;
