import { db } from '../../../firebase/firebase-config';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import useFetchComment from '../comments/useFetchComment';
import Tweet from '../../classes/Tweet';
import Author from '../../classes/Author';

const useFetchTweet = () => {
  let isInitialFetch = true;
  const [tweet, setTweet] = useState();
  const [getCommentAndTweet] = useFetchComment();

  const getTweet = async function (author, tweetId) {
    let usersTweetsRef = doc(db, 'users', `${author}`, 'tweets', `${tweetId}`);
    let isValidDocumentRef = await getDoc(usersTweetsRef);

    while (isValidDocumentRef.exists() === false) {
      usersTweetsRef = doc(db, 'users', `${author}`, 'comments', `${tweetId}`);
      isValidDocumentRef = await getDoc(usersTweetsRef);
    }

    const getUsersTweet = await getDoc(usersTweetsRef);

    if (getUsersTweet.data().commentRef) {
      const commentRef = getUsersTweet.data().commentRef;
      const tweetRef = getUsersTweet.data().parentTweetRef;

      const listenToComment = await new Promise((resolve, reject) => {
        onSnapshot(commentRef, async () => {
          const tweetAndComment = await getCommentAndTweet(tweetRef, commentRef);
          resolve(tweetAndComment);
          setTweet(tweetAndComment);
        });
      });
      const listenToTweet = await new Promise((resolve, reject) => {
        onSnapshot(tweetRef, async (tweetSnapshot) => {
          if (isInitialFetch) {
            isInitialFetch = false;
            const {
              id,
              author,
              tweet: usersTweet,
              date,
              images,
              ref,
            } = tweetSnapshot.data();
            const { id: AuthorId, username } = author;
            const constructAuthor = new Author(AuthorId, username);
            const constructedTweet = new Tweet(
              id,
              usersTweet,
              constructAuthor,
              date,
              ref,
              images
            );
            resolve(constructedTweet);
            return;
          }
          const tweetAndComment = await getCommentAndTweet(tweetRef, commentRef);
          resolve(tweetAndComment);
          setTweet(tweetAndComment);
        });
      });

      return await Promise.all([listenToComment, listenToTweet]).then(() => tweet);
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
