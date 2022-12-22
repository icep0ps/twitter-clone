import { db } from '../../firebase/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';

const useFetchMainTweet = () => {
  const [mainTweet, setMainTweet] = useState(null);
  const getMainTweet = async (user_id, tweet_id) => {
    const usersTweetsRef = doc(
      db,
      'users',
      `${user_id}`,
      'tweets',
      `${tweet_id}`
    );
    return new Promise((resolve, reject) => {
      onSnapshot(usersTweetsRef, (doc) => {
        setMainTweet(doc);
        resolve(doc);
      });
    });
  };

  return { mainTweet, getMainTweet };
};

export default useFetchMainTweet;
