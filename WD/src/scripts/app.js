import React from "react";
import ReactDOM from "react-dom";
import AppRouter, { history } from "./routers/AppRouter";
import { firebase } from "./firebase/firebase";
import "normalize.css/normalize.css";
import "../styles/styles.scss";

ReactDOM.render(<AppRouter />, document.getElementById("app"));

let user = undefined;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Login");
  } else {
    history.push("/");
    console.log("Logout");
  }
});
