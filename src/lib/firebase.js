// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKgO4xoXJSdlTLlMO6Y-MPNkJzcW47nQA",
  authDomain: "tumor-scan.firebaseapp.com",
  projectId: "tumor-scan",
  storageBucket: "tumor-scan.appspot.com",
  messagingSenderId: "243785654758",
  appId: "1:243785654758:web:605a1291041e80289b3627",
  measurementId: "G-D2HB8EG5GN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore();
export const auth = getAuth();