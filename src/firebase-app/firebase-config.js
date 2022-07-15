import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAWfAKb3NmRrBAeE4M22kTviZ1DYQz0rcg",
  authDomain: "monkey-blogging-6cb09.firebaseapp.com",
  projectId: "monkey-blogging-6cb09",
  storageBucket: "monkey-blogging-6cb09.appspot.com",
  messagingSenderId: "108242587907",
  appId: "1:108242587907:web:1426ab2bbed513571c5936",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
