// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKWaEVy8JwxYPiZfPWq3xOOpzHovRTL7o",
  authDomain: "cp-store-7bdbc.firebaseapp.com",
  projectId: "cp-store-7bdbc",
  storageBucket: "cp-store-7bdbc.appspot.com",
  messagingSenderId: "797083458605",
  appId: "1:797083458605:web:96224c232207e6f91a6ca4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)