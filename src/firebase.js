import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const adminEmail = "amanupadhyay8146@gmail.com";

const firebaseConfig = {
  apiKey: "AIzaSyBUHF-4f_BmlZPXoBwIibliyFN0F1rQa2c",
  authDomain: "getfit-1e62d.firebaseapp.com",
  projectId: "getfit-1e62d",
  storageBucket: "getfit-1e62d.appspot.com", // <-- yahi hona chahiye
  messagingSenderId: "432937335278",
  appId: "1:432937335278:web:a992adb1615543e6c376ff",
  measurementId: "G-DP0CWC3QCQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);