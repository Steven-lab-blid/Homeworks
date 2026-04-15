import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCKEiwHG_e-tjJBZWP03C8J-78HJrvljk4",
  authDomain: "project-uao-ed2.firebaseapp.com",
  databaseURL: "https://project-uao-ed2-default-rtdb.firebaseio.com",
  projectId: "project-uao-ed2",
  storageBucket: "project-uao-ed2.firebasestorage.app",
  messagingSenderId: "131499728170",
  appId: "1:131499728170:web:00f5fa3d83705e3f9c5253",
  measurementId: "G-LEPM5M86FE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);