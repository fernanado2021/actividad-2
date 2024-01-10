import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsKxUSvTFD-AWMLl4yD9Bh3ZnBVhfujdU",
  authDomain: "prueba-83fa2.firebaseapp.com",
  databaseURL: "https://prueba-83fa2-default-rtdb.firebaseio.com",
  projectId: "prueba-83fa2",
  storageBucket: "prueba-83fa2.appspot.com",
  messagingSenderId: "290564565563",
  appId: "1:290564565563:web:959bca3305b4f4f9940a1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db= getDatabase(app)
export const storage=getStorage(app)

