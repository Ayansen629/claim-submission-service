import React, { useState, useEffect, useRef } from "react";
import PartBForm from "./partBForm";
import ClaimDetails from "./steeperform/claimdetails";
import AssignmentDetails from "./steeperform/AssignmentDetails";
import BankDetails from "./steeperform/BankDetails";
import SecurityDetails from "./steeperform/SecurityDetails";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import Stepper from "react-stepper-horizontal";

const MainForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const creditorType = watch("creditorType");
  const dataLoaded = useRef(false);

  const { enqueueSnackbar } = useSnackbar();
  const userId = 1;
  const [loading, setLoading] = useState(true);
  const [activePartAStep, setActivePartAStep] = useState(0); // Track current step in Part A
  const [activeTab, setActiveTab] = useState("partA"); // Track active tab
  const [displayName, setDisplayName] = useState(""); 

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

  useEffect(() => {
    const loadUserData = async () => {
      if (dataLoaded.current) return;

      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:8080/claim/loadUserDetails`,
          { userId }
        );

        if (response.status === 200) {
          const data = response.data.claimMstDetailsModel;
          setFormValues(data);
          dataLoaded.current = true;
        } else {
          console.error("Error loading data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const handleNextPartA = async (data) => {
    if (activePartAStep < 3) {
      setActivePartAStep((prevStep) => prevStep + 1);
    } else {
      setActiveTab("partB"); // Switch to Part B after completing Part A
    }

    // Log the data to check what is passed to the handleNext function
    console.log("Form Data:", data);
    console.log("creditorType:", data.creditorType);

    // Handle name based on creditorType
    let name = "";
    if (data.creditorType === "individual") {
      name = data.name || "";
    } else if (data.creditorType === "organization") {
      name = data.organizationName || "";
    }

    setDisplayName(name); // Update the display name state
    console.log("Display Name Set To:", name);

    // Data validation before sending the request
    if (!data.creditorType) {
      enqueueSnackbar("Creditor type is required!", { variant: "error" });
      setLoading(false);
      return;
    }

    if (data.creditorType === "individual" && (!data.name || !data.address)) {
      enqueueSnackbar("Name and Address are required for individual creditor!", { variant: "error" });
      setLoading(false);
      return;
    }

    if (data.creditorType === "organization" && (!data.organizationName || !data.registeredAddress)) {
      enqueueSnackbar("Organization name and Registered address are required for organization creditor!", { variant: "error" });
      setLoading(false);
      return;
    }

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
      setLoading(false);
    }
  };

  const handlePreviousPartA = () => {
    if (activePartAStep > 0) {
      setActivePartAStep((prevStep) => prevStep - 1);
    }
  };

  const handleFinalSubmit = async (data) => {
    console.log("Final Submit:", data);
  };

  const partASteps = [
    <ClaimDetails
      onNext={handleSubmit((data) => handleNextPartA({ ...data, creditorType }))}
      loading={loading}
      creditorType={creditorType}
      register={register}
      errors={errors}
      watch={watch}
      displayName={displayName}
      setLoading={setLoading}
      
    />,
    <SecurityDetails
      register={register}
      errors={errors}
      onNext={handleSubmit(handleNextPartA)}
      onPrevious={handlePreviousPartA}
      setLoading={setLoading}
    />,
    <BankDetails
      register={register}
      errors={errors}
      onNext={handleSubmit(handleNextPartA)}
      onPrevious={handlePreviousPartA}
    />,
    <AssignmentDetails
      register={register}
      errors={errors}
      onNext={handleSubmit(handleNextPartA)}
      onPrevious={handlePreviousPartA}
    />,
  ];

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "partA" ? "active" : ""}`}
            onClick={() => setActiveTab("partA")}
          >
            Part A
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "partB" ? "active" : ""}`}
            onClick={() => setActiveTab("partB")}
            disabled={activeTab !== "partB"} // Enable Part B only after Part A is completed
          >
            Part B
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "partA" && (
              <div className="tab-pane fade show active">
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
            {activeTab === "partB" && (
              <div className="tab-pane fade show active">
                <PartBForm
                  onPrevious={() => setActiveTab("partA")}
                  onSubmit={handleFinalSubmit}
                  loading={loading}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainForm;
