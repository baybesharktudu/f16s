// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'f16s-df50f.firebaseapp.com',
    projectId: 'f16s-df50f',
    storageBucket: 'f16s-df50f.appspot.com',
    messagingSenderId: '380084584411',
    appId: '1:380084584411:web:bef2c568ba9512c606b1fe',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
