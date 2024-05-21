import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyBHch1p8x_3_atUmPPGLnDBI092Rm5KkwE",
  apiKey: `${process.env.FIREBASE_GOOGLE_API_KEY}`,
  authDomain: "treatlie.firebaseapp.com",
  projectId: "treatlie",
  storageBucket: "treatlie.appspot.com",
  messagingSenderId: "679615773376",
  appId: "1:679615773376:web:15d6fd8386060b24654b25",
  measurementId: "G-L89WEH5LEV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
