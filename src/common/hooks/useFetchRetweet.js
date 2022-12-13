import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import useFetchTweet from './useFetchTweet';

function useFetchRetweet() {
  const { getTweet } = useFetchTweet();
  const [retweet, setRetweet] = useState([]);

  const getRetweet = async (user_id, retweet_id) => {
    const userRetweetRef = doc(
      db,
      'users',
      `${user_id}`,
      'tweets',
      `${retweet_id}`
    );
    const response = await getDoc(userRetweetRef);
    const retweetData = response.data();
    const tweet = await getTweet(retweetData.author, retweetData.id);
    tweet.retweeter = user_id;
    tweet.type = 'retweet';
    setRetweet(tweet);
    return tweet;
  };
  return { getRetweet, retweet };
}

export default useFetchRetweet;
