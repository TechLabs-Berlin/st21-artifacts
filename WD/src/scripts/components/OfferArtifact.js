import React from "react";
import userInformation from "./Datasets";
import database from "../firebase/firebase";

export default class OfferArtifact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.offerArtifact = this.offerArtifact.bind(this);
  }
  offerArtifact(
    e,
    itemCategory,
    itemCondition,
    itemDescription,
    itemName,
    itemPicture,
    itemPrice,
    ownerLocation
  ) {
    e.preventDefault();
    database
      .ref()
      .child("items")
      .push({
        itemCategory: itemCategory,
        itemCondition: itemCondition,
        itemDescription: itemDescription,
        itemFans: "0",
        itemName: itemName,
        itemPicture: itemPicture,
        itemPrice: itemPrice,
        ownerKey: userInformation.UID,
        ownerLocation: ownerLocation,
        ownerName: userInformation.name,
        ownerPicture: userInformation.profilePicture,
        ownerReview: "4.5",
      })
      .then(() => {
        console.log("Item is saved");
      })
      .catch((e) => {
        console.log("This failed", e);
      });
    location.reload();
  }
  render() {
    return (
      <div className="item-offer-container">
        <div className="item-offer-header">
          <img
            src="https://images.pexels.com/photos/5622421/pexels-photo-5622421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="item-offer-banner"
            alt="Background picture"
          />
          <img
            src="https://images.pexels.com/photos/2824173/pexels-photo-2824173.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            className="item-offer-picture"
            alt="Artifact picture"
          />
          <div className="item-offer-headline">
            <p>Offer an</p>
            <h3>Artifact</h3>
          </div>
        </div>
        <div className="item-offer-sidebar">
          <h2 className="user-h2">{userInformation.name}</h2>
          <div className="user-sidebar-contact">
            <a href={userInformation.mail}>
              <i className="icofont-mail"></i>
            </a>
            <p>Contact me</p>
          </div>
          <div className="user-sidebar-review">
            <h3 className="user-h3">Testemonials</h3>
            <p>Review me</p>
          </div>
        </div>
        <div className="item-offer-main">
          <form
            onSubmit={(e) =>
              this.offerArtifact(
                e,
                document.getElementById("itemCategory").value,
                document.getElementById("itemCondition").value,
                document.getElementById("itemDescription").value,
                document.getElementById("itemName").value,
                document.getElementById("itemPicture").value,
                document.getElementById("itemPrice").value,
                document.getElementById("ownerLocation").value
              )
            }
          >
            <div className="item-offer-main-headline">
              <button className="item-offer-main-headline-button">
                Please fill in:
              </button>
            </div>
            <div className="item-offer-context">
              <div className="item-edit-flex">
                <label className="item-edit-label">Category: </label>
                <select className="item-edit-input" id="itemCategory">
                  <option value="photography & film equipment">
                    photography & film equipment
                  </option>
                  <option value="props & costumes">props & costumes</option>
                  <option value="music & sound equipment">
                    music & sound equipment
                  </option>
                  <option value="art supplies">art supplies</option>
                  <option value="others">others</option>
                </select>
              </div>
              <div className="item-edit-flex">
                <label className="item-edit-label">Artifact name: </label>
                <input
                  className="item-edit-input"
                  type="text"
                  id="itemName"
                  placeholder="please insert the items name"
                ></input>
              </div>
              <div className="item-edit-flex">
                <label className="item-edit-label">Picture: </label>
                <input
                  className="item-edit-input"
                  type="url"
                  id="itemPicture"
                  placeholder="please insert a URL for items picture"
                ></input>
              </div>
              <div className="item-edit-flex">
                <label className="item-edit-label">Description: </label>
                <input
                  className="item-edit-input"
                  type="text"
                  id="itemDescription"
                  placeholder="please insert a description here"
                ></input>
              </div>
              <div className="item-edit-container">
                <div className="item-edit-flex">
                  <label className="item-edit-label2">Price: </label>
                  <input
                    className="item-edit-input2"
                    type="number"
                    step="any"
                    min="0"
                    defaultValue="0"
                    placeholder="€"
                    id="itemPrice"
                  ></input>
                </div>
                <div className="item-edit-flex">
                  <label className="item-edit-label2">Location: </label>
                  <select className="item-edit-input2" id="ownerLocation">
                    <option value="Mitte">Berlin Mitte</option>
                    <option value="Charlottenburg">
                      Berlin Charlottenburg
                    </option>
                    <option value="Friedrichshain">
                      Berlin Friedrichshain
                    </option>
                    <option value="Lichtenberg">Berlin Lichtenberg</option>
                    <option value="Kreuzberg">Berlin Kreuzberg</option>
                    <option value="Hellersdorf">Berlin Hellersdorf</option>
                    <option value="Hohenschönhausen">
                      Berlin Hohenschönhausen
                    </option>
                    <option value="Köpenick">Berlin Köpenick</option>
                    <option value="Marzahn">Berlin Marzahn</option>
                    <option value="Neuköln">Berlin Neuköln</option>
                    <option value="Pankow">Berlin Pankow</option>
                    <option value="Prenzlauer Berg">
                      Berlin Prenzlauer Berg
                    </option>
                    <option value="Reinickendorf">Berlin Reinickendorf</option>
                    <option value="Schöneberg">Berlin Schöneberg</option>
                    <option value="Spandau">Berlin Spandau</option>
                    <option value="Steglitz">Berlin Steglitz</option>
                    <option value="Tempelhof">Berlin Tempelhof</option>
                    <option value="Tiergarten">Berlin Tiergarten</option>
                    <option value="Treptow">Berlin Treptow</option>
                    <option value="Wedding">Berlin Wedding</option>
                    <option value="Weißensee">Berlin Weißensee</option>
                    <option value="Wilmersdorf">Berlin Wilmersdorf</option>
                    <option value="Zehlendorf">Berlin Zehlendorf</option>
                  </select>
                </div>
                <div className="item-edit-flex">
                  <label className="item-edit-label2">Condition: </label>
                  <select className="item-edit-input2" id="itemCondition">
                    <option value="new">new</option>
                    <option value="very good">very good</option>
                    <option value="good">good</option>
                    <option value="satisfactory">satisfactory</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="item-offer-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
