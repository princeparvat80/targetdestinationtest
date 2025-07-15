// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2tTf5kw7t2R9W-leCAY_RAqqpmkfONhQ",
  authDomain: "aeptargetdestinationproject.firebaseapp.com",
  projectId: "aeptargetdestinationproject",
  storageBucket: "aeptargetdestinationproject.firebasestorage.app",
  messagingSenderId: "701435833002",
  appId: "1:701435833002:web:1bf685a97527972a527ed3",
  measurementId: "G-Q80DH81LGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);