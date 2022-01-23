import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCznLmvQyjIC3F-by2YC08hf10Lx4G2eHk",
  authDomain: "scanner-679c6.firebaseapp.com",
  databaseURL: "https://scanner-679c6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "scanner-679c6",
  storageBucket: "scanner-679c6.appspot.com",
  messagingSenderId: "817673387996",
  appId: "1:817673387996:web:9d2fcb0b263c242c6b1919"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();