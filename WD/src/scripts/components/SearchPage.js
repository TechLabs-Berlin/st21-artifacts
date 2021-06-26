import React, { useState } from 'react';
import ItemsContainer from './ItemsContainer';
import database from '../firebase/firebase';

const SearchPage = () => {
  const [ items, setItems ] = useState([]);
  const presentPopover = () => {
  };
  const renderCards = (
      e,
      photo,
      costumes,
      music,
      art,
      others,
      mitte,
      charlottenburg,
      friedrichshain,
      lichtenberg,
      kreuzberg,
      newCond,
      veryGood,
      good,
      satisfactory,
      star5,
      star4,
      star3,
      star2,
      star1,
      priceMin,
      priceMax,
      freeStuff,
      search,
  ) => {
    e.preventDefault();
    const checkedDataCategory = [
      (photo.checked && photo).value,
      (costumes.checked && costumes).value,
      (music.checked && music).value,
      (art.checked && art).value,
      (others.checked && others).value,
    ];

    let x1 = 0;
    let shotGunCategory = false;
    checkedDataCategory.map((n) => {
      if (n != undefined || n != null) {
        x1 = x1 + 1;
      }
    });
    if (x1 > 0) {
      x1 = 0;
    } else {
      shotGunCategory = true;
    }

    const checkedDataLocation = [
      (mitte.checked && mitte).value,
      (charlottenburg.checked && charlottenburg).value,
      (friedrichshain.checked && friedrichshain).value,
      (lichtenberg.checked && lichtenberg).value,
      (kreuzberg.checked && kreuzberg).value,
    ];

    let x2 = 0;
    let shotGunLocation = false;
    checkedDataLocation.map((n) => {
      if (n != undefined || n != null) {
        x2 = x2 + 1;
      }
    });
    if (x2 > 0) {
      x2 = 0;
    } else {
      shotGunLocation = true;
    }

    const checkedDataCondition = [
      (newCond.checked && newCond).value,
      (veryGood.checked && veryGood).value,
      (good.checked && good).value,
      (satisfactory.checked && satisfactory).value,
    ];

    let x3 = 0;
    let shotGunCondition = false;
    checkedDataCondition.map((n) => {
      if (n != undefined || n != null) {
        x3 = x3 + 1;
      }
    });
    if (x3 > 0) {
      x3 = 0;
    } else {
      shotGunCondition = true;
    }

    const checkedDataRating = [
      parseFloat((star5.checked && star5).value),
      parseFloat((star4.checked && star4).value),
      parseFloat((star3.checked && star3).value),
      parseFloat((star2.checked && star2).value),
      parseFloat((star1.checked && star1).value),
    ];

    let x4 = 0;
    let shotGunRating = false;
    checkedDataRating.map((n) => {
      if (!!n == true) {
        x4 = x4 + 1;
      }
    });

    if (x4 > 0) {
      x4 = 0;
    } else {
      shotGunRating = true;
    }

    let checkedDataPriceMin = 0;
    let checkedDataPriceMax = 500;
    let shotGunPrice = false;

    if (freeStuff.checked === true) {
      checkedDataPriceMin = 0;
      checkedDataPriceMax = 0;
    } else if (!!priceMin.value === true && !!priceMax === true) {
      checkedDataPriceMin = parseFloat(priceMin.value);
      checkedDataPriceMax = parseFloat(priceMax.value);
    } else {
      shotGunPrice = true;
    }

    const checkedDataSearch = search.value.toLowerCase().split(' ');

    // setItems([]);
    const searchItems = [];
    database
        .ref('items')
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const filterCategory = checkedDataCategory.indexOf(
                childSnapshot.val().itemCategory,
            );
            const filterLocation = checkedDataLocation.indexOf(
                childSnapshot.val().ownerLocation,
            );
            const filterCondition = checkedDataCondition.indexOf(
                childSnapshot.val().itemCondition,
            );

            let filterRating = false;

            checkedDataRating.map((star) => {
              if (parseFloat(childSnapshot.val().ownerReview) >= star) {
                filterRating = true;
              }
            });

            let filterPrice = false;

            if (
              childSnapshot.val().itemPrice >= checkedDataPriceMin &&
            childSnapshot.val().itemPrice <= checkedDataPriceMax
            ) {
              filterPrice = true;
            } else {
              filterPrice = false;
            }

            let searchTitle = false;

            checkedDataSearch.map((word) => {
              const n = childSnapshot.val().itemName.toLowerCase().indexOf(word);
              if (n >= 0) {
                searchTitle = true;
              }
            });

            if (
              (filterCategory >= 0 || shotGunCategory) &&
            (filterLocation >= 0 || shotGunLocation) &&
            (filterCondition >= 0 || shotGunCondition) &&
            (filterRating || shotGunRating) &&
            (filterPrice || shotGunPrice) &&
            searchTitle
            ) {
              const item = childSnapshot.val();
              item.key = childSnapshot.key;
              /* console.log(item); */
              searchItems.push(item);
              console.log(searchItems);
            }
          });
          setItems( searchItems );
        });
  };
  return (
    <div className="search-page">
      <div className="search-filter-bar">
        <form
          className="search-filter-form"
          onSubmit={(e) =>
            renderCards(
                e,
                document.getElementById('photography & film equipment'),
                document.getElementById('props & costumes'),
                document.getElementById('music & sound equipment'),
                document.getElementById('art supplies'),
                document.getElementById('others'),
                document.getElementById('Mitte'),
                document.getElementById('Charlottenburg'),
                document.getElementById('Friedrichshain'),
                document.getElementById('Lichtenberg'),
                document.getElementById('Kreuzberg'),
                document.getElementById('new'),
                document.getElementById('very good'),
                document.getElementById('good'),
                document.getElementById('satisfactory'),
                document.getElementById('5 stars'),
                document.getElementById('4 stars'),
                document.getElementById('3 stars'),
                document.getElementById('2 stars'),
                document.getElementById('1 star'),
                document.getElementById('itemPriceMin'),
                document.getElementById('itemPriceMax'),
                document.getElementById('freeStuffOnly'),
                document.getElementById('search'),
            )
          }
        >
          <div className="search-container">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Type your search here..."
              className="search-input"
            ></input>
          </div>
          <div className="all-filter-container">
            <div className="one-filter-container">
              <h3 className="one-filter-headline">Category</h3>
              <div className="all-filter-input">
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="photography & film equipment"
                    name="itemCategory"
                    value="photography & film equipment"
                  ></input>
                  <label htmlFor="photography & film equipment">
                    photography & film equ.
                  </label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="props & costumes"
                    name="itemCategory"
                    value="props & costumes"
                  ></input>
                  <label htmlFor="props & costumes">props & costumes</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="music & sound equipment"
                    name="itemCategory"
                    value="music & sound equipment"
                  ></input>
                  <label htmlFor="music & sound equipment">
                    music & sound equipment
                  </label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="art supplies"
                    name="itemCategory"
                    value="art supplies"
                  ></input>
                  <label htmlFor="art supplies">art supplies</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="others"
                    name="itemCategory"
                    value="others"
                  ></input>
                  <label htmlFor="others">others</label>
                </div>
              </div>
            </div>
            <div className="one-filter-container">
              <h3 className="one-filter-headline">Price</h3>
              <div className="all-price-input">
                <div className="price-bar">
                  <input
                    type="number"
                    id="itemPriceMin"
                    name="itemPrice"
                    min="0"
                    /* max="500" */
                    defaultValue="0"
                  ></input>
                  <label> € </label>
                  <p> - </p>
                  <input
                    type="number"
                    id="itemPriceMax"
                    name="itemPrice"
                    min="0"
                    /* max="500" */
                    defaultValue="2000"
                  ></input>
                  <label> € </label>
                </div>
                <div className="price-label-bar">
                  <p>min</p>
                  <p>max</p>
                </div>
                <div className="price-free-bar">
                  <label htmlFor="freeStuffOnly-label">Free stuff only </label>
                  <input
                    type="checkbox"
                    id="freeStuffOnly"
                    name="itemPrice"
                    value="0"
                  ></input>
                </div>
              </div>
            </div>
            <div className="one-filter-container">
              <h3 className="one-filter-headline">Location</h3>
              <div className="all-filter-input">
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Mitte"
                    name="ownerLocation"
                    value="Mitte"
                  ></input>
                  <label htmlFor="Mitte">Mitte</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Charlottenburg"
                    name="ownerLocation"
                    value="Charlottenburg"
                  ></input>
                  <label htmlFor="Charlottenburg">Charlottenburg</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Friedrichshain"
                    name="ownerLocation"
                    value="Friedrichshain"
                  ></input>
                  <label htmlFor="Friedrichshain">Friedrichshain</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Lichtenberg"
                    name="ownerLocation"
                    value="Lichtenberg"
                  ></input>
                  <label htmlFor="Lichtenberg">Lichtenberg</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Kreuzberg"
                    name="ownerLocation"
                    value="Kreuzberg"
                  ></input>
                  <label htmlFor="Kreuzberg">Kreuzberg</label>
                </div>
              </div>
            </div>
            <div className="one-filter-container">
              <h3 className="one-filter-headline">Condition</h3>
              <div className="all-filter-input">
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="new"
                    name="itemCondition"
                    value="new"
                  ></input>
                  <label htmlFor="new">new</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="very good"
                    name="itemCondition"
                    value="very good"
                  ></input>
                  <label htmlFor="very good">very good</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="good"
                    name="itemCondition"
                    value="good"
                  ></input>
                  <label htmlFor="good">good</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="satisfactory"
                    name="itemCondition"
                    value="satisfactory"
                  ></input>
                  <label htmlFor="satisfactory">satisfactory</label>
                </div>
              </div>
            </div>
            <div className="one-filter-container">
              <h3 className="one-filter-headline">User Rating</h3>
              <div className="all-filter-input">
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="5 stars"
                    name="ownerReview"
                    value="5"
                  ></input>
                  <label htmlFor="5 stars">5 stars</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="4 stars"
                    name="ownerReview"
                    value="4"
                  ></input>
                  <label htmlFor="4 stars">4 stars or higher</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="3 stars"
                    name="ownerReview"
                    value="3"
                  ></input>
                  <label htmlFor="3 stars">3 stars or higher</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="2 stars"
                    name="ownerReview"
                    value="2"
                  ></input>
                  <label htmlFor="2 stars">2 stars or higher</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="1 star"
                    name="ownerReview"
                    value="1"
                  ></input>
                  <label htmlFor="1 star">1 star or higher</label>
                </div>
              </div>
            </div>
          </div>
          <div className="search-button-container">
            <button className="search-button">Find</button>
            <input className="clear-button" type="reset" value="Clear"></input>
          </div>
        </form>
      </div>
      <div className="search-results-scroll">
        <div className="search-page-results">
          <ItemsContainer customItems={items} onClickItem={presentPopover} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
