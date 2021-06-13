import React from "react";
import { currentItem } from "./Datasets";

const ItemCard = () => (
  <div className="item-card">
    <div className="card-header">
      <div>
        <img src={currentItem.itemOwnerPicture} />
        <h5>{currentItem.itemOwnerName}</h5>
      </div>
      <p>{currentItem.itemOwnerReview}</p>
    </div>
    <div className="card-body">
      <img src={currentItem.itemPicture} />
      <i className="icofont-heart"></i>
    </div>
    <div className="card-bottom">
      <h5>{currentItem.itemName}</h5>
      <div>
        <p>{currentItem.itemPrice}€</p>
        <div>
          <i className="icofont-heart"></i>
          <p>{currentItem.itemFans}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ItemCard;
