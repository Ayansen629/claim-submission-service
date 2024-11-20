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
    console.log(savedData,"handleSubmit");
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
    setLoading(true); // Start the loading indicator
    
    // Get saved data from both cookies
    const assignmentData = Cookies.get("assignmentDetailsFormData")
      ? JSON.parse(Cookies.get("assignmentDetailsFormData"))
      : {};
    const bankData = Cookies.get("bankDetailsFormData")
      ? JSON.parse(Cookies.get("bankDetailsFormData"))
      : {};
    const generalData = Cookies.get(COOKIE_KEY)
      ? JSON.parse(Cookies.get(COOKIE_KEY))
      : {}; // General form data cookie (if applicable)
  
    // Combine all the form data into one object
    const combinedData = {
      ...generalData,   // General form data
      ...assignmentData, // Assignment form data
      ...bankData,       // Bank form data
      ...data,           // Latest data passed into handleFinalSubmit
    };
  
    // Construct the request data based on combined data
    const requestData = {
      RequestInfo: {},
      claimMstDetailsModel: {
        id: "claim123",
        creditorId: "creditor123",
        creditorIdType: combinedData.creditorID,
        typeOfCreditor: combinedData.creditorType,
        relatedParty: combinedData.isRelatedParty,
        remarks: combinedData.remarks,
        relationshipNature: combinedData.natureOfRelationship,
        claimAppNum: combinedData.claimAppNum || "",
        orgMstDetails: combinedData.creditorType === "organization" ? {
          id: "org123",
          claimMst: "claim123",
          organizationName: combinedData.organizationName,
          constitutionDetails: combinedData.legalConstitution,
          isCinOrLlp: combinedData.isCinOrLlp,
          registeredAddress: combinedData.registeredAddress,
          emailId: combinedData.emailAddress,
          authorizedFirstName: combinedData.firstName,
          authorizedMiddleName: combinedData.middleName,
          authorizedLastName: combinedData.lastName,
          authorizedPersonDesignation: combinedData.designation,
          authorizedPersonContactNumber: combinedData.mobileNumber,
          authorizationLetter: combinedData.authorizationLetter,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        } : null,
        individualCreditorMstDetails: combinedData.creditorType === "individual" ? {
          id: "indiv123",
          claimMst: "claim123",
          name: combinedData.name,
          creditorAddress: combinedData.address,
          authorizedFirstName: combinedData.firstIndividualName,
          authorizedMiddleName: combinedData.middleIndividualName,
          authorizedLastName: combinedData.lastIndividualName,
          emailId: combinedData.emailAddress,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        } : null,
        // Include Bank Details if available
        bankMstDetails: bankData && {
          id: "bank123",
          claimMst: "claim123",
          bankName: bankData.bankName,
          accountNumber: bankData.accountNumber,
          ifscCode: bankData.ifsc,
          micrCode: bankData.micr,
          branchName: bankData.branch,
          swiftCode: bankData.swiftCode,
          scannedDocumentId: "",
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        },
        // Include Security Details if available
        securityMstDetails: combinedData.securityMstDetails || {
          claimMst: "claim123",
          id: "sec123",
          securityType: combinedData.securityType,
          securityPersonName: combinedData.securityPersonName,
          securityPersonPan: combinedData.securityPersonPan,
          securityDetails: combinedData.securityDetails,
          rocChargeId: combinedData.rocChargeId,
          cersaiSecurityId: combinedData.cersaiSecurityId,
          priorityOfChange: combinedData.priorityOfChange,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        },
        // Include Assignment Details if available
        assignmentMstDetails: assignmentData && {
          claimMst: "claim123",
          id: "assign123",
          assignorName: assignmentData.assignorName,
          assignorPan: assignmentData.assignorPan,
          assignmentDate: Date.now(),
          assignedAmount: assignmentData.assignedAssigned,
          remarks: assignmentData.assignmentRemarks,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        },
        auditDetails: {
          createdBy: "admin",
          createdTime: Date.now(),
          lastModifiedBy: "admin",
          lastModifiedTime: Date.now(),
        },
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
