import React from "react";
import userInformation from "./Datasets";
import database from "../firebase/firebase";
import { NavLink } from "react-router-dom";

export default class EditingUserInformation extends React.Component {
  constructor(props) {
    super(props);
    this.editInformation = this.editInformation.bind(this);
  }
  editInformation(e, banner, headline, link, name, picture, description) {
    e.preventDefault();
    database
      .ref(`${userInformation.UID}`)
      .set({
        banner: banner,
        description: description,
        headline: headline,
        link: link,
        name: name,
        profilePicture: picture,
        mail: userInformation.mail,
      })
      .then(() => {
        console.log("Data is edited");
      })
      .catch((e) => {
        console.log("This failed", e);
      });
    userInformation.banner = banner;
    userInformation.description = description;
    userInformation.headline = headline;
    userInformation.link = link;
    userInformation.name = name;
    userInformation.profilePicture = picture;
  }
  render() {
    return (
      <div>
        <h2 className="user-h2">Please edit your user information here:</h2>
        <form
          className="user-edit"
          onSubmit={(e) =>
            this.editInformation(
              e,
              document.getElementById("banner").value,
              document.getElementById("headline").value,
              document.getElementById("link").value,
              document.getElementById("name").value,
              document.getElementById("picture").value,
              document.getElementById("description").value
            )
          }
        >
          <div className="user-edit-flex">
            <label className="user-edit-label">Name: </label>
            <input
              className="user-edit-input"
              type="text"
              id="name"
              /* name="" */
              defaultValue={userInformation.name}
            ></input>
          </div>
          <div className="user-edit-flex">
            <label className="user-edit-label">Headline: </label>
            <input
              className="user-edit-input"
              type="text"
              id="headline"
              /* name="" */
              defaultValue={userInformation.headline}
            ></input>
          </div>
          <div className="user-edit-flex">
            <label className="user-edit-label">Link: </label>
            <input
              className="user-edit-input"
              type="url"
              id="link"
              /* name="" */
              defaultValue={userInformation.link}
            ></input>
          </div>
          <div className="user-edit-flex">
            <label className="user-edit-label">Picture: </label>
            <input
              className="user-edit-input"
              type="url"
              id="picture"
              /* name="" */
              defaultValue={userInformation.profilePicture}
            ></input>
          </div>
          <div className="user-edit-flex">
            <label className="user-edit-label">Banner: </label>
            <input
              className="user-edit-input"
              type="url"
              id="banner"
              /*  name="" */
              defaultValue={userInformation.banner}
            ></input>
          </div>
          <div className="user-edit-flex">
            <label className="user-edit-label">About Me: </label>
            <textarea
              className="user-edit-input"
              type="text"
              id="description"
              /* name="" */
              defaultValue={userInformation.description}
            ></textarea>
          </div>
          <button type="submit" className="user-edit-button">
            Edit
          </button>
          <NavLink to="/profile" activeClassName="is-active">
            <button className="user-edit-button">Refresh</button>
          </NavLink>
        </form>
      </div>
    );
  }
}
