import React, { useState } from 'react';
import database from '../firebase/firebase';
import { useUserInformation } from '../context/user-context/UserContext';

const OfferArtifact = () => {
  const { userInformation } = useUserInformation();
  const [ itemCategory, setItemCategory ] = useState('photography & film equipment');
  const [ itemDescription, setItemDescription ] = useState('');
  const [ itemPicture, setItemPicture ] = useState('');
  const [ itemName, setItemName ] = useState('');
  const [ itemPrice, setItemPrice ] = useState('0');
  const [ itemCondition, setItemCondition ] = useState('new');
  const [ ownerLocation, setOwnerLocation ] = useState('Mitte');
  const offerArtifact = (e) => {
    e.preventDefault();
    database
        .ref()
        .child('items')
        .push({
          itemCategory,
          itemCondition,
          itemDescription,
          itemFans: '0',
          itemName,
          itemPicture,
          itemPrice,
          ownerKey: userInformation.UID,
          ownerLocation,
          ownerName: userInformation.name,
          ownerPicture: userInformation.profilePicture,
          ownerReview: '4.5',
        })
        .then(() => {
          console.log('Item is saved');
        })
        .catch((e) => {
          console.log('This failed', e);
        });
    location.reload();
  };

  return (
    <div className="item-offer-container">
      <div className="item-offer-header">
        <img
          src="https://wallpapercave.com/wp/wp6168519.jpg"
          className="item-offer-banner"
          alt="Background picture"
        />
        <div className="item-offer-headline">
          <p>Offer an</p>
          <h3>Artifact</h3>
        </div>
      </div>
      <div className="item-offer-main">
        <form onSubmit={offerArtifact}>
          <div className="item-offer-context">
            <div className="item-edit-flex">
              <label className="item-edit-label">Category: </label>
              <select
                className="item-edit-input"
                id="itemCategory"
                onChange={(e) => setItemCategory(e.target.value)}
                value={itemCategory}
              >
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
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className="item-edit-flex">
              <label className="item-edit-label">Picture: </label>
              <input
                className="item-edit-input"
                type="url"
                id="itemPicture"
                placeholder="please insert a URL for items picture"
                value={itemPicture}
                onChange={(e) => setItemPicture(e.target.value)}
              />
            </div>
            <div className="item-edit-flex">
              <label className="item-edit-label">Description: </label>
              <textarea
                className="item-edit-input"
                type="text"
                id="itemDescription"
                placeholder="please insert a description here"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </div>
            <div className="item-edit-container">
              <div className="item-edit-flex">
                <label className="item-edit-label2">Price: </label>
                <input
                  className="item-edit-input2"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="€"
                  id="itemPrice"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
              </div>
              <div className="item-edit-flex">
                <label className="item-edit-label2">Location: </label>
                <select
                  className="item-edit-input2"
                  id="ownerLocation"
                  onChange={(e) => setOwnerLocation(e.target.value)}
                  value={ownerLocation}
                >
                  <option value="Mitte">Mitte</option>
                  <option value="Charlottenburg">Charlottenburg</option>
                  <option value="Friedrichshain">Friedrichshain</option>
                  <option value="Lichtenberg">Lichtenberg</option>
                  <option value="Kreuzberg">Kreuzberg</option>
                </select>
              </div>
              <div className="item-edit-flex">
                <label className="item-edit-label2">Condition: </label>
                <select
                  className="item-edit-input2"
                  id="itemCondition"
                  onChange={(e) => setItemCondition(e.target.value)}
                  value={itemCondition}
                >
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
};

export default OfferArtifact;


/*   <option value="Hellersdorf">Berlin Hellersdorf</option>
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
 */
