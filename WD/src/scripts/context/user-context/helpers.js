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
                  banner:
                  'https://images.pexels.com/photos/3953119/pexels-photo-3953119.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
                  description: 'No further information.',
                  headline: 'default',
                  link: 'https://www.google.de',
                  mail: `mailto:${user.email}`,
                  name: user.displayName,
                  favorites: {},
                  profilePicture:
                  user.photoURL|| 'https://images.pexels.com/photos/5326900/pexels-photo-5326900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
