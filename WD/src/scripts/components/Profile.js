import React, { useState } from 'react';
import EditingUserInformation from './EditingUserInformation';
import AboutMe from './AboutMe';
import { useUserInformation } from '../context/user-context/UserContext';
import FavoriteItems from './FavoriteItems';
import PersonalItems from './PersonalItems';

const TABS = {
  ABOUT: 'aboutMe',
  ARTIFACTS: 'artifactsServices',
  FAVORITES: 'favorites',
  EDIT: 'editProfile',
};

const TABS_TO_COMPONENTS = {
  [TABS.ABOUT]: AboutMe,
  [TABS.EDIT]: EditingUserInformation,
  [TABS.ARTIFACTS]: PersonalItems,
  [TABS.FAVORITES]: FavoriteItems,
};

const Profile = () => {
  const [ currentTab, setCurrentTab ] = useState(TABS.ABOUT);
  const { userInformation } = useUserInformation();
  const Component = TABS_TO_COMPONENTS[currentTab];
  return (
    <div className="user-container">
      <div className="user-header">
        <img
          src={userInformation.banner}
          className="user-banner"
          alt="Background picture"
        />
        <img
          src={userInformation.profilePicture}
          className="user-picture"
          alt="Profile picture"
        />
        <div className="user-headline">
          <a href={userInformation.link} target="_blank" rel="noreferrer">
            <p>Click here for more information about me</p>
          </a>
          <h3>{userInformation.headline}</h3>
        </div>
      </div>
      <div className="user-sidebar">
        <div className="user-sidebar-container">
          <h2 className="user-h2">{userInformation.name}</h2>
          <div className="user-sidebar-review">
            {'★'.repeat(Math.round(parseFloat(userInformation.review))) +
              '☆'.repeat(5 - Math.round(parseFloat(userInformation.review)))}
          </div>
        </div>
        <div className="user-sidebar-contact">
          <a href={userInformation.mail}>
            <i className="icofont-mail"></i>
          </a>
          <p>Contact me</p>
        </div>
      </div>
      <div className="user-main">
        <div className="user-main-bar">
          <button onClick={() => setCurrentTab(TABS.ABOUT)}>About me</button>
          <button onClick={() => setCurrentTab(TABS.ARTIFACTS)}>
            Items & Services
          </button>
          <button onClick={() => setCurrentTab(TABS.FAVORITES)}>
            Favorites
          </button>
          <button onClick={() => setCurrentTab(TABS.EDIT)}>Edit Profile</button>
        </div>
        <div className="user-main-context">
          <Component />
        </div>
      </div>
    </div>
  );
};

export default Profile;
