import { db } from '../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import useFetchComment from './useFetchComment';
import { useState } from 'react';

const useFetchTweet = () => {
  const [tweet, setTweet] = useState({});
  const [comment, getComment] = useFetchComment();
  const getTweet = async (userID, tweetID) => {
    const usersTweetsRef = doc(
      db,
      'users',
      `${userID}`,
      'tweets',
      `${tweetID}`
    );
    const response = await getDoc(usersTweetsRef);
    switch (response.data().type) {
      case 'comment':
        const comment = await getComment(userID, tweetID);
        setTweet(comment);
        return comment;
      case 'tweet':
        setTweet(response.data());
        return response.data();
      default:
        return;
    }
  };

  return { tweet, getTweet };
};

export default useFetchTweet;
