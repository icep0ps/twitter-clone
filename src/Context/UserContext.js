import { createContext } from 'react';
import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  let userAuth = null;
  onAuthStateChanged(auth, (currentUser) => {
    userAuth = currentUser;
  });

  const [user, setUser] = useState(userAuth);
  const [retweets, setRetweets] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [tweetsStorage, setTweetsStorage] = useState([]);
  const [currentTweetBiengViewed, setCurrentTweetBiengViewed] = useState({});
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        tweetsStorage,
        setTweetsStorage,
        currentTweetBiengViewed,
        setCurrentTweetBiengViewed,
        retweets,
        setRetweets,
        replyingTo,
        setReplyingTo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
