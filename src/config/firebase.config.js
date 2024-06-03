// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_YWMbobg_41icAAEwJ6A1Sv4cRWTeW5M",
  authDomain: "facerecognitionuser.firebaseapp.com",
  projectId: "facerecognitionuser",
  storageBucket: "facerecognitionuser.appspot.com",
  messagingSenderId: "1028879612027",
  appId: "1:1028879612027:web:8ecfc034fc3d291a09cade",
  measurementId: "G-C1S700FE0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);