import React from "react";

function Hallo() {
  console.log("Hallo");
}

const ItemCard = (props) => (
  <div onClick={Hallo} className="item-card">
    <div className="card-header">
      <div>
        <img src={props.ownerPicture} />
        <h5>{props.ownerName}</h5>
      </div>
      <p>{props.ownerReview}</p>
    </div>
    <div className="card-body">
      <img src={props.itemPicture} />
      <i className="icofont-heart"></i>
    </div>
    <div className="card-bottom">
      <h5>{props.itemName}</h5>
      <div>
        <p>{props.itemPrice}€</p>
        <div>
          <i className="icofont-heart"></i>
          <p>{props.itemFans}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ItemCard;
