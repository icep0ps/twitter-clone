import { useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import useFetchTweet from '../tweets/useFetchTweet';

function useFetchRetweet() {
  const { getTweet } = useFetchTweet(null);
  const [retweet, setRetweet] = useState([]);

  const getRetweet = async (user_id, retweet_id) => {
    const userRetweetRef = doc(db, 'users', `${user_id}`, 'tweets', `${retweet_id}`);

    const tweet = await getDoc(userRetweetRef);

    const usersTweetsRef = doc(
      db,
      'users',
      `${tweet.data().author}`,
      'tweets',
      `${tweet.data().id}`
    );

    const Retweet = await new Promise((resolve, reject) => {
      onSnapshot(usersTweetsRef, async (doc) => {
        const retweetData = doc.data();
        // const res = await getTweet(retweetData.author, retweetData.id);
        if (retweetData === null) return null;
        retweetData.retweeter = user_id;
        retweetData.type = 'retweet';
        setRetweet(retweetData);
        resolve(retweetData);
      });
    });

    return Promise.all([Retweet]).then((response) => {
      return response[0];
    });
  };
  return { getRetweet, retweet };
}

export default useFetchRetweet;
