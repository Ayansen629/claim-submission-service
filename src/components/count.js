import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const BootstrapForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Watching the creditor type (individual or organization)
  const creditorType = watch("creditorType");

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
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
        orgMstDetails: creditorType === "organization" ? {
          id: "org123",
          claimMst: "claim123",
          organizationName: data.organizationName,
          constitutionDetails: data.legalConstitution,
          isCinOrLlp: data.isCinOrLlp,
          registeredAddress: data.registeredAddress,
          // contactNumber: data.mobileNumber,
          emailId: data.emailAddress,
          authorizedFirstName: data.firstName,
          authorizedMiddleName: data.middleName,
          authorizedLastName: data.lastName,
          // authorizedPersonName: data.authorizedPersonName,
          authorizedPersonDesignation: data.designation,
          authorizedPersonContactNumber: data.mobileNumber,
          authorizationLetter: data.authorizationLetter,
          // documentRefId: data.documentRefId,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        } : null,
        individualCreditorMstDetails: creditorType === "individual" ? {
          id: "indiv123",
          claimMst: "claim123",
          // firstName: data.firstName,
          // middleName: data.middleName,
          // lastName: data.lastName,
          name:data.name,
          creditorAddress: data.address,
          emailId: data.emailAddress,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        } : null,
        bankMstDetails: {
          id: "bank123",
          claimMst: "claim123",
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          ifscCode: data.ifsc,
          micrCode: data.micr,
          branchName: data.branch,
          swiftCode: data.swiftCode,
          scannedDocumentId: "",
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        },
        securityMstDetails: {
          claimMst: "claim123",
          id: "sec123",
          securityType: data.securityType,
          securityPersonName: data.securityPersonName,
          securityPersonPan: data.securityPersonPan,
          securityDetails: data.securityDetails,
          rocChargeId: data.rocChargeId,
          cersaiSecurityId: data.cersaiSecurityId,
          priorityOfChange: data.priorityOfChange,
          auditDetails: {
            createdBy: "admin",
            lastModifiedBy: "admin",
            createdTime: Date.now(),
            lastModifiedTime: Date.now(),
          },
        },
        assignmentMstDetails: {
          claimMst: "claim123",
          id: "assign123",
          assignorName: data.assignorName,
          assignorPan: data.assignorPan,
          assignmentDate: Date.now(),
          assignedAmount: data.assignedAssigned,
          remarks: data.assignmentRemarks,
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
      const res = await axios.post("YOUR_API_ENDPOINT_HERE", requestData);
      setResponse(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while submitting form data", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-10 col-md-9 col-lg-9">
          <div className="card p-4 p-lg-5 shadow-lg" style={{ borderRadius: "15px" }}>
            <h2 className="text-center text-primary mb-5">Creditor Information Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Form Fields for Display Name, Creditor Type, etc. */}
              <div className="mb-4">
                <label htmlFor="creditorId" className="form-label text-muted">Creditor ID</label>
                <input type="text" id="creditorId" className="form-control" {...register("creditorId", { required: true })} />
              </div>

              <div className="mb-4">
                <label htmlFor="creditorIdType" className="form-label text-muted">Creditor ID Type</label>
                <select className="form-select" {...register("creditorIdType", { required: true })}>
                  <option value="PAN">PAN</option>
                  <option value="Aadhar">Aadhar</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label text-muted">Type of Creditor</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="individual"
                      value="individual"
                      {...register("creditorType", { required: true })}
                    />
                    <label className="form-check-label" htmlFor="individual">Individual</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="organization"
                      value="organization"
                      {...register("creditorType", { required: true })}
                    />
                    <label className="form-check-label" htmlFor="organization">Organization</label>
                  </div>
                </div>
              </div>

              {/* Conditionally Render Individual or Organization Fields */}
              {creditorType === "individual" && (
                <div>
                  <h5>Individual Details</h5>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="form-label text-muted">First Name</label>
                    <input type="text" id="firstName" className="form-control" {...register("firstName", { required: true })} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="middleName" className="form-label text-muted">Middle Name</label>
                    <input type="text" id="middleName" className="form-control" {...register("middleName")} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="lastName" className="form-label text-muted">Last Name</label>
                    <input type="text" id="lastName" className="form-control" {...register("lastName", { required: true })} />
                  </div>
                </div>
              )}

              {creditorType === "organization" && (
                <div>
                  <h5>Organization Details</h5>
                  <div className="mb-4">
                    <label htmlFor="organizationName" className="form-label text-muted">Organization Name</label>
                    <input type="text" id="organizationName" className="form-control" {...register("organizationName", { required: true })} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="constitutionDetails" className="form-label text-muted">Constitution Details</label>
                    <select className="form-select" {...register("constitutionDetails", { required: true })}>
                      <option value="Private Ltd">Private Ltd</option>
                      <option value="Public Ltd">Public Ltd</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>

            {/* API Response */}
            {response && (
              <div className="alert alert-success mt-4" role="alert">
                <strong>Success:</strong> {JSON.stringify(response)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapForm;
