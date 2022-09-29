import { createContext } from 'react';
import React, { useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, tweets, setTweets }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
