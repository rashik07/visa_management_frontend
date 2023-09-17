// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain:  process.env.REACT_APP_AUTH_DOMAIN,
  // projectId:  process.env.REACT_APP_PROJECT_ID,
  // storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  // appId: process.env.REACT_APP_APP_ID,

  apiKey: "AIzaSyAN2kQb8H_nqgnATvLBOTEQx7uPjfpdTGk",
  authDomain: "filemanagement-9ccdb.firebaseapp.com",
  projectId: "filemanagement-9ccdb",
  storageBucket: "filemanagement-9ccdb.appspot.com",
  messagingSenderId: "697777834520",
  appId: "1:697777834520:web:6ebab669faeb784b32516d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
