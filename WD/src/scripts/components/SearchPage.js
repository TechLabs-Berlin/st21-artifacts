import React, { useEffect, useState } from 'react';
import ItemsContainer from './ItemsContainer';
import ItemPopover from './ItemPopover';
import { useAllItems } from '../context/item-context/ItemContext';

const SearchPage = () => {
  const [ searchItems, setSearchItems ] = useState([]);
  const allItems = useAllItems();
  const [ popover, setPopover ] = useState(null);
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

  // Adding all items to search items to be rendered in first mount
  useEffect(() => {
    console.log('items', allItems);
    setSearchItems(allItems);
  }, []);

  const filterCards = (e) => {
    e.preventDefault();
    const checkedDataCategory = [
      photo.checked && photo.id,
      costumes.checked && costumes.id,
      music.checked && music.id,
      art.checked && art.id,
      others.checked && others.id,
    ].filter((value) => value); // filtering only non-empty values in array

    const shotGunCategory = checkedDataCategory.length === 0;

    const checkedDataLocation = [
      mitte.checked && mitte.id,
      charlottenburg.checked && charlottenburg.id,
      friedrichshain.checked && friedrichshain.id,
      lichtenberg.checked && lichtenberg.id,
      kreuzberg.checked && kreuzberg.id,
    ].filter((value) => value); // filtering only non-empty values in array

    const shotGunLocation = checkedDataLocation.length === 0;

    const checkedDataCondition = [
      newCond.checked && newCond.id,
      veryGood.checked && veryGood.id,
      good.checked && good.id,
      satisfactory.checked && satisfactory.id,
    ].filter((value) => value); // filtering only non-empty values in array

    const shotGunCondition = checkedDataCondition.length === 0;


    const checkedDataRating = [
      parseFloat(star5.checked && star5.id),
      parseFloat(star4.checked && star4.id),
      parseFloat(star3.checked && star3.id),
      parseFloat(star2.checked && star2.id),
      parseFloat(star1.checked && star1.id),
    ].filter((data) => !isNaN(data)); // filtering only non-NaN values in array

    const shotGunRating = checkedDataRating.length === 0;

    let checkedDataPriceMin = 0;
    let checkedDataPriceMax = 2000;
    let shotGunPrice = false;

    if (!!(freeStuff.checked && freeStuff.id) === true) {
      checkedDataPriceMin = 0;
      checkedDataPriceMax = 0;
    } else if (!!priceMin === true && !!priceMax === true) {
      checkedDataPriceMin = parseFloat(priceMin);
      checkedDataPriceMax = parseFloat(priceMax);
    } else {
      shotGunPrice = true;
    }

    const checkedDataSearch = search.trim().length === 0 ? [] : search.toLowerCase().split(' ');

    const filteredItems = allItems.filter((item) => {
      const filterCategory = shotGunCategory || checkedDataCategory.includes(
          item.itemCategory,
      );
      const filterLocation = shotGunLocation || checkedDataLocation.includes(
          item.ownerLocation,
      );
      const filterCondition = shotGunCondition || checkedDataCondition.includes(
          item.itemCondition,
      );

      const filterRating = shotGunRating || checkedDataRating.some((star) => parseFloat(item.ownerReview) >= star);

      const filterPrice = shotGunPrice || (
        item.itemPrice >= checkedDataPriceMin &&
        item.itemPrice <= checkedDataPriceMax
      );

      const searchTitle = checkedDataSearch.length === 0 ||
        checkedDataSearch.some((word) => item.itemName.toLowerCase().indexOf(word));
      return (
        filterCategory &&
      filterLocation &&
      filterCondition &&
      filterRating &&
      filterPrice &&
      searchTitle
      );
    });
    setSearchItems(filteredItems);
  };
  return (
    <div className="search-page">
      <div className="search-filter-bar">
        <form
          className="search-filter-form"
          onSubmit={filterCards}
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
          <ItemsContainer customItems={searchItems} onClickItem={setPopover} />
        </div>
        <div>
          {popover && <ItemPopover
            clearPopover={() => {
              setPopover(null);
            }}
            itemName={popover.itemName}
            itemDescription={popover.itemDescription}
            itemPrice={popover.itemPrice}
            itemPicture={popover.itemPicture}
            itemAvailability={popover.itemAvailability}
            ownerReview={popover.ownerReview}
            ownerLocation={popover.ownerLocation}
          />}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
