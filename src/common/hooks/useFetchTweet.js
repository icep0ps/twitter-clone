import { db } from '../../firebase/firebase-config';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import useFetchComment from './useFetchComment';
import { useState } from 'react';

const useFetchTweet = () => {
  let isInitialFetch = true;
  const [tweet, setTweet] = useState();
  const [getCommentAndTweet] = useFetchComment();

  const getTweet = async (author, tweetId) => {
    const usersTweetsRef = doc(
      db,
      'users',
      `${author}`,
      'tweets',
      `${tweetId}`
    );
    const getUsersTweetsRef = await getDoc(usersTweetsRef);

    if (getUsersTweetsRef.data().type === 'comment') {
      const commentRef = getUsersTweetsRef.data().commentRef;
      const tweetRef = getUsersTweetsRef.data().parentTweetRef;

      const listenToComment = await new Promise((resolve, reject) => {
        onSnapshot(commentRef, async () => {
          const tweetAndComment = await getCommentAndTweet(
            tweetRef,
            commentRef
          );
          resolve(tweetAndComment);
          setTweet(tweetAndComment);
        });
      });
      const listenToTweet = await new Promise((resolve, reject) => {
        onSnapshot(tweetRef, async () => {
          if (isInitialFetch) {
            isInitialFetch = false;
            resolve(tweet);
            return;
          }
          const tweetAndComment = await getCommentAndTweet(
            tweetRef,
            commentRef
          );
          resolve(tweetAndComment);
          setTweet(tweetAndComment);
        });
      });

      return await Promise.all([listenToComment, listenToTweet]).then(
        () => tweet
      );
    }

    const listenToTweet = await new Promise((resolve, reject) => {
      onSnapshot(usersTweetsRef, (tweetSnapshot) => {
        const tweetData = tweetSnapshot.data();
        resolve(tweetData);
        setTweet(tweetData);
      });
    });

    return listenToTweet;
  };

  return { tweet, getTweet };
};

export default useFetchTweet;
