// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDsCyOXA50dNJt5ID4GmLVJoumw4RYRso",
  authDomain: "userattendace.firebaseapp.com",
  projectId: "userattendace",
  storageBucket: "userattendace.appspot.com",
  messagingSenderId: "1039363689718",
  appId: "1:1039363689718:web:388742249bee313c24f0d7",
  measurementId: "G-FLN0Y64GQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);