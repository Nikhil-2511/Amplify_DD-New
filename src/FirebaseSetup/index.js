
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHfNsiAQ_CAGE5Ju-ymIuB0QoahROpOUk",
  authDomain: "donedeals-894bc.firebaseapp.com",
  projectId: "donedeals-894bc",
  storageBucket: "donedeals-894bc.appspot.com",
  messagingSenderId: "160916723263",
  appId: "1:160916723263:web:95c92c659542a727e98a8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
