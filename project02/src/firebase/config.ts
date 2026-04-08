// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKEiwHG_e-tjJBZWP03C8J-78HJrvljk4",
  authDomain: "project-uao-ed2.firebaseapp.com",
  projectId: "project-uao-ed2",
  storageBucket: "project-uao-ed2.firebasestorage.app",
  messagingSenderId: "131499728170",
  appId: "1:131499728170:web:00f5fa3d83705e3f9c5253",
  measurementId: "G-LEPM5M86FE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize firebase auth
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const analytics = isSupported().then((yes)=>
  yes?getAnalytics(app): null
)

export default { app, auth, db, storage }