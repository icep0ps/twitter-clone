import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import Author from '../../classes/Author';
import Tweet from '../../classes/Tweet';
import useFetchComment from '../comments/useFetchComment';
import { db } from '../../../firebase/firebase-config';

const useFetchTweet = () => {
  const [tweet, setTweet] = useState();
  const [getCommentAndTweet] = useFetchComment();

  const getTweet = async function (author, tweetId) {
    let usersTweetsRef = doc(db, 'users', `${author}`, 'tweets', `${tweetId}`);
    let isValidDocumentRef = await getDoc(usersTweetsRef);

    if (!isValidDocumentRef.exists()) {
      usersTweetsRef = doc(db, 'users', `${author}`, 'comments', `${tweetId}`);
      isValidDocumentRef = await getDoc(usersTweetsRef);

      if (!isValidDocumentRef.exists()) {
        throw new Error('Tweet does not exist');
      }
    }

    const getUsersTweet = await getDoc(usersTweetsRef);

    if (getUsersTweet.data().commentRef) {
      const commentRef = getUsersTweet.data().commentRef;
      const tweetRef = getUsersTweet.data().parentTweetRef;

      const comment = (async () => {
        const tweetAndComment = await getCommentAndTweet(tweetRef, commentRef);
        setTweet(tweetAndComment);
      })();

      return comment;
    }

    const tweet = (async () => {
      const tweetSnapshot = await getDoc(usersTweetsRef);
      const tweetData = tweetSnapshot.data();
      const { id, author, tweet, date, images, ref } = tweetData;
      const { id: AuthorId, username } = author;
      const constructAuthor = new Author(AuthorId, username);
      const constructTweet = new Tweet(id, tweet, constructAuthor, date, ref, images);
      setTweet(constructTweet);
      return constructTweet;
    })();

    return tweet;
  };

  return { tweet, getTweet };
};

export default useFetchTweet;
