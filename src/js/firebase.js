import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_GOOGLE_API_KEY}`,
  authDomain: "treatlie.firebaseapp.com",
  databaseURL: "https://treatlie-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "treatlie",
  storageBucket: "treatlie.appspot.com",
  messagingSenderId: "679615773376",
  appId: "1:679615773376:web:15d6fd8386060b24654b25",
  measurementId: "G-L89WEH5LEV",
};

console.log(process.env.FIREBASE_GOOGLE_API_KEY)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export default app
export {auth, db}

