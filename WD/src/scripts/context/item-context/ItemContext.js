import database from '../../firebase/firebase';
import React, { useContext, createContext, useEffect, useState } from 'react';
import { useUserInformation } from '../user-context/UserContext';

export const ItemContext = createContext({});

export const useItems = () => {
  const { items } = useContext(ItemContext);
  return items;
};

export const useAllItems = () => {
  const { allItems } = useContext(ItemContext);
  return allItems;
};

export const useFavoriteItems = () => {
  const { favItems } = useContext(ItemContext);
  return favItems;
};

export const ItemContextProvider = ({ children }) => {
  const [ favItems, setFavItems ] = useState([]);
  const [ items, setItems ] = useState([]);
  const [ allItems, setAllItems ] = useState([]);
  const { userInformation } = useUserInformation();
  useEffect(() => {
    if (userInformation.UID) {
      const favRef = database.ref(`${userInformation.UID}/favorites`);
      const favItemsListener = favRef.on('value', (snapshot) => {
        const favItemsFromDb = snapshot.val() || {};
        setFavItems(Object.values(favItemsFromDb));
      });

      const itemsRef = database.ref('items');
      const itemsListener = itemsRef.on('value', (snapshot) => {
        const itemsCopy = [];
        const allItemsCopy = [];
        snapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          item.key = childSnapshot.key;
          allItemsCopy.push(item);
          if (childSnapshot.val().ownerKey === userInformation.UID) {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            itemsCopy.push(item);
          }
        });
        setItems(itemsCopy);
        console.log('allitems', allItemsCopy);
        setAllItems(allItemsCopy);
      });
      return () => {
        itemsRef.off('value', itemsListener);
        favRef.off('value', favItemsListener);
      };
    }
  }, [ userInformation ]);
  const data = {
    favItems,
    items,
    allItems,
  };
  return <ItemContext.Provider value={data}>{children}</ItemContext.Provider>;
};
