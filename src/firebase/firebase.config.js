// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZeJNeM8YVgIYoClFRDmYv_xpc5Wr6O_U",
  authDomain: "password-authentication-1977b.firebaseapp.com",
  projectId: "password-authentication-1977b",
  storageBucket: "password-authentication-1977b.appspot.com",
  messagingSenderId: "602121982164",
  appId: "1:602121982164:web:c9f85e87cf5bceb7c22b41",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
