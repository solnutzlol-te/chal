// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATitUIvzSkMrQMMnxiGDH9N4wLS6QDAfc",
  authDomain: "chalkies-memes.firebaseapp.com",
  projectId: "chalkies-memes",
  storageBucket: "chalkies-memes.firebasestorage.app",
  messagingSenderId: "689765838188",
  appId: "1:689765838188:web:d86e5a21e2b4946d855749",
  measurementId: "G-TDBZ90RD1T",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
