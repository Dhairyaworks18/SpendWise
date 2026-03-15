# SpendWise

SpendWise — A modern personal finance tracking mobile application.

## 📱 Project Description
SpendWise is a feature-rich personal finance management mobile application built to help you take complete control of your finances. With smart budgeting, transaction tracking, and insightful financial analytics, SpendWise makes it easy to understand where your money goes.

## ✨ Feature List
- **Dashboard & Analytics:** View your total balance, income, and expenses with beautiful, easy-to-read charts.
- **Transaction Tracking:** Add, edit, or delete transactions with categorization.
- **Budgeting:** Set monthly budgets and track your spending against your goals.
- **Smart Filtering:** Filter transactions by date, category, and type (income/expense).
- **Secure Authentication:** Keep your financial data safe with integrated authentication.

## 💻 Tech Stack
- **Frontend:** React Native, Expo, Expo Router
- **Styling:** Tailwind CSS (NativeWind) or StyleSheet
- **Backend/Database:** Firebase (Authentication, Firestore, Storage)
- **State Management:** React Native hooks and contextual state

## 🚀 Installation Instructions
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/spendwise.git
   cd spendwise
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## 🏃 Running with Expo
You can run SpendWise using the Expo CLI:
```bash
npm start
```
- Press `a` to run on an Android emulator or connected device.
- Press `i` to run on an iOS simulator (requires Xcode on macOS).

## 🔥 Firebase Setup Instructions
SpendWise relies on Firebase for backend services. Follow these steps to set up your own Firebase project:
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project named "SpendWise".
2. Enable **Authentication** (Email/Password).
3. Enable **Firestore Database** and set up your security rules.
4. Enable **Cloud Storage** for any required image uploads.
5. Create a Web App within your Firebase project.
6. Copy your Firebase configuration details and create an `.env` file in the root of the project with the following keys:
   ```env
   API_KEY=your_api_key
   APP_ID=your_app_id
   STORAGE_BUCKET=your_storage_bucket
   ```
   *(Note: Add any other required environment variables matching the `app.config.js` or `firebase.ts` files.)*

---
Take control of your finances today with SpendWise!
