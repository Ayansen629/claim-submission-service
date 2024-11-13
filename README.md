# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
{    "RequestInfo": {},    "claimMstDetailsModel": {        "id": "claim123",        "creditorId": "creditor123",        "creditorIdType": "PAN",        "typeOfCreditor": "Individual",        "relatedParty": true,        "remarks": "Claim details for verification.",        "relationshipNature": "Spouse",        "claimAppNum": "",                "orgMstDetails": {            "id": "org123",            "claimMst": "claim123",            "organizationName": "ABC Corp",            "constitutionDetails": "Private Ltd",            "isCinOrLlp": true,            "registeredAddress": "123, ABC Street, City, Country",            "contactNumber": "9876543210",            "emailId": "contact@abccorp.com",            "authorizedPersonName": "John Doe",            "authorizedPersonDesignation": "CEO",            "authorizedPersonContactNumber": "9876543211",            "authorizationLetter": "authLetter123",            "documentRefId": "docRef123",            "auditDetails": {                "createdBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "lastModifiedBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "createdTime": 1726568651786,                "lastModifiedTime": 1726568651786            }        },        "individualCreditorMstDetails": {            "id": "indiv123",            "claimMst": "claim123",            "firstName": "Jane",            "middleName": "D",            "lastName": "Doe",            "creditorAddress": "456, XYZ Street, City, Country",            "emailId": "jane.doe@email.com",            "auditDetails": {                "createdBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "lastModifiedBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "createdTime": 1726568651786,                "lastModifiedTime": 1726568651786            }        },        "bankMstDetails": {            "id": "bank123",            "claimMst": "claim123",            "bankName": "XYZ Bank",            "accountNumber": "1234567890",            "ifscCode": "XYZB0001234",            "micrCode": "987654321",            "branchName": "Main Branch",            "swiftCode": "XYZSWIFT",            "scannedDocumentId": "scannedDoc123",            "auditDetails": {                "createdBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "lastModifiedBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "createdTime": 1726568651786,                "lastModifiedTime": 1726568651786            }        },        "securityMstDetails": {            "claimMst": "claim123",            "id": "sec123",            "securityType": "Real Estate",            "auditDetails": {                "createdBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "lastModifiedBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "createdTime": 1726568651786,                "lastModifiedTime": 1726568651786            }        },        "assignmentMstDetails": {            "claimMst": "claim123",            "id": "assign123",            "assignorName": "John Doe",            "assignorPan": "ABCDE1234F",            "assignmentDate": 1726568651786,            "assignedAmount": 500000,            "remarks": "Assignment for claim approval.",            "auditDetails": {                "createdBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "lastModifiedBy": "5b502ac1-5941-4d30-8a5e-251435efe591",                "createdTime": 1726568651786,                "lastModifiedTime": 1726568651786            }        },        "auditDetails": {            "createdBy": "admin",            "createdTime": 1625779890000,            "lastModifiedBy": "admin",            "lastModifiedTime": 1625779890000        }    }} 
