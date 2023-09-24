import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDNpjoUN7n3Bf416CJs9N1T5m1acf7vLE4",
  authDomain: "radiant-4d4d8.firebaseapp.com",
  projectId: "radiant-4d4d8",
  storageBucket: "radiant-4d4d8.appspot.com",
  messagingSenderId: "687610591606",
  appId: "1:687610591606:web:73bc4410c5f7bda079a257"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)