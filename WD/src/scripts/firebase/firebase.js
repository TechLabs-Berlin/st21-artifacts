import * as firebase from "firebase";
import "firebase/auth";
import key from "../../../key.js";

// access to our Firebase: authentiction & real time database
const firebaseConfig = {
  apiKey: key.FIREBASE_API_KEY,
  authDomain: key.FIREBASE_AUTH_DOMAIN,
  databaseURL: key.FIREBASE_DATABASE_URL,
  projectId: key.FIREBASE_PROJECT_ID,
  storageBucket: key.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: key.FIREBASE_MESSAGING_SENDER_ID,
  appId: key.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
