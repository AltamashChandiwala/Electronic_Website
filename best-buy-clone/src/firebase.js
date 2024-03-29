import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDxXkl6liymr9WmJOSO2dtQA5-UcdL28GE",
    authDomain: "techstore-4833e.firebaseapp.com",
    projectId: "techstore-4833e",
    storageBucket: "techstore-4833e.appspot.com",
    messagingSenderId: "803001587598",
    appId: "1:803001587598:web:3726ab6b005d081da4b6df",
    measurementId: "G-3KNFTBSD8T"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();
