import React from 'react';
import { NavLink } from 'react-router-dom';
// import ItemCard from './ItemCard';
// import database from '../firebase/firebase';

const ItemPopover = (props) => (
  <div className="item-popover-background" onClick={props.clearPopover}>
    <div className="item-popover">
      <div className="item-popover-left-side">
        <header className="item-offerer">
          <img className="profile-pic" src={props.ownerPicture}>{props.ownerName}</img>
          <h1>{props.itemName}</h1>
        </header>

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
        <p>📍 {props.itemLocation}</p>
        <div>
          <NavLink to="/ContactOwner" className="contact-owner">Contact owner</NavLink>
        </div>
      </div>
    </div>
  </div>
);

export default ItemPopover;
