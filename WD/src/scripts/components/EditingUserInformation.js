import React, { useState } from 'react';
import database from '../firebase/firebase';
import { useUserInformation } from '../context/user-context/UserContext';

const EditingUserInformation = () => {
  const { userInformation, setUserInformation } = useUserInformation();
  const [ banner, setBanner ] = useState(userInformation.banner);
  const [ headline, setHeadline ] = useState(userInformation.headline);
  const [ link, setLink ] = useState(userInformation.link);
  const [ name, setName ] = useState(userInformation.name);
  const [ picture, setPicture ] = useState(userInformation.profilePicture);
  const [ description, setDescription ] = useState(userInformation.description);
  const editInformation = (e) => {
    e.preventDefault();
    const newUserInformation = {
      banner,
      description,
      headline,
      link,
      name,
      profilePicture: picture,
      mail: userInformation.mail,
      review: userInformation.review,
    };
    database
        .ref(`${userInformation.UID}`)
        .once('value')
        .then((snapshot) => {
          const value = snapshot.val();
          const fav = value.favorites;
          if (!!fav) {
            database
                .ref(`${userInformation.UID}`)
                .set({
                  ...newUserInformation,
                  favorites: value.favorites,
                })
                .then(() => {
                  newUserInformation.UID = userInformation.UID;
                  setUserInformation({
                    ...userInformation,
                    ...newUserInformation,
                  });
                  console.log('Data is edited');
                })
                .catch((e) => {
                  console.log('This failed', e);
                });
          } else {
            database
                .ref(`${userInformation.UID}`)
                .set({
                  ...newUserInformation,
                })
                .then(() => {
                  newUserInformation.UID = userInformation.UID;
                  setUserInformation({
                    ...userInformation,
                    ...newUserInformation,
                  });
                  console.log('Data is edited');
                })
                .catch((e) => {
                  console.log('This failed', e);
                });
          }
        })
        .catch((e) => {
          console.log('This failed', e);
        });
  };
  return (
    <div className="edit-component">
      <form className="user-edit" onSubmit={editInformation}>
        <div className="user-edit-flex">
          <label className="user-edit-label">Name: </label>
          <input
            className="user-edit-input"
            type="text"
            id="name"
            /* name="" */
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="user-edit-flex">
          <label className="user-edit-label">Headline: </label>
          <input
            className="user-edit-input"
            type="text"
            id="headline"
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
          />
        </div>
        <div className="user-edit-flex">
          <label className="user-edit-label">Link: </label>
          <input
            className="user-edit-input"
            type="url"
            id="link"
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
        </div>
        <div className="user-edit-flex">
          <label className="user-edit-label">Picture: </label>
          <input
            className="user-edit-input"
            type="url"
            id="picture"
            value={picture}
            onChange={(event) => setPicture(event.target.value)}
          />
        </div>
        <div className="user-edit-flex">
          <label className="user-edit-label">Banner: </label>
          <input
            className="user-edit-input"
            type="url"
            id="banner"
            value={banner}
            onChange={(event) => setBanner(event.target.value)}
          />
        </div>
        <div className="user-edit-flex">
          <label className="user-edit-label">About Me: </label>
          <textarea
            className="user-edit-input-textarea"
            type="text"
            id="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </div>
        <button type="submit" className="user-edit-button">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditingUserInformation;

/*           <NavLink to="/profile" activeClassName="is-active">
            <button className="user-edit-button">Refresh</button>
          </NavLink> */
