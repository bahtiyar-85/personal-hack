import firebase from "firebase/compat/app";
import 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDqbqNfgwT9wlzRjAyWZor2GI1P8lKumqE",
    authDomain: "project-auth-baha.firebaseapp.com",
    projectId: "project-auth-baha",
    storageBucket: "project-auth-baha.appspot.com",
    messagingSenderId: "729132917009",
    appId: "1:729132917009:web:bdbd344820f2cde1b2acb0"
  };
  const fire = firebase.initializeApp(firebaseConfig)
  
  const db = getFirestore(initializeApp(firebaseConfig))
  export const googleAcc = getAuth(fire);
  export {db}
  export default fire;
  