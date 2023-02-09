import { db } from '../../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import useFetchComment from '../comments/useFetchComment';
import Tweet from '../../classes/Tweet';
import Author from '../../classes/Author';

const useFetchTweet = () => {
  const [tweet, setTweet] = useState();
  const [comment, setComment] = useState();
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

      const comment = (async () => {
        const tweetAndComment = await getCommentAndTweet(tweetRef, commentRef);
        setComment(tweetAndComment);
        setTweet(null);
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
      setComment(null);

      return constructTweet;
    })();

    return tweet;
  };

  return { tweet, comment, getTweet };
};

export default useFetchTweet;
