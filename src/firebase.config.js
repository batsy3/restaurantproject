import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
import { initializeApp, getApp, getApps } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyD-NRxlIQlRkPggyXDfBIkx0zkVfyu2fI0",
  authDomain: "restaurantapp-edf26.firebaseapp.com",
  databaseURL: "https://restaurantapp-edf26-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-edf26",
  storageBucket: "restaurantapp-edf26.appspot.com",
  messagingSenderId: "373919822633",
  appId: "1:373919822633:web:dddddc52a3562cf1eafd38",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };