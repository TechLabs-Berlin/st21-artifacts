import React from "react";
import { useUserInformation } from "../context/user-context/UserContext";

const AboutMe = () => {
  const { userInformation } = useUserInformation()
  return (
    <div className="profile-about-me">{userInformation.description}</div>
  );
}

export default AboutMe