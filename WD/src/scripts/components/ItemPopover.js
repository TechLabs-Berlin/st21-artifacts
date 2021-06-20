import React from "react";
import ItemCard from "./ItemCard";
import database from "../firebase/firebase";

const ItemPopover = (props) => (
    <div className="item-popover">
        <div className="item-popover-left-side">
            <h1>{props.itemName}</h1>
        <div className="item-popover-image-container" style={{
            backgroundImage: 'url(' + props.itemPicture + ')'
        }} />
        </div>
        <div className="item-popover-right-side">
            <h2>About this item</h2>
            <p>Price: {props.itemPrice}</p>
            <p>{"★".repeat(Math.round(parseFloat(props.ownerReview))) +
                "☆".repeat(5 - Math.round(parseFloat(props.ownerReview)))}</p>
            <h3>Description</h3>
            <p>{props.itemDescription}</p>
            {(props.itemAvailability == "true") 
                ? <p className="green">Available</p> 
                : <p className="red">Not available</p>}
            <p>📍 {props.itemLocation}</p>
            <button>Contact owner</button>
        </div>
    </div>
);

export default ItemPopover;
