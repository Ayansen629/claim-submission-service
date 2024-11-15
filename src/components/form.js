// BootstrapForm.js
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import PartAForm from "./partA";
import PartBForm from "./partB";
import axios from "axios";
import { useSnackbar } from 'notistack'; // Optional for notification

const BootstrapForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { enqueueSnackbar } = useSnackbar(); // Optional for notification
  const userId=1;

  // Save draft API call
 

  const handleSaveDraft = async (data) => {
    setLoading(true); // Show loading state
    try {
      const requestData = {
        // Your request data here (same as the one provided in your example)
      };
  
      const response = await axios.post(
        `https://localhost:8080/claim/step?userId=${userId}&pageNumber=${pageNumber}`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.status === 200) {
        enqueueSnackbar("Draft saved successfully!", { variant: 'success' });
        // You don't need to increment pageNumber or activeStep here
      } else {
        enqueueSnackbar("Error saving draft!", { variant: 'error' });
      }
    } catch (error) {
      console.error("Error in API call:", error);
      enqueueSnackbar("Error saving draft!", { variant: 'error' });
    } finally {
      setLoading(false); // Hide loading state
    }
  };
  

  // Handle next step (after Part A)
  const handleNext = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("https://localhost:8080/api/submit", data);

      if (response.status === 200) {
        setActiveStep((prevStep) => prevStep + 1); // Move to next part (Part B)
      } else {
        console.error("API call failed:", response.status);
        setActiveStep((prevStep) => prevStep + 1); // Move to next part (Part B)
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setActiveStep((prevStep) => prevStep + 1); // Move to next part (Part B)
    } finally {
      setLoading(false);
      setActiveStep((prevStep) => prevStep + 1); // Move to next part (Part B)
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1); // Move to previous page
  };

  const handleFinalSubmit = async (data) => {
    // Final submit logic goes here
  };

  return (
    <div className="container mt-5 bigForm">
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step><StepLabel>Part A</StepLabel></Step>
        <Step><StepLabel>Part B</StepLabel></Step>
      </Stepper>

      <div className="form-content">
        {activeStep === 0 && (
          <PartAForm onNext={handleNext} onSaveDraft={handleSaveDraft} loading={loading} />
        )}
        {activeStep === 1 && (
          <PartBForm onPrevious={handleBack} onSubmit={handleFinalSubmit} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default BootstrapForm;
