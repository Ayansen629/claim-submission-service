// BootstrapForm.js
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import PartAForm from "./partA";
import PartBForm from "./partB";
import axios from "axios";

const BootstrapForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  // API call to save Part A data and then move to next page
  const handleNext = async (data) => {
    setLoading(true); // Show loader

    try {
      const response = await axios.post("https://localhost:8080/api/submit", data);

      if (response.status === 200) {
        console.log("API call successful for Part A");
        setActiveStep((prevStep) => prevStep + 1); // Move to next page (Part B)
      } else {
        console.error("API call failed:", response.status);
        setActiveStep((prevStep) => prevStep + 1);

      }
    } catch (error) {
      console.error("Error during API call:", error);
      setActiveStep((prevStep) => prevStep + 1);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1); // Move to previous page (Part A)
  };

  const handleFinalSubmit = async (data) => {
    setLoading(true); // Show loader

    try {
      const response = await axios.post("https://localhost:8080/api/final-submit", data);

      if (response.status === 200) {
        console.log("Final form submitted successfully");
      } else {
        console.log("Error in final form submission");
      }
    } catch (error) {
      console.error("Error in final form submission:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="container mt-5 bigForm">
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step><StepLabel>Part A</StepLabel></Step>
        <Step><StepLabel>Part B</StepLabel></Step>
      </Stepper>

      <div className="form-content">
        {activeStep === 0 && (
          <PartAForm onNext={handleNext} loading={loading} />
        )}
        {activeStep === 1 && (
          <PartBForm onPrevious={handleBack} onSubmit={handleFinalSubmit} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default BootstrapForm;
