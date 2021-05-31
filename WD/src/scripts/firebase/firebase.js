import * as firebase from "firebase";
import key from "../../../key";

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

// https://firebase.google.com/docs/reference/js/firebase.database

// ----------------CREATE: write into the database
/* database
  .ref("100001")
  .set({
    userId: 100001,
    name: {
      firstName: "Terence",
      lastName: "Anonymous",
    },
  })
  .then(() => {
    console.log("Data is saved");
  })
  .catch((e) => {
    console.log("This failed", e);
  }); */

// ----------------CREATE: push list based data
/* database.ref().push({
  userID: "test",
  name: "test",
}); */

// ----------------READ: fetch data once
/* database
  .ref()
  .once("value")
  .then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch((e) => {
    "Error fetching data", e;
  }); */
//forEach available for snapshot -> documentation

// ----------------READ: fetch data ongoing
/* database.ref().on("value", (snapshot) => {
  console.log(snapshot.val());
}, (e) => {
  console.log("Error with fetching", e);
}); */
//to stop with off()

//----------------UPDATE data
/* database.ref("100001").update({
  "name/firstName": "Steffi",
  userId: "100002",
  category: "music",
}); */

// ----------------DELETE: remove from database with remove()
/* database
  .ref("100001/name")
  .remove()
  .then(() => {
    console.log("Data was removed");
  })
  .catch((e) => {
    console.log("Did not remove data", e);
  }); */

// ---------------- DELETE: remove from database with set()
//database.ref().set(null);
