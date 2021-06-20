import React from "react";
import ItemCard from "./ItemCard";
import database from "../firebase/firebase";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.renderCards = this.renderCards.bind(this);
  }
  renderCards = () => {
    this.setState(() => ({
      items: [],
    }));
    database
      .ref("items")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          //key erfassen
          const item = childSnapshot.val();
          item.itemKey = childSnapshot.key;
          console.log(item);
          this.setState((prevState) => ({
            items: [...prevState.items, item],
          }));
          console.log(this.state.items);
        });
      });
  };
  presentPopover = (item) => {

  };
  render() {
    return (
      <div className="search-page">
        <div>
          <p>Search page follows here.</p>
        </div>
        <div>
          <button onClick={this.renderCards} className="search-button">
            Artifacts
          </button>
        </div>
        <div className="search-page-results">
            {this.state.items.map((item) => (
            <button onClick={this.presentPopover(item)}><ItemCard
              itemFans={item.itemFans}
              itemName={item.itemName}
              itemPicture={item.itemPicture}
              itemPrice={item.itemPrice}
              ownerName={item.ownerName}
              ownerPicture={item.ownerPicture}
              ownerReview={item.ownerReview}
            /></button>
          ))}
        </div>
      </div>
    );
  }
}
