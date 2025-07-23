import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIkgXlx3w9-F09KwRLTOc-2HbqWPg8UzU",
  authDomain: "le-site-a74cd.firebaseapp.com",
  projectId: "le-site-a74cd",
  storageBucket: "le-site-a74cd.firebasestorage.app",
  messagingSenderId: "250137496267",
  appId: "1:250137496267:web:8071b40cde5b024102a94e",
  measurementId: "G-T4PHZ15FG4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 