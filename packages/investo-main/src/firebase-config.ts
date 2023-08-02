// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATrHf1HOVxz9NS5iUcg6TPjcTK_zlkT5k",
  authDomain: "investo-a9645.firebaseapp.com",
  projectId: "investo-a9645",
  storageBucket: "investo-a9645.appspot.com",
  messagingSenderId: "1022998307843",
  appId: "1:1022998307843:web:2f23be57f7f5321320da36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();