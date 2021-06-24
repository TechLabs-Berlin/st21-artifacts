import React, { useCallback, useState } from "react";
import database from "../firebase/firebase";
import { useUserInformation } from "../context/user-context/UserContext";

const ItemCard = ({ item, onClick }) => {
  const { userInformation, setUserInformation } = useUserInformation();
  const [isFavorite, setIsFavorite] = useState(
    userInformation.favorites.some((favItem) => item.key === favItem.key)
  );
  const handleFavorites = () => {
    if (isFavorite) {
      database
        .ref(`${userInformation.UID}/favorites`)
        .once("value")
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().key === item.key) {
              setIsFavorite(false);
              const newUserInformation = Object.assign({}, userInformation);
              newUserInformation.favorites =
                newUserInformation.favorites.filter(
                  (favItem) => favItem.key !== item.key
                );
              setUserInformation(newUserInformation);
              database
                .ref(`${userInformation.UID}/favorites/${childSnapshot.key}`)
                .remove();
            }
          });
        })
        .catch(console.error);
    } else {
      database
        .ref(`${userInformation.UID}/favorites`)
        .push(item)
        .then(() => {
          const newUserInformation = Object.assign({}, userInformation);
          newUserInformation.favorites.push(item);
          setUserInformation(newUserInformation);
          setIsFavorite(true);
        });
    }
  };

  const onClickItem = useCallback(() => {
    if (onClick) {
      onClick(item);
    }
  }, [item, onClick]);

  return (
    <div className={`item-card ${onClick ? "link" : ""}`} onClick={onClickItem}>
      <div className="card-header">
        <div>
          <img src={item.ownerPicture} />
          <h5>{item.ownerName}</h5>
        </div>
        <p>{item.ownerReview}</p>
      </div>
      <div className="card-body">
        <img src={item.itemPicture} />
        <button
          onClick={handleFavorites}
          className={
            isFavorite ? "item-heart-button-active" : "item-heart-button"
          }
        >
          <i className="icofont-heart"></i>
        </button>
      </div>
      <div className="card-bottom">
        <h5>{item.itemName}</h5>
        <div>
          <p>{item.itemPrice}€</p>
          <div>
            <i className="icofont-heart"></i>
            <p>{item.itemFans}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
