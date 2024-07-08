// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBrz5pFsBPKitA8q_2mVhmVH9Ign_2d57w',
  authDomain: 'tastebuds-7108b.firebaseapp.com',
  projectId: 'tastebuds-7108b',
  storageBucket: 'tastebuds-7108b.appspot.com',
  messagingSenderId: '755567766629',
  appId: '1:755567766629:web:f3fdc2948d08d4c14cea8c',
  measurementId: 'G-W0RLQMCQC3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
