import { createContext } from 'react';
import React, { useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
