import React from "react";
import userInformation from "./Datasets";
import database from "../firebase/firebase";
export default class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: userInformation.favorites.indexOf(this.props.itemKey) >= 0,
    };
    this.handleFavorites = this.handleFavorites.bind(this);
  }
  handleFavorites = () => {
    if (this.state.isFavorite) {
      const index = userInformation.favorites.indexOf(this.props.itemKey);
      userInformation.favorites.splice(index, 1);
      this.setState({
        isFavorite: false,
      });
      database
        .ref(`${userInformation.UID}/favorites`)
        .once("value")
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val() === this.props.itemKey) {
              database
                .ref(`${userInformation.UID}/favorites/${childSnapshot.key}`)
                .set(null);
            }
          });
        });
    } else {
      this.setState({
        isFavorite: true,
      });
      database
        .ref(`${userInformation.UID}/favorites`)
        .push(this.props.itemKey)
        .then(userInformation.favorites.push(this.props.itemKey));
    }
  };
  render() {
    return (
      <div className="item-card">
        <div className="card-header">
          <div>
            <img src={this.props.ownerPicture} />
            <h5>{this.props.ownerName}</h5>
          </div>
          <p>{this.props.ownerReview}</p>
        </div>
        <div className="card-body">
          <img src={this.props.itemPicture} />
          {!this.state.isFavorite && (
            <button
              onClick={this.handleFavorites}
              className="item-heart-button"
            >
              <i className="icofont-heart"></i>
            </button>
          )}
          {this.state.isFavorite && (
            <button
              onClick={this.handleFavorites}
              className="item-heart-button-active"
            >
              <i className="icofont-heart"></i>
            </button>
          )}
        </div>
        <div className="card-bottom">
          <h5>{this.props.itemName}</h5>
          <div>
            <p>{this.props.itemPrice}€</p>
            <div>
              <i className="icofont-heart"></i>
              <p>{this.props.itemFans}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// old React component:

/* const ItemCard = (props) => (
  <div /*onClick={Hallo}
    <div className="card-header">
      <div>
        <img src={props.ownerPicture} />
        <h5>{props.ownerName}</h5>
      </div>
      <p>{props.ownerReview}</p>
    </div>
    <div className="card-body">
      <img src={props.itemPicture} />
      <button onClick={handleFavorites} className="item-heart-button">
      <i className="icofont-heart"></i>
      </button>
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

export default ItemCard; */
