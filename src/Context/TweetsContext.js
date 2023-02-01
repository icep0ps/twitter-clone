import { createContext, useState } from 'react';

const TweetsContext = createContext();

const TweetsProvider = ({ children }) => {
  const [contextTweets, setContextTweets] = useState([]);
  const [contextRetweets, setContextRetweets] = useState([]);
  const [contextComments, setContextComments] = useState([]);

  return (
    <TweetsContext.Provider
      value={{
        contextTweets,
        setContextTweets,
        contextRetweets,
        setContextRetweets,
        contextComments,
        setContextComments,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
};

export { TweetsContext, TweetsProvider };
