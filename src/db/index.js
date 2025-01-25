import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0MJVlWEXn_znhG5lDpps0tTd-qw5XMDQ",
  authDomain: "appchamados-6e557.firebaseapp.com",
  projectId: "appchamados-6e557",
  storageBucket: "appchamados-6e557.firebasestorage.app",
  messagingSenderId: "129807661747",
  appId: "1:129807661747:web:f20cbfd2699cc2f786cec6",
  measurementId: "G-3QH5M8R8EC",
};

const fireBaseApp = initializeApp(firebaseConfig);

export const Db = getFirestore(fireBaseApp);
export const auth = getAuth(fireBaseApp);
