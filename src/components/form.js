// BootstrapForm.js
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import PartAForm from "./partA";
import PartBForm from "./partB";

const BootstrapForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (data) => {
    console.log("Part A Data:", data);  // Optionally log Part A data
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinalSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Add form submission logic here
  };

  const saveDraft = () => {
    console.log("Form data saved as draft.");
  };

  return (
    <div className="container mt-5 bigForm">
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step><StepLabel>Part A</StepLabel></Step>
        <Step><StepLabel>Part B</StepLabel></Step>
      </Stepper>

      <div className="form-content">
        {activeStep === 0 && (
          <PartAForm onNext={handleNext} saveDraft={saveDraft} />
        )}
        {activeStep === 1 && (
          <PartBForm onPrevious={handleBack} onSubmit={handleFinalSubmit} />
        )}
      </div>
    </div>
  );
};

export default BootstrapForm;
