// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxe19JvYyhtVfplp3A5DPNmxmojBX0LlU",
  authDomain: "lista1-517d0.firebaseapp.com",
  databaseURL: "https://lista1-517d0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lista1-517d0",
  storageBucket: "lista1-517d0.firebasestorage.app",
  messagingSenderId: "387301231524",
  appId: "1:387301231524:web:5f9faa071c51c5b9a1cf31",
  measurementId: "G-89KKHH5JBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);