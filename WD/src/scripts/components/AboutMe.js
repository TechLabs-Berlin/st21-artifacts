import React from "react";

export default class AboutMe extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2 className="user-h2">About Me:</h2>
        <p>Next steps:</p>
        <p>Testemonials/Reviewing Users</p>
        <p>About Me</p>
        <p>Artifacts&Services</p>
        <p>Favorites</p>
      </div>
    );
  }
}
