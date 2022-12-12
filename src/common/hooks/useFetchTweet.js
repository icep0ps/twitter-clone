import { db } from '../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import useFetchComment from './useFetchComment';
import { useState } from 'react';
import useFetchUsername from './useFetchUsername';

const useFetchTweet = () => {
  const [tweet, setTweet] = useState({});
  const [comment, getComment] = useFetchComment();
  const { getUsername } = useFetchUsername();

  const getTweet = async (userID, tweetID) => {
    const usersTweetsRef = doc(
      db,
      'users',
      `${userID}`,
      'tweets',
      `${tweetID}`
    );
    const response = await getDoc(usersTweetsRef);
    const tweetData = response.data();
    switch (tweetData.type) {
      case 'comment':
        const comment = await getComment(userID, tweetID);
        setTweet(comment);
        return comment;
      case 'tweet':
        const username = await getUsername(userID);
        tweetData.username = username;
        setTweet(tweetData);
        return tweetData;
      default:
        return;
    }
  };

  return { tweet, getTweet };
};

export default useFetchTweet;
