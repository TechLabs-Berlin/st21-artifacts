import React, { useContext, createContext } from 'react';
import { useAuth } from './helpers';

export const UserContext = createContext({});

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn;
};

export const useUserInformation = () => {
  const { userInformation, setUserInformation } = useContext(UserContext);
  return { userInformation, setUserInformation };
};

export const UserContextProvider = ({ children }) => {
  const data = useAuth();
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
