import { useEffect, useState } from 'react';
import database, { firebase } from '../../firebase/firebase';
import { history } from '../../routers/AppRouter';

export const useAuth = () => {
  const [ userInformation, setUserInformation ] = useState({});
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        database
            .ref(`${user.uid}`)
            .once('value')
            .then((snapshot) => {
              if (snapshot.exists()) {
                const userInformation = snapshot.val();
                userInformation.UID = user.uid;
                userInformation.favorites = Object.values(userInformation.favorites || {});
                setUserInformation(userInformation);
              } else {
                const defaultUserInformation = {
                  banner: 'https://wallpapercave.com/wp/wp6168519.jpg',
                  description: 'No further information.',
                  headline: 'default',
                  link: 'https://www.google.de',
                  mail: `mailto:${user.email}`,
                  name: user.displayName,
                  favorites: {},
                  profilePicture:
                    user.photoURL ||
                    'https://www.thoughtco.com/thmb/2wU-Ux_HMu2fKMgGIbiQ__GVTrc=/768x0/filters:no_upscale([…]-yayoi-kusama-142104772-e1f7601789b54b8f9d8c4dcd6be40a6d.jpg',
                };
                database
                    .ref(`${user.uid}`)
                    .set(defaultUserInformation)
                    .then(() => {
                      defaultUserInformation.UID = user.uid;
                      defaultUserInformation.favorites = [];
                      setUserInformation(defaultUserInformation);
                    })
                    .catch((e) => {
                      console.log('This failed.', e);
                    });
              }
            })
            .catch((error) => {
              console.error(error);
            });
      } else {
        // set userInformation back to "default"
        history.push('/');
        setUserInformation({});
        setLoggedIn(false);
      }
    });
  }, []);
  return { userInformation, setUserInformation, isLoggedIn, setLoggedIn };
};
