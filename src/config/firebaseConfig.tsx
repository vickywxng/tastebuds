// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Import other Firebase products that you want to use
// For example, if you want to use Firestore, Auth, etc.

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyBrz5pFsBPKitA8q_2mVhmVH9Ign_2d57w',
  authDomain: 'tastebuds-7108b.firebaseapp.com',
  projectId: 'tastebuds-7108b',
  storageBucket: 'tastebuds-7108b.appspot.com',
  messagingSenderId: '755567766629',
  appId: '1:755567766629:web:f3fdc2948d08d4c14cea8c',
  measurementId: 'G-W0RLQMCQC3', // This can be left here even if you don't use analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize other Firebase services you want to use
const db = getFirestore(app);
