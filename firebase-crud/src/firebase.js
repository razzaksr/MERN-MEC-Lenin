// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1VppD-UsVKnTPkIGc8CT1BbbjshYmbsQ",
  authDomain: "lenin-batch.firebaseapp.com",
  projectId: "lenin-batch",
  storageBucket: "lenin-batch.firebasestorage.app",
  messagingSenderId: "1010549370172",
  appId: "1:1010549370172:web:f3eb46828850f3f8fcc239"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}