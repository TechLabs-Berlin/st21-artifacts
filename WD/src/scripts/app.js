import React from "react";
import ReactDOM from "react-dom";
import AppRouter, { history } from "./routers/AppRouter";
import database, { firebase } from "./firebase/firebase";
import "normalize.css/normalize.css";
import "../styles/styles.scss";
import userInformation from "./components/Datasets";

ReactDOM.render(<AppRouter />, document.getElementById("app"));

// initial LogIn: initializes dataset in database ... regular LogIn: loads information from database ... LogOut

let getInfo = (UID, info) => {
  database
    .ref(`${UID}/${info}`)
    .once("value")
    .then((snapshot) => {
      userInformation[`${info}`] = snapshot.val();
      //console.log(userInformation[`${info}`]);
    })
    .catch((e) => {
      "Error fetching data", e;
    });
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Logged in.");
    database
      .ref(`${user.uid}/name`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          userInformation.UID = user.uid;
          //console.log(userInformation.UID);
          getInfo(userInformation.UID, "banner");
          getInfo(userInformation.UID, "headline");
          getInfo(userInformation.UID, "link");
          getInfo(userInformation.UID, "mail");
          getInfo(userInformation.UID, "name");
          getInfo(userInformation.UID, "profilePicture");
        } else {
          database
            .ref(`${user.uid}`)
            .set({
              banner:
                "https://images.pexels.com/photos/3953119/pexels-photo-3953119.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              headline: "default",
              link: "https://www.google.de",
              mail: `mailto:${user.email}`,
              name: "default",
              profilePicture:
                "https://images.pexels.com/photos/5326900/pexels-photo-5326900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            })
            .then(() => {
              userInformation.UID = user.uid;
              getInfo(userInformation.UID, "banner");
              getInfo(userInformation.UID, "headline");
              getInfo(userInformation.UID, "link");
              getInfo(userInformation.UID, "mail");
              getInfo(userInformation.UID, "name");
              getInfo(userInformation.UID, "profilePicture");
              console.log("Data initialized.");
            })
            .catch((e) => {
              console.log("This failed.", e);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    //set userInformation back to "default"
    history.push("/");
    console.log("Logged out.");
    userInformation.banner = "default";
    userInformation.headline = "default";
    userInformation.link = "default";
    userInformation.mail = "default";
    userInformation.name = "default";
    userInformation.profilePicture = "default";
    userInformation.UID = "default";
  }
});
