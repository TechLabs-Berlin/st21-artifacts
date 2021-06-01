import React from "react";
export default class SearchBar extends React.Component {
  handleFindArtifact = () => {
    alert("Functionality not available.");
  };
  handleOfferArtifact = () => {
    alert("Functionality not available.");
  };
  handleFindService = () => {
    alert("Functionality not available.");
  };
  handleOfferService = () => {
    alert("Functionality not available.");
  };
  render() {
    return (
      <div className="search-bar">
        <button
          onClick={this.handleFindArtifact}
          className="find-artifact-search-bar"
        >
          find an Artifact
        </button>
        <button
          onClick={this.handleOfferArtifact}
          className="offer-artifact-search-bar"
        >
          offer an Artifact
        </button>
        <button
          onClick={this.handleFindService}
          className="find-service-search-bar"
        >
          offer a service/collaboration
        </button>
        <button
          onClick={this.handleOfferService}
          className="offer-service-search-bar"
        >
          find a service/collaboration
        </button>
      </div>
    );
  }
}
