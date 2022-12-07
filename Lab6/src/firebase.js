import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig={
    apiKey: "AIzaSyAiurNnOVdKKZMZaHqyEd3GUCqBbK4swmY",
    authDomain:"messaging-app-87356.firebaseapp.com",
    projectId:"messaging-app-87356",
    storageBucket:"messaging-app-87356.appspot.com",
    messagingSenderId:"842537690471",
    appId:"1:842537690471:web:3c732189ced26ec09dbbc2"
    
};

const firebaseApp=initializeApp(firebaseConfig)
const db= firebaseApp.firestore()
const auth= getAuth()
const provider=new auth.GoogleAuthProvider()


export {auth, provider}

export default db




