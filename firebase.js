
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD4RWlsh9T31x_evGTTBLB29-_F0R4pqEY",
  authDomain: "moon-ad406.firebaseapp.com",
  projectId: "moon-ad406",
  storageBucket: "moon-ad406.firebasestorage.app",
  messagingSenderId: "976533399982",
  appId: "1:976533399982:web:dcf8a196ae831c18df403f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
