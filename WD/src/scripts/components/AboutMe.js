import React from "react";
import userInformation from "./Datasets";

export default class AboutMe extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile-about-me">{userInformation.description}</div>
    );
  }
}
