import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCOJswjhqabxUAmdAMjyO9FbO4eMAgDKNY",
    authDomain: "email-pass-auth-practice-15df0.firebaseapp.com",
    projectId: "email-pass-auth-practice-15df0",
    storageBucket: "email-pass-auth-practice-15df0.appspot.com",
    messagingSenderId: "527810661390",
    appId: "1:527810661390:web:71dfc398153fca70a4405f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;