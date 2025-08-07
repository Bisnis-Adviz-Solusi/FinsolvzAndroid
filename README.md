# OVERVIEW
Finsolvz is a financial reporting platform built with React Native (Expo) for Android frontend and Express.js + MongoDB for backend. It helps companies submit and manage their financial reports (Balance Sheet, Profit & Loss, Revenue, etc.) through a simple, intuitive interface.

<br/>

## Website URL

https://finsolvz.adviz.id/

<br/>

## Tech Stack

|               | Tools & Libraries                      |
|---------------|------------------------------------------|
| Frontend      | React Native (Expo), TypeScript         |
| Backend       | Node.js, Express.js                     |
| Database      | MongoDB                                 |
| State Mgmt    | React Hooks                             |
| API Client    | Axios                                   |
| Others        | i18next (internationalization), AsyncStorage |

<br/>
<br/>

## Run Project

### Backend (Express.js)

```
cd backend
npm install
npm run dev
```
<br/>

### Mobile App (React Native with Expo)

```
cd mobile
npm install
npx expo prebuild
npx expo start
```
<br/>
<br/>

## App Flow

*Login → Home → Upload Excel → Parse + Save → Show Table → View Detail / Compare Report*

#### User Roles

| Role         | Permissions                                               |
|--------------|-----------------------------------------------------------|
| SUPER_ADMIN  | Full access to users, companies, and reports              |
| ADMIN        | Create/edit own reports, view company-related data        |
| CLIENT       | View reports assigned to their company only               |

<br/>

## Routes

#### Auth

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | /login               | User login                |
| GET    | /loginUser           | Get current user          |
| POST   | /logout              | Logout user               |
| POST   | /forgot-password     | Send reset email          |
| POST   | /reset-password      | Reset password with token |
| PATCH  | /change-password     | Change user password      |

<br/>
<br/>

#### Users

| Method | Endpoint                  | Description            |
|--------|---------------------------|------------------------|
| POST   | /users                    | Register new user      |
| GET    | /users                    | Get all users          |
| GET    | /users/:id                | Get user by ID         |
| GET    | /users/byName/:name       | Get user by name/email |
| PUT    | /updateUser/:id           | Update user info       |
| PUT    | /updateRole               | Update user role       |
| DELETE | /users/:id                | Delete user            |

<br/>
<br/>

#### Companies

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | /company               | Create new company       |
| GET    | /company               | Get all companies        |
| GET    | /company/:id           | Get company by ID        |
| GET    | /company/:name         | Get company by name      |
| PUT    | /company/:id           | Update company           |
| DELETE | /company/:id           | Delete company           |
| GET    | /user/companies        | Get companies by user    |

<br/>
<br/>

#### Reports

| Method | Endpoint                          | Description                     |
|--------|-----------------------------------|---------------------------------|
| POST   | /reports                          | Create report                   |
| PUT    | /reports/:id                      | Update report                   |
| DELETE | /reports/:id                      | Delete report                   |
| GET    | /reports                          | Get all reports                 |
| GET    | /reports/:id                      | Get report by ID                |
| GET    | /reports/name/:name               | Get report by name              |
| GET    | /reports/company/:companyId       | Get reports by company          |
| POST   | /reports/companies                | Get reports by multiple companies |
| GET    | /reports/reportType/:reportTypeId | Get reports by type             |
| GET    | /reports/userAccess/:userId       | Get reports accessible to user  |
| GET    | /reports/createdBy/:userId        | Get reports created by user     |

<br/>
<br/>

#### Report Type
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | /reportTypes        | Get all report types |
| GET    | /reportTypes/:id    | Get type by ID       |
| GET    | /reportTypes/:name  | Get type by name     |
| POST   | /reportTypes        | Create report type   |
| PUT    | /reportTypes/:id    | Update report type   |
| DELETE | /reportTypes/:id    | Delete report type   |

<br/>

### ✅ Total: 37 API Routes

<br/>
<br/>


## How to Increase Android Version (Expo Eject)

To update your Android version code and version name (required for Play Store uploads), you can do it manually via Android Studio or using CLI.

#### Option 1: Using Android Studio

> - Open project in Android Studio.  
>   
> - Navigate to android/app/build.gradle  
>   
> - Look for this section:  
>   
> ```
> defaultConfig {
>     applicationId "finsolvz.beta"
>     minSdkVersion rootProject.ext.minSdkVersion
>     targetSdkVersion rootProject.ext.targetSdkVersion
>     versionCode 1
>     versionName "1.0"
> }
> ```  
>   
> - Increase the version number  
>   
> ```
> versionCode 2
> versionName "1.0.1"
> ```  
>   
> - Save and rebuild.  


<br/>
<br/>

#### Option 2: Using CLI (Expo / EAS)

> Update **versionCode** and **versionName** manually, then build with:  
>   
> ```
> npx expo run:android
> ```  
>   
> <br/>  
>   
> Or with EAS:  
>   
> ```
> eas build -p android --profile production
> ```


**⚠️⚠️ versionCode must always increase with each upload to Play Store. ⚠️⚠️**

<br>

<br/>

## How to Increase AGP (Android Gradle Plugin)

> - UPDATE AGP VERSION
>   - Open \FinsolvzAndroid\mobile\android\build.gradle
>
>    ```
>   dependencies {
>    classpath( 'com.android.tools.build:gradle:8.12.0')
>    classpath('com.facebook.react:react-native-gradle-plugin')
>    classpath('org.jetbrains.kotlin:kotlin-gradle-plugin')}
>   ```
>   - Increase the version 
>
> <br/>
>
> - UPDATE GRADLE VERSION
>   - Open \FinsolvzAndroid\mobile\android\gradle\wrapper\gradle-wrapper.properties
>   - Edit distributionUrl [[Find compatible Gradle version](https://developer.android.com/studio/releases/gradle-plugin#updating-gradle)]
>   - ```
>        distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-bin.zip
>

<br>

<br/>

## Important Links

[Spreadsheet Template](https://docs.google.com/spreadsheets/d/1JQo7bi6PO8OXAym97Gp9xAVbDZm-L-I1/edit?usp=drive_link&ouid=102522500447593840388&rtpof=true&sd=true)

[.env](https://drive.google.com/drive/u/5/folders/1WcZEPBtt_gYJztOoaan6Hn5ri1Q5h4xI)

