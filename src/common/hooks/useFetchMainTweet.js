import { db } from '../../firebase/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';

const useFetchMainTweet = () => {
  const [mainTweet, setMainTweet] = useState({});

  const getMainTweet = async (user_id, tweet_id) => {
    const usersTweetsRef = doc(
      db,
      'users',
      `${user_id}`,
      'tweets',
      `${tweet_id}`
    );
    const Tweet = new Promise((resolve, reject) => {
      onSnapshot(usersTweetsRef, async (tweet) => {
        while (tweet.data()?.orignalPost) {
          const tmpRef = doc(
            db,
            'users',
            `${tweet.data().author}`,
            'tweets',
            `${tweet.data().orignalPost}`,
            'comments',
            `${tweet.data().id}`
          );
          tweet = await new Promise((resolve, reject) => {
            onSnapshot(tmpRef, (doc) => {
              resolve(doc);
            });
          });
        }
        setMainTweet(tweet.data());
        resolve(tweet);
      });
    });
    return Tweet.then((tweet) => {
      return tweet;
    });
  };

  return { mainTweet, getMainTweet };
};

export default useFetchMainTweet;
