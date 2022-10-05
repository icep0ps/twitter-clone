import { createContext } from 'react';
import React, { useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [currentTweet, setCurrentTweet] = useState({});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        tweets,
        setTweets,
        currentTweet,
        setCurrentTweet,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
