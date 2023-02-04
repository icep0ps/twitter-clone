import { db } from '../../../firebase/firebase-config';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import useFetchComment from '../comments/useFetchComment';

const useFetchTweet = () => {
  let isInitialFetch = true;
  const [tweet, setTweet] = useState();
  const [getCommentAndTweet] = useFetchComment();

  const getTweet = async function (author, tweetId) {
    const usersTweetsRef = doc(
      db,
      'users',
      `${author}`,
      'tweets',
      `${tweetId}`
    );
    const getUsersTweet = await getDoc(usersTweetsRef);

    if (getUsersTweet.data().type === 'comment') {
      const commentRef = getUsersTweet.data().commentRef;
      const tweetRef = getUsersTweet.data().parentTweetRef;

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
