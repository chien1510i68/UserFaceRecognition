// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_vrFCuIR1SeEjmBO76bNM3Dilnwr4TTI",
  authDomain: "facerecognition-60f8d.firebaseapp.com",
  projectId: "facerecognition-60f8d",
  storageBucket: "facerecognition-60f8d.appspot.com",
  messagingSenderId: "381336574319",
  appId: "1:381336574319:web:a24ed06b4280efa282309a",
  measurementId: "G-9X11RS6LYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);