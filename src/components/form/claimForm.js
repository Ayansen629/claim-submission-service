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
import Cookies from "js-cookie";  // Import js-cookie to manage cookies
import axios from "axios"; // Import axios for the API calls
import { useSnackbar } from "notistack"; // Import useSnackbar for notifications

const MainForm = () => {
  const { enqueueSnackbar } = useSnackbar(); // Hook to show notifications
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm();
  const creditorType = watch("creditorType");
  const COOKIE_KEY = "formData"; // Key for storing data in cookies
  const [activePartAStep, setActivePartAStep] = useState(0); // Track current step in Part A
  const [activeTab, setActiveTab] = useState(0); // Tab index
  const [loading, setLoading] = useState(false);
  const userId = 1;

  // Load data from cookies when the component mounts
  useEffect(() => {
    const savedData = Cookies.get(COOKIE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormValues(parsedData); // Prefill form with saved data
    }
  }, []);

  const setFormValues = (data, prefix = "") => {
    Object.keys(data).forEach((key) => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      const value = data[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        setFormValues(value, fieldName); // Handle nested objects
      } else {
        setValue(fieldName, value); // Set form field value
      }
    });
  };

  const handleNextPartA = async (data) => {
    // Save the current data to cookies before moving to the next step
    const savedData = Cookies.get(COOKIE_KEY) ? JSON.parse(Cookies.get(COOKIE_KEY)) : {};
    const updatedData = { ...savedData, ...data };
    Cookies.set(COOKIE_KEY, JSON.stringify(updatedData), { expires: 7 });

    // Move to the next step or switch to Part B
    if (activePartAStep < 3) {
      setActivePartAStep((prevStep) => prevStep + 1);
    } else {
      setActiveTab(1); // Switch to Part B after completing Part A
    }

    console.log("Form Data Saved to Cookies:", updatedData);

    // Handle the final API call if this is the last step (AssignmentDetails)
    if (activePartAStep === 3) {
      await handleFinalSubmit(updatedData);
    }
  };

  const handlePreviousPartA = () => {
    if (activePartAStep > 0) {
      setActivePartAStep((prevStep) => prevStep - 1);
    }
  };

  const handleFinalSubmit = async (data) => {
    setLoading(true); // Indicate loading for API call

    // Construct the request data based on form input
    const requestData = {
      RequestInfo: {},
      claimMstDetailsModel: {
        id: "claim123",
        creditorId: "creditor123",
        creditorIdType: data.creditorID,
        typeOfCreditor: data.creditorType,
        relatedParty: data.isRelatedParty,
        remarks: data.remarks,
        relationshipNature: data.natureOfRelationship,
        claimAppNum: data.claimAppNum || "",
        orgMstDetails: data.creditorType === "organization"
          ? {
              id: "org123",
              claimMst: "claim123",
              organizationName: data.organizationName,
              constitutionDetails: data.legalConstitution,
              isCinOrLlp: data.isCinOrLlp,
              registeredAddress: data.registeredAddress,
              emailId: data.emailAddress,
              authorizedFirstName: data.firstName,
              authorizedMiddleName: data.middleName,
              authorizedLastName: data.lastName,
              authorizedPersonDesignation: data.designation,
              authorizedPersonContactNumber: data.mobileNumber,
              authorizationLetter: data.authorizationLetter,
              auditDetails: {
                createdBy: "admin",
                lastModifiedBy: "admin",
                createdTime: Date.now(),
                lastModifiedTime: Date.now(),
              },
            }
          : null,
        individualCreditorMstDetails: data.creditorType === "individual"
          ? {
              id: "indiv123",
              claimMst: "claim123",
              name: data.name,
              creditorAddress: data.address,
              authorizedFirstName: data.firstIndividualName,
              authorizedMiddleName: data.middleIndividualName,
              authorizedLastName: data.lastIndividualName,
              emailId: data.emailAddress,
              auditDetails: {
                createdBy: "admin",
                lastModifiedBy: "admin",
                createdTime: Date.now(),
                lastModifiedTime: Date.now(),
              },
            }
          : null,
      },
    };

    try {
      // Perform API call
      const response = await axios.post(
        `http://localhost:8080/claim/step?userId=${userId}&pageNumber=${activePartAStep + 1}`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        console.log("Data saved successfully");
        enqueueSnackbar("Data saved successfully", { variant: "success" });
      } else {
        console.log("Error saving data:", response.status);
        enqueueSnackbar("Error saving data. Please try again.", { variant: "error" });
      }
    } catch (error) {
      console.error("Error in API call:", error);
      enqueueSnackbar("Error in API call. Please try again.", { variant: "error" });
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleTabChange = (event, newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  const partASteps = [
    <ClaimDetails
      onNext={handleSubmit((data) => handleNextPartA({ ...data, creditorType }))} // Pass creditorType
      creditorType={creditorType}
      register={register}
      errors={errors}
      watch={watch}
    />,
    <SecurityDetails
      register={register}
      errors={errors}
      onNext={handleSubmit((data) => handleNextPartA(data))}
      onPrevious={handlePreviousPartA}
    />,
    <BankDetails
      register={register}
      errors={errors}
      onNext={handleSubmit((data) => handleNextPartA(data))}
      onPrevious={handlePreviousPartA}
    />,
    <AssignmentDetails
      register={register}
      errors={errors}
      onNext={handleSubmit((data) => handleNextPartA(data))}
      onPrevious={handlePreviousPartA}
    />,
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
            <PartBForm
              onPrevious={() => setActiveTab(0)}
              onSubmit={handleFinalSubmit}
            />
          </div>
        )}
      </div>
    </Box>
  );
};

export default MainForm;
