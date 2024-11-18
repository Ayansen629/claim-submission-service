import React, { useState, useEffect,useRef  } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import PartAForm from "./partAForm";
import PartBForm from "./partBForm";
import axios from "axios";
import { useSnackbar } from "notistack"; // Optional for notification
import { useForm } from "react-hook-form";

const MainForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [activeStep, setActiveStep] = useState(0); // Start from 0 for step indexing
  const creditorType = watch("creditorType");
  const dataLoaded = useRef(false); // To track if data is already loaded

  const { enqueueSnackbar } = useSnackbar(); // Optional for notification
  const userId = 1;
  const [loading, setLoading] = useState(true); // Loader state
  const [displayName, setDisplayName] = useState(""); // State to hold the display name

  // Recursive function to set values from nested data structure
  const setFormValues = (data, prefix = "") => {
    Object.keys(data).forEach((key) => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      const value = data[key];

      // Check if the value is an object and recurse
      if (value && typeof value === "object" && !Array.isArray(value)) {
        setFormValues(value, fieldName);
      } else {
        // Set value if it's a simple field
        setValue(fieldName, value);
      }
    });
  };
  useEffect(() => {
    const loadUserData = async () => {
      if (dataLoaded.current) return; // Skip if data already loaded

      try {
        setLoading(true); // Show loader
        const response = await axios.post(
          `http://localhost:8080/claim/loadUserDetails`,
          { userId }
        );

        if (response.status === 200) {
          const data = response.data.claimMstDetailsModel;
          setFormValues(data); // Populate form fields
          dataLoaded.current = true; // Mark data as loaded
        } else {
          console.error("Error loading data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Hide loader once done
      }
    };

    loadUserData();
  }, [userId]);

//   useEffect(() => {
//     const delayAndLoadData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate loading

//       try {
//         setLoading(true); // Show loader
//         const response = await axios.post(`http://localhost:8080/claim/loadUserDetails`, { userId });

//         if (response.status === 200) {
//           const data = response.data.claimMstDetailsModel;
//           setFormValues(data); // Populate form fields
//         } else {
//           console.error("Error loading data:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false); // Hide loader once done
//       }
//     };

//     delayAndLoadData();
//   }, [userId, setValue]);

const handleNext = async (data) => {
    setLoading(true);
  
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
        `http://localhost:8080/claim/step?userId=${userId}&pageNumber=${activeStep + 1}`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        console.log("Data saved successfully");
      } else {
        console.log("Error saving data:", response.status);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    } finally {
      setLoading(false);
      setActiveStep((prevStep) => prevStep + 1); // Move to the next step
    }
  };
  const handleSaveDraft = async (data) => {
    setLoading(true);

    let name = "";
    if (creditorType === "individual") {
      name = data.individualName;
    } else if (creditorType === "organization") {
      name = data.organizationName;
    }

    setDisplayName(name); // Update the display name state

    const requestData = {
      RequestInfo: {},
      claimMstDetailsModel: {
        id: "claim123",
        creditorId: "creditor123",
        creditorIdType: data.creditorID,
        typeOfCreditor: creditorType,
        relatedParty: data.isRelatedParty,
        remarks: data.remarks,
        relationshipNature: data.natureOfRelationship,
        claimAppNum: data.claimAppNum || "",
        orgMstDetails:
          creditorType === "organization"
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
        individualCreditorMstDetails:
          creditorType === "individual"
            ? {
                id: "indiv123",
                claimMst: "claim123",
                name: data.individualName,
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
        `http://localhost:8080/claim/step?userId=${userId}&pageNumber=${activeStep+1}`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        console.log("Draft saved successfully");
      } else {
        console.log("Error saving draft:", response.status);
      }
    } catch (error) {
      console.error("Error in saving draft API call:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // const handleSaveDraft = async (formData) => {
  //   setLoading(true);

  //   console.log("Saving Draft Data:", formData); // Log draft data for debugging

  //   const requestData = {
  //     userId,
  //     formData, // Directly pass formData here
  //   };

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/claim/saveDraft`,
  //       requestData,
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     if (response.status === 200) {
  //       enqueueSnackbar("Draft saved successfully!", { variant: "success" });
  //     } else {
  //       enqueueSnackbar("Failed to save draft!", { variant: "error" });
  //     }
  //   } catch (error) {
  //     enqueueSnackbar("Error in save draft API!", { variant: "error" });
  //     console.error("API Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  // const handleSaveDraft = async (data) => {
  //   setLoading(true);
  
  //   let name = "";
  //   if (creditorType === "individual") {
  //     name = data.individualName;
  //   } else if (creditorType === "organization") {
  //     name = data.organizationName;
  //   }
  
  //   setDisplayName(name); // Update the display name state
  
  //   const requestData = {
  //     RequestInfo: {},
  //     claimMstDetailsModel: {
  //       id: "claim123",
  //       creditorId: "creditor123",
  //       creditorIdType: data.creditorID,
  //       typeOfCreditor: data.creditorType,
  //       relatedParty: data.isRelatedParty,
  //       remarks: data.remarks,
  //       relationshipNature: data.natureOfRelationship,
  //       claimAppNum: data.claimAppNum || "",
  //       orgMstDetails: data.creditorType === "organization"
  //         ? {
  //             id: "org123",
  //             claimMst: "claim123",
  //             organizationName: data.organizationName,
  //             constitutionDetails: data.legalConstitution,
  //             isCinOrLlp: data.isCinOrLlp,
  //             registeredAddress: data.registeredAddress,
  //             emailId: data.emailAddress,
  //             authorizedFirstName: data.firstName,
  //             authorizedMiddleName: data.middleName,
  //             authorizedLastName: data.lastName,
  //             authorizedPersonDesignation: data.designation,
  //             authorizedPersonContactNumber: data.mobileNumber,
  //             authorizationLetter: data.authorizationLetter,
  //             auditDetails: {
  //               createdBy: "admin",
  //               lastModifiedBy: "admin",
  //               createdTime: Date.now(),
  //               lastModifiedTime: Date.now(),
  //             },
  //           }
  //         : null,
  //       individualCreditorMstDetails: data.creditorType === "individual"
  //         ? {
  //             id: "indiv123",
  //             claimMst: "claim123",
  //             name: data.name,
  //             creditorAddress: data.address,
  //             authorizedFirstName: data.firstIndividualName,
  //             authorizedMiddleName: data.middleIndividualName,
  //             authorizedLastName: data.lastIndividualName,
  //             emailId: data.emailAddress,
  //             auditDetails: {
  //               createdBy: "admin",
  //               lastModifiedBy: "admin",
  //               createdTime: Date.now(),
  //               lastModifiedTime: Date.now(),
  //             },
  //           }
  //         : null,
  //     },
  //   };
  
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/claim/step?userId=${userId}&pageNumber=${activeStep}`,
  //       requestData,
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  
  //     if (response.status === 200) {
  //       console.log("Draft saved successfully");
  //     } else {
  //       console.log("Error saving draft:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error in saving draft API call:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1); // Move to previous page
  };

  const handleFinalSubmit = async (data) => {
    // Final submit logic goes here
  };

  return (
    <div className="container mt-5 bigForm">
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Part A</StepLabel>
        </Step>
        <Step>
          <StepLabel>Part B</StepLabel>
        </Step>
      </Stepper>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="form-content">
          {activeStep === 0 && (
           <PartAForm
           onNext={handleSubmit((data) => handleNext({ ...data, creditorType }))}
           loading={loading}
           displayName={displayName}
           creditorType={creditorType}
           register={register}
           errors={errors}
           onSaveDraft={handleSaveDraft}
         />
         
          )}
          {activeStep === 1 && (
            <PartBForm
              onPrevious={handleBack}
              onSubmit={handleFinalSubmit}
              loading={loading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MainForm;
