
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLVTiUo5aeH0qT4wLwuMo0cgAdgIyxpZE",
  authDomain: "galaxonixx.firebaseapp.com",
  projectId: "galaxonixx",
  storageBucket: "galaxonixx.firebasestorage.app",
  messagingSenderId: "322569983939",
  appId: "1:322569983939:web:567934420be2b13489cf76",
  measurementId: "G-K2DE3KYCK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
