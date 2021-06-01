import React from "react";

let userBackground =
  "https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
let userPicture =
  "https://images.pexels.com/photos/1116989/pexels-photo-1116989.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
let userName = "Steffi Superuser";
let userJob = "Web Developer";
let userText =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

const Profile = () => (
  <div className="page-profile">
    <div className="container-profile">
      <img
        src={userBackground}
        className="user-background"
        alt="Background picture"
      />
      <img src={userPicture} className="user-picture" alt="Profile picture" />
    </div>
    <div className="user-details">
      <h2>{userName}</h2>
      <h3>{userJob}</h3>
      <p>{userText}</p>
    </div>
  </div>
);

export default Profile;
