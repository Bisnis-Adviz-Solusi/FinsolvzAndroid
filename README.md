Finsolvz is a financial reporting platform built with React Native (Expo) for Android frontend and Express.js + MongoDB for backend. It helps companies submit and manage their financial reports (Balance Sheet, Profit & Loss, Revenue, etc.) through a simple, intuitive interface.

📲 Tech Stack

Frontend (Mobile): React Native (Expo), TypeScript
Backend: Node.js, Express.js
Database: MongoDB
State Management: React hooks
API Client: Axios
Others: i18next (internationalization), AsyncStorage

-----------------------------

🔗 Important Links
Spreadsheet Template: [TBA](https://docs.google.com/spreadsheets/d/1JQo7bi6PO8OXAym97Gp9xAVbDZm-L-I1/edit?usp=drive_link&ouid=102522500447593840388&rtpof=true&sd=true)
.env: [TBA](https://drive.google.com/drive/u/5/folders/1WcZEPBtt_gYJztOoaan6Hn5ri1Q5h4xI)

-----------------------------

🧪 How to Run This Project
Backend (Express.js)

cd backend
npm install
npm run dev

Mobile App (React Native with Expo)
cd mobile
npm install
npx expo start

Make sure .env contains the following:

EXPO_PUBLIC_API_URL=http://<your-local-ip>:<port>

-----------------------------

**App Flow (Simplified)**
Login → Home → Upload Excel → Parse + Save → Show Table → View Detail / Compare Report

**User Roles**
SUPER_ADMIN: Full access to users, companies, and reports.
ADMIN: Create/edit own reports, view company-related data.
CLIENT: View reports assigned to their company only.

-----------------------------

** API Routes Summary**

**Auth (6 routes)**
POST /login
GET /loginUser
POST /logout
POST /forgot-password
POST /reset-password
PATCH /change-password

**Users (7 routes)**
POST /users
GET /users
GET /users/:id
GET /users/byName/:name
PUT /updateUser/:id
PUT /updateRole
DELETE /users/:id

**Companies (7 routes)**
POST /company
GET /company
GET /company/:id
GET /company/:name
PUT /company/:id
DELETE /company/:id
GET /user/companies

**Reports (11 routes)**
POST /reports
PUT /reports/:id
DELETE /reports/:id
GET /reports
GET /reports/:id
GET /reports/name/:name
GET /reports/company/:companyId
POST /reports/companies
GET /reports/reportType/:reportTypeId
GET /reports/userAccess/:userId
GET /reports/createdBy/:userId

**Report Types (6 routes)**
GET /reportTypes
GET /reportTypes/:id
GET /reportTypes/:name
POST /reportTypes
PUT /reportTypes/:id
DELETE /reportTypes/:id

✅ Total: 37 API Routes

**How to Increase Android Version (Expo Eject)**

To update your Android version code and version name (required for Play Store uploads), you can do it manually via Android Studio or using CLI.

**Option 1: Using Android Studio**

Open project in Android Studio.

Navigate to android/app/build.gradle

Look for this section:

defaultConfig {
    applicationId "finsolvz.beta"
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
    versionCode 1
    versionName "1.0"
}



**Update it to something like:**

versionCode 2
versionName "1.0.1"

Save and rebuild.


**Option 2: Using CLI (Expo / EAS)**

You can also update versionCode and versionName** manually,** then build with:

npx expo run:android

Or with EAS:

eas build -p android --profile production

**⚠️⚠️ versionCode must always increase with each upload to Play Store. ⚠️⚠️**

