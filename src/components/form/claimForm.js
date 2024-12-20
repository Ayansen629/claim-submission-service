import React, { useState, useEffect } from "react";
import PartBForm from "./partBForm";
import ClaimDetails from "./steeperform/claimdetails";
import AssignmentDetails from "./steeperform/AssignmentDetails";
import BankDetails from "./steeperform/BankDetails";
import SecurityDetails from "./steeperform/SecurityDetails";
import { useForm } from "react-hook-form";
import Stepper from "react-stepper-horizontal";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Cookies from "js-cookie";
import axios from "axios";
import { useSnackbar } from "notistack";
import ContractDetailsForm from "./steeperform/partBForm.js/ContractDetails";
import WorkingOfClaimForm from "./steeperform/partBForm.js/WorkingOfClaims";
import DisbursementScheduleForm from "./steeperform/partBForm.js/DisbursementScheduleDetails";
import ClaimComponents from "./steeperform/partBForm.js/ClaimComponent";
import ClaimBreakdown from "./steeperform/partBForm.js/ClaimBreakDown";
import SecurityDetailsForm from "./steeperform/partBForm.js/SecurityDetailsForm";
import GuaranteeDetails from "./steeperform/partBForm.js/GuaranteeDetails";
import RepaymentSchedule from "./steeperform/partBForm.js/RepaymentScheduleDetails";

const MainForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  
  // Watching the creditorType field
  const creditorType = watch("creditorType"); 
  
  const COOKIE_KEY = "formData";
  const [activePartAStep, setActivePartAStep] = useState(0);
  const [activePartBStep, setActivePartBStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const userId = 1;

  useEffect(() => {
    const savedData = Cookies.get(COOKIE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormValues(parsedData);
    }
  }, []);

  const setFormValues = (data, prefix = "") => {
    Object.keys(data).forEach((key) => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      const value = data[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        setFormValues(value, fieldName);
      } else {
        setValue(fieldName, value);
      }
    });
  };

  const saveToCookies = (data) => {
    const savedData = Cookies.get(COOKIE_KEY) ? JSON.parse(Cookies.get(COOKIE_KEY)) : {};
    const updatedData = { ...savedData, ...data };
    Cookies.set(COOKIE_KEY, JSON.stringify(updatedData), { expires: 7 });
  };

  const handleNextPartA = async (data) => {
    saveToCookies(data);
    if (activePartAStep < 3) {
      setActivePartAStep(prevStep => prevStep + 1);
    } else {
      setActiveTab(1);
    }

    if (activePartAStep === 3) {
      await handleFinalSubmit(data);
    }
  };

  const handleNextPartB = (data) => {
    saveToCookies(data);
    if (activePartBStep < partBSteps.length - 1) {
      setActivePartBStep(prevStep => prevStep + 1);
    } else {
      enqueueSnackbar("All steps in Part B completed!", { variant: "success" });
    }
  };

  const handlePreviousPartA = () => {
    if (activePartAStep > 0) {
      setActivePartAStep(prevStep => prevStep - 1);
    }
  };

  const handlePreviousPartB = () => {
    if (activePartBStep > 0) {
      setActivePartBStep(prevStep => prevStep - 1);
    }
  };

  const handleTabChange = (event, newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  const handleFinalSubmit = async (data) => {
    setLoading(true);

    const combinedData = {
      ...Cookies.get(COOKIE_KEY) ? JSON.parse(Cookies.get(COOKIE_KEY)) : {},
      ...data
    };

    const requestData = {
      RequestInfo: {},
      claimMstDetailsModel: {
        ...combinedData,
        auditDetails: {
          createdBy: "admin",
          createdTime: Date.now(),
          lastModifiedBy: "admin",
          lastModifiedTime: Date.now(),
        }
      }
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/claim/step?userId=${userId}&pageNumber=${activePartAStep + 1}`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        enqueueSnackbar("Data saved successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Error saving data. Please try again.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error in API call. Please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const partASteps = [
    <ClaimDetails onNext={handleSubmit((data) => handleNextPartA({ ...data, creditorType }))} creditorType={creditorType} register={register} errors={errors} watch={watch} />,
    <SecurityDetails register={register} errors={errors} onNext={handleSubmit(handleNextPartA)} onPrevious={handlePreviousPartA} />,
    <BankDetails register={register} errors={errors} onNext={handleSubmit(handleNextPartA)} onPrevious={handlePreviousPartA} />,
    <AssignmentDetails register={register} errors={errors} onNext={handleSubmit(handleNextPartA)} onPrevious={handlePreviousPartA} />,
  ];

  const partBSteps = [
    <ContractDetailsForm register={register} errors={errors} onNext={handleSubmit(handleNextPartB)} onPrevious={handlePreviousPartB} />,
    <WorkingOfClaimForm register={register} errors={errors} onNext={handleSubmit(handleNextPartB)} onPrevious={handlePreviousPartB} />,
    <DisbursementScheduleForm register={register} errors={errors} onNext={handleSubmit(handleNextPartB)} onPrevious={handlePreviousPartB} />,
    <RepaymentSchedule register={register} errors={errors} onNext={handleSubmit(handleNextPartB)} onPrevious={handlePreviousPartB} />,
    <ClaimComponents register={register} errors={errors} onNext={handleSubmit(handleNextPartB)} onPrevious={handlePreviousPartB} />,
    <ClaimBreakdown register={register} errors={errors} onNext={handleSubmit(handleNextPartB)} onPrevious={handlePreviousPartB} />,
    <SecurityDetailsForm register={register} errors={errors} onNext={handleSubmit(handleNextPartB)} onPrevious={handlePreviousPartB} />,
    <GuaranteeDetails register={register} errors={errors} onNext={handleSubmit(handleNextPartB)} onPrevious={handlePreviousPartB} />,
  ];

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Part A" />
        <Tab label="Part B" disabled={activeTab === 0} />
      </Tabs>
      <div className="tab-content mt-3">
        {activeTab === 0 && (
          <div>
            <Stepper
              steps={[
                { title: "Claim Details" },
                { title: "Security Details" },
                { title: "Bank Details" },
                { title: "Assignment Details" },
              ]}
              activeStep={activePartAStep}
              activeColor="blue"
              completeColor="green"
            />
            <div className="mt-3">{partASteps[activePartAStep]}</div>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <Stepper
              steps={[
                { title: "Contract Details" },
                { title: "Working on Claim Details" },
                { title: "Disbursement Schedule Details" },
                { title: "Repayment Schedule Details" },
                { title: "Claim Component Details" },
                { title: "Claim Breakdown Details" },
                { title: "Security Details" },
                { title: "Guarantee Details" },
              ]}
              activeStep={activePartBStep}
              activeColor="blue"
              completeColor="green"
            />
            <div className="mt-3">{partBSteps[activePartBStep]}</div>
          </div>
        )}
      </div>
    </Box>
  );
};

export default MainForm;
