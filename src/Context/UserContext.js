import { createContext } from 'react';
import React, { useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [retweets, setRetweets] = useState([]);
  const [currentTweetBiengViewed, setCurrentTweetBiengViewed] = useState({});
  const [tweetsStorage, setTweetsStorage] = useState([]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
