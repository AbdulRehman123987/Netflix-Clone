import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAIOeGSbfXA0cfms1iPo-femOdwj3qi8Jc",
  authDomain: "react-netflix-clone-c3e75.firebaseapp.com",
  projectId: "react-netflix-clone-c3e75",
  storageBucket: "react-netflix-clone-c3e75.appspot.com",
  messagingSenderId: "312904803753",
  appId: "1:312904803753:web:99a063a84bbf45fbd750b8",
  measurementId: "G-CDBS5NKJ65",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
