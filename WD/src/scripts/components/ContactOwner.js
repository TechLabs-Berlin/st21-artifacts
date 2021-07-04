import React, {useState} from 'react';
import ContactForm from './ContactForm';
import database from '../firebase/firebase';




/*const ContactOwner = (props) => (
    <div>
      <div className="item-contact">

        <div className="item-contact-left-side">
          <div className="item-contact-offerer">
            <div className="item-contact-offerer-pic-container" style={{backgroundImage: 'url(' +props.itemPicture + ')', }} />
            <p className="item-contact-offerer-name">{props.ownerName} Steffi</p>
          </div>
          <h1>{props.itemName}</h1>
          
          <div className="item-contact-image-container" style={{
            backgroundImage: 'url(' + props.itemPicture + ')',
          }} />
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
        </div>
        
        <div className="item-contact-right-side">  
          <div></div>
            <NavLink to="/contactOwner" className="contact-owner">Contact owner</NavLink>
          </div>
        </div>
      </div>
    </div>
  );*/

const ContactOwner = (props) => (
    <ContactForm ownerInformation={otherUserInformation}/>
);
export default ContactOwner;
