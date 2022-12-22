import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import useFetchTweet from './useFetchTweet';

function useFetchRetweet() {
  const { getTweet } = useFetchTweet(null);
  const [retweet, setRetweet] = useState([]);

  const getRetweet = (user_id, retweet_id) => {
    const userRetweetRef = doc(
      db,
      'users',
      `${user_id}`,
      'tweets',
      `${retweet_id}`
    );

    return new Promise((resolve, reject) => {
      onSnapshot(userRetweetRef, async (doc) => {
        const retweetData = doc.data();
        console.log(retweetData);
        const res = await getTweet(retweetData.author, retweetData.id);
        if (res === null) return null;
        res.retweeter = user_id;
        res.type = 'retweet';
        console.log(res);
        resolve(res);
      });
    });
  };
  return { getRetweet, retweet };
}

export default useFetchRetweet;
