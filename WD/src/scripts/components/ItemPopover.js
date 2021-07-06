import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContactForm from './ContactForm';
import database from '../firebase/firebase';


const ItemPopover = (props) => {
  const [ otherUserInformation, setOtherUserInformation ] = useState({});
  const handleOtherUserInformation = (id) => {
    database.ref(`${id}`).once('value').then((snapshot) => {
      const userInformation = snapshot.val();
      userInformation.UID = id;
      setOtherUserInformation(userInformation);
    });
  };
  handleOtherUserInformation(props.ownerKey);

  return (
  <div className="item-popover-background" onClick={props.clearPopover}>
    <div className="item-popover" onClick={(event) => { event.stopPropagation()}}>
      <div className="item-popover-left-side">
        <div className="item-popover-offerer">
          <div className="item-popover-offerer-pic-container" style={{backgroundImage: 'url(' +otherUserInformation.profilePicture + ')', }} />
          <p className="item-popover-offerer-name">{otherUserInformation.name}</p>
        </div>
        <h1>{props.itemName}</h1>
        <div className="item-popover-image-container" style={{
          backgroundImage: 'url(' + props.itemPicture + ')',
        }} />
      </div>
      <div className="item-popover-right-side">
        <h2>About this item</h2>
        <p>Price: {props.itemPrice}</p>
        <p>{'★'.repeat(Math.round(parseFloat(props.ownerReview))) +
                  '☆'.repeat(5 - Math.round(parseFloat(props.ownerReview)))}</p>
        <h3>Description</h3>
        <p>{props.itemDescription}</p>
        {(props.itemAvailability == 'true') ?
                  <p className="green">Available</p> :
                  <p className="red">Not available</p>}
        <p>📍 {props.ownerLocation}</p>
        <p> Condition: {props.itemCondition}</p>
        <ContactForm ownerInformation={otherUserInformation}/>   
        <div>  
          <NavLink to="/contactOwner" className="contact-owner">Request to buy</NavLink>

        </div>
      </div>
    </div>
  </div>
)
}
export default ItemPopover;
