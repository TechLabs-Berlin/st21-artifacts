import React, { useState } from 'react';
import ItemsContainer from './ItemsContainer';
import database from '../firebase/firebase';

const SearchPage = () => {
  const [ searchItems, setSearchItems ] = useState([]);
  const [ photo, setPhoto ] = useState({ checked: false, id: 'photography & film equipment' });
  const [ costumes, setCostumes ] = useState({ checked: false, id: 'props & costumes' });
  const [ music, setMusic ] = useState({ checked: false, id: 'music & sound equipment' });
  const [ art, setArt ] = useState({ checked: false, id: 'art supplies' });
  const [ others, setOthers ] = useState({ checked: false, id: 'others' });
  const [ mitte, setMitte ] = useState({ checked: false, id: 'Mitte' });
  const [ charlottenburg, setCharlottenburg ] = useState({ checked: false, id: 'Charlottenburg' });
  const [ friedrichshain, setFriedrichshain ] = useState({ checked: false, id: 'Friedrichshain' });
  const [ lichtenberg, setLichtenberg ] = useState({ checked: false, id: 'Lichtenberg' });
  const [ kreuzberg, setKreuzberg ] = useState({ checked: false, id: 'Kreuzberg' });
  const [ newCond, setNewCond ] = useState({ checked: false, id: 'new' });
  const [ veryGood, setVeryGood ] = useState({ checked: false, id: 'very good' });
  const [ good, setGood ] = useState({ checked: false, id: 'good' });
  const [ satisfactory, setSatisfactory ] = useState({ checked: false, id: 'satisfactory' });
  const [ star5, setStar5 ] = useState({ checked: false, id: '5' });
  const [ star4, setStar4 ] = useState({ checked: false, id: '4' });
  const [ star3, setStar3 ] = useState({ checked: false, id: '3' });
  const [ star2, setStar2 ] = useState({ checked: false, id: '2' });
  const [ star1, setStar1 ] = useState({ checked: false, id: '1' }); ;
  const [ priceMin, setPriceMin ] = useState('0');
  const [ priceMax, setPriceMax ] = useState('2000');
  const [ freeStuff, setFreeStuff ] = useState({ checked: false, id: 'freeStuffOnly' });
  const [ search, setSearch ] = useState('');
  const presentPopover = () => {
  };
  const renderCards = (e) => {
    e.preventDefault();
    const checkedDataCategory = [
      photo.checked && photo.id,
      costumes.checked && costumes.id,
      music.checked && music.id,
      art.checked && art.id,
      others.checked && others.id,
    ];

    console.log(checkedDataCategory);

    let x1 = 0;
    let shotGunCategory = false;
    checkedDataCategory.map((n) => {
      if (!!n == true) {
        x1 = x1 + 1;
      }
    });
    if (x1 > 0) {
      x1 = 0;
    } else {
      shotGunCategory = true;
    }

    console.log(shotGunCategory);

    const checkedDataLocation = [
      mitte.checked && mitte.id,
      charlottenburg.checked && charlottenburg.id,
      friedrichshain.checked && friedrichshain.id,
      lichtenberg.checked && lichtenberg.id,
      kreuzberg.checked && kreuzberg.id,
    ];

    console.log(checkedDataLocation);

    let x2 = 0;
    let shotGunLocation = false;
    checkedDataLocation.map((n) => {
      if (!!n == true) {
        x2 = x2 + 1;
      }
    });
    if (x2 > 0) {
      x2 = 0;
    } else {
      shotGunLocation = true;
    }

    console.log(shotGunLocation);

    const checkedDataCondition = [
      newCond.checked && newCond.id,
      veryGood.checked && veryGood.id,
      good.checked && good.id,
      satisfactory.checked && satisfactory.id,
    ];

    console.log(checkedDataCondition);

    let x3 = 0;
    let shotGunCondition = false;
    checkedDataCondition.map((n) => {
      if (!!n == true) {
        x3 = x3 + 1;
      }
    });
    if (x3 > 0) {
      x3 = 0;
    } else {
      shotGunCondition = true;
    }

    console.log(shotGunCondition);

    const checkedDataRating = [
      parseFloat(star5.checked && star5.id),
      parseFloat(star4.checked && star4.id),
      parseFloat(star3.checked && star3.id),
      parseFloat(star2.checked && star2.id),
      parseFloat(star1.checked && star1.id),
    ];

    console.log(checkedDataRating);

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

    console.log(shotGunRating);

    let checkedDataPriceMin = 0;
    let checkedDataPriceMax = 2000;
    let shotGunPrice = false;

    console.log(!!(freeStuff.id && freeStuff.checked));
    console.log(!!priceMin);
    console.log(!!priceMax);

    if (!!(freeStuff.checked && freeStuff.id) === true) {
      checkedDataPriceMin = 0;
      checkedDataPriceMax = 0;
    } else if (!!priceMin === true && !!priceMax === true) {
      checkedDataPriceMin = parseFloat(priceMin);
      checkedDataPriceMax = parseFloat(priceMax);
    } else {
      shotGunPrice = true;
    }

    const checkedDataSearch = search.toLowerCase().split(' ');
    console.log(checkedDataSearch);

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
          setSearchItems(searchItems);
          console.log(searchItems);
        });
  };
  return (
    <div className="search-page">
      <div className="search-filter-bar">
        <form
          className="search-filter-form"
          onSubmit={renderCards}
        >
          <div className="search-container">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Type your search here..."
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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
                    value={photo}
                    onChange={(event) => setPhoto(event.target)}
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
                    value={costumes}
                    onChange={(event) => setCostumes(event.target)}
                  ></input>
                  <label htmlFor="props & costumes">props & costumes</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="music & sound equipment"
                    name="itemCategory"
                    value={music}
                    onChange={(event) => setMusic(event.target)}
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
                    value={art}
                    onChange={(event) => setArt(event.target)}
                  ></input>
                  <label htmlFor="art supplies">art supplies</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="others"
                    name="itemCategory"
                    value={others}
                    onChange={(event) => setOthers(event.target)}
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
                    /* defaultValue="0" */
                    value={priceMin}
                    onChange={(event) => setPriceMin(event.target.value)}
                  ></input>
                  <label> € </label>
                  <p> - </p>
                  <input
                    type="number"
                    id="itemPriceMax"
                    name="itemPrice"
                    min="0"
                    /* max="500" */
                    /* defaultValue="2000" */
                    value={priceMax}
                    onChange={(event) => setPriceMax(event.target.value)}
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
                    value={freeStuff}
                    onChange={(event) => setFreeStuff(event.target)}
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
                    value={mitte}
                    onChange={(event) => setMitte(event.target)}
                  ></input>
                  <label htmlFor="Mitte">Mitte</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Charlottenburg"
                    name="ownerLocation"
                    value={charlottenburg}
                    onChange={(event) => setCharlottenburg(event.target)}
                  ></input>
                  <label htmlFor="Charlottenburg">Charlottenburg</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Friedrichshain"
                    name="ownerLocation"
                    value={friedrichshain}
                    onChange={(event) => setFriedrichshain(event.target)}
                  ></input>
                  <label htmlFor="Friedrichshain">Friedrichshain</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Lichtenberg"
                    name="ownerLocation"
                    value={lichtenberg}
                    onChange={(event) => setLichtenberg(event.target)}
                  ></input>
                  <label htmlFor="Lichtenberg">Lichtenberg</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="Kreuzberg"
                    name="ownerLocation"
                    value={kreuzberg}
                    onChange={(event) => setKreuzberg(event.target)}
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
                    value={newCond}
                    onChange={(event) => setNewCond(event.target)}
                  ></input>
                  <label htmlFor="new">new</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="very good"
                    name="itemCondition"
                    value={veryGood}
                    onChange={(event) => setVeryGood(event.target)}
                  ></input>
                  <label htmlFor="very good">very good</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="good"
                    name="itemCondition"
                    value={good}
                    onChange={(event) => setGood(event.target)}
                  ></input>
                  <label htmlFor="good">good</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="checkbox"
                    id="satisfactory"
                    name="itemCondition"
                    value={satisfactory}
                    onChange={(event) => setSatisfactory(event.target)}
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
                    id="5"
                    name="ownerReview"
                    value={star5}
                    onChange={(event) => setStar5(event.target)}
                  ></input>
                  <label htmlFor="5 stars">5 stars</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="4"
                    name="ownerReview"
                    value={star4}
                    onChange={(event) => setStar4(event.target)}
                  ></input>
                  <label htmlFor="4 stars">4 stars or higher</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="3"
                    name="ownerReview"
                    value={star3}
                    onChange={(event) => setStar3(event.target)}
                  ></input>
                  <label htmlFor="3 stars">3 stars or higher</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="2"
                    name="ownerReview"
                    value={star2}
                    onChange={(event) => setStar2(event.target)}
                  ></input>
                  <label htmlFor="2 stars">2 stars or higher</label>
                </div>
                <div className="one-filter-input">
                  <input
                    type="radio"
                    id="1"
                    name="ownerReview"
                    value={star1}
                    onChange={(event) => setStar1(event.target)}
                  ></input>
                  <label htmlFor="1 star">1 star or higher</label>
                </div>
              </div>
            </div>
          </div>
          <div className="search-button-container">
            <button className="search-button">Find</button>
            <input className="clear-button" type="reset" value="Clear" onClick={() => {
              setPriceMax('2000'); setPriceMin('0');
            }}></input>
          </div>
        </form>
      </div>
      <div className="search-results-scroll">
        <div className="search-page-results">
          <ItemsContainer customItems={searchItems} onClickItem={presentPopover} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
