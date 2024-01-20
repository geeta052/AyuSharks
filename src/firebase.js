import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ayush-database-3e82c.firebaseapp.com",
  projectId: "ayush-database-3e82c",
  storageBucket: "ayush-database-3e82c.appspot.com",
  messagingSenderId: "1064031672002",
  appId: "1:1064031672002:web:ce0ec7eef28a03eea88d5b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);