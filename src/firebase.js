// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB23ECFse1Vqbn7TBYbRp8BYnCmPF4Z6pA",
  authDomain: "npx-realtor-clone.firebaseapp.com",
  projectId: "npx-realtor-clone",
  storageBucket: "npx-realtor-clone.appspot.com",
  messagingSenderId: "158801118005",
  appId: "1:158801118005:web:25ccf3c83ae9e897b3827c",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
