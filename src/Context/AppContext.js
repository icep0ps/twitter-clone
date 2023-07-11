import React, { useState, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebase-config';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  let userAuth = null;
  onAuthStateChanged(auth, (currentUser) => {
    userAuth = currentUser;
  });

  const [user, setUser] = useState(userAuth);
  const [replyingTo, setReplyingTo] = useState(null);
  const [composeComponentIsToggled, setComposeComponentIsToggled] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        replyingTo,
        setReplyingTo,
        composeComponentIsToggled,
        setComposeComponentIsToggled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
