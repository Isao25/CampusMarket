import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK4a0D_Ss1rLgGWSJsWDEm5Zo2oWZqaHM",
  authDomain: "ezcommerce-6d38b.firebaseapp.com",
  projectId: "ezcommerce-6d38b",
  storageBucket: "ezcommerce-6d38b.appspot.com",
  messagingSenderId: "604936490588",
  appId: "1:604936490588:web:c764fb1520ee20047ba099",
  measurementId: "G-3QGM5JS9BJ"
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);