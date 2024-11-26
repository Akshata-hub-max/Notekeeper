import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF_1EKnOjBYHhMIaTovgVCqYrfRWtVEAE",
  authDomain: "notekeep-db859.firebaseapp.com",
  databaseURL: "https://notekeep-db859-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "notekeep-db859",
  storageBucket: "notekeep-db859.firebasestorage.app",
  messagingSenderId: "400279219932",
  appId: "1:400279219932:web:fc6a2deeb212554c49ce19"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
