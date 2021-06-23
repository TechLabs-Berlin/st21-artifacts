import React from "react";
import userInformation from "./Datasets";
import EditingUserInformation from "./EditingUserInformation";
import AboutMe from "./AboutMe";
import database from "../firebase/firebase";
import ItemCard from "./ItemCard";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: true,
      artifactsServices: false,
      favorites: false,
      editProfile: false,
      items: [],
      favItems: [],
    };
    this.handleAboutMe = this.handleAboutMe.bind(this);
    this.handleArtifactsServices = this.handleArtifactsServices.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
  }
  handleAboutMe = () => {
    this.setState({
      aboutMe: true,
      artifactsServices: false,
      favorites: false,
      editProfile: false,
    });
  };
  handleArtifactsServices = () => {
    this.setState({
      aboutMe: false,
      artifactsServices: true,
      favorites: false,
      editProfile: false,
      items: [],
    });
    database
      .ref("items")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().ownerKey === userInformation.UID) {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            /* console.log(item); */
            this.setState((prevState) => ({
              items: [...prevState.items, item],
            }));
            /*  console.log(this.state.items); */
          }
        });
      });
  };
  handleFavorites = () => {
    this.setState({
      aboutMe: false,
      artifactsServices: false,
      favorites: true,
      editProfile: false,
      favItems: [],
    });
    userInformation.favorites.map((fav) => {
      /* console.log(fav); */
      database
        .ref(`items/${fav}`)
        .once("value")
        .then((snapshot) => {
          const favorite = snapshot.val();
          favorite.key = fav;
          /* console.log(favorite); */
          this.setState((prevState) => ({
            favItems: [...prevState.favItems, favorite],
          }));
          /* console.log(this.state.favItems); */
        });
    });
  };
  handleEditProfile = () => {
    this.setState({
      aboutMe: false,
      artifactsServices: false,
      favorites: false,
      editProfile: true,
    });
  };
  render() {
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
            <a href={userInformation.link} target="_blank">
              <p>Click here for more information about me</p>
            </a>
            <h3>{userInformation.headline}</h3>
          </div>
        </div>
        <div className="user-sidebar">
          <h2 className="user-h2">{userInformation.name}</h2>
          <div className="user-sidebar-contact">
            <a href={userInformation.mail}>
              <i className="icofont-mail"></i>
            </a>
            <p>Contact me</p>
          </div>
          <div className="user-sidebar-review">
            <h3 className="user-h3">Testemonials</h3>
            <p>Review here</p>
            <p>Review here</p>
            <p>Review here</p>
          </div>
        </div>
        <div className="user-main">
          <div className="user-main-bar">
            <button onClick={this.handleAboutMe}>About me</button>
            <button onClick={this.handleArtifactsServices}>
              Artifacts & services
            </button>
            <button onClick={this.handleFavorites}>Favorites</button>
            <button onClick={this.handleEditProfile}>Edit Profile</button>
          </div>
          <div className="user-main-context">
            {this.state.editProfile && <EditingUserInformation />}
            {this.state.aboutMe && <AboutMe />}
            {this.state.artifactsServices && (
              <div className="list-artifacts-services">
                {this.state.items.map((item) => (
                  <ItemCard
                    itemFans={item.itemFans}
                    itemName={item.itemName}
                    itemKey={item.key}
                    itemPicture={item.itemPicture}
                    itemPrice={item.itemPrice}
                    ownerName={item.ownerName}
                    ownerPicture={item.ownerPicture}
                    ownerReview={item.ownerReview}
                  />
                ))}
              </div>
            )}
            {this.state.favorites && (
              <div className="list-artifacts-services">
                {this.state.favItems.map((item) => (
                  <ItemCard
                    itemFans={item.itemFans}
                    itemName={item.itemName}
                    itemKey={item.key}
                    itemPicture={item.itemPicture}
                    itemPrice={item.itemPrice}
                    ownerName={item.ownerName}
                    ownerPicture={item.ownerPicture}
                    ownerReview={item.ownerReview}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
