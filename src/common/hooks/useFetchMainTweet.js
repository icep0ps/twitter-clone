import { db } from '../../firebase/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';

const useFetchMainTweet = () => {
  const [mainTweet, setMainTweet] = useState({});

  const getMainTweet = async (author, orignalPost) => {
    const tweetRef = doc(db, 'users', `${author}`, 'tweets', `${orignalPost}`);

    const Tweet = new Promise((resolve, reject) => {
      onSnapshot(tweetRef, async (tweetSnapshot) => {
        let tweet = tweetSnapshot.data();
        const { orignalPost, author, id } = tweet;

        while (tweet?.orignalPost) {
          const tmpRef = doc(
            db,
            'users',
            `${author}`,
            'tweets',
            `${orignalPost}`,
            'comments',
            `${id}`
          );
          tweet = await new Promise((resolve, reject) => {
            onSnapshot(tmpRef, (doc) => {
              console.log('this might be the problem', doc.data());
              resolve(doc);
            });
          });
        }
        setMainTweet(tweet);
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
