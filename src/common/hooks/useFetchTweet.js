import { db } from '../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';

const useFetchTweet = () => {
  const [tweet, setTweet] = useState({});

  const getTweet = async (userID, tweetID) => {
    const usersTweetsRef = doc(
      db,
      'users',
      `${userID}`,
      'tweets',
      `${tweetID}`
    );
    const response = await getDoc(usersTweetsRef);
    setTweet(response.data());
  };

  return { tweet, getTweet };
};

export default useFetchTweet;
