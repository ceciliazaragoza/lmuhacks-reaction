// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdFHAqkMVOOk3vLfgN0-HGnPAJMKn-Kps",
  authDomain: "reaction-ff32a.firebaseapp.com",
  projectId: "reaction-ff32a",
  storageBucket: "reaction-ff32a.appspot.com",
  messagingSenderId: "124987571385",
  appId: "1:124987571385:web:ee0451c7f9af119d28af68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
