import { db } from '../../firebase/firebase-config';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import useFetchComment from './useFetchComment';
import { useState } from 'react';
import useFetchUsername from './useFetchUsername';

const useFetchTweet = () => {
  const [tweet, setTweet] = useState(null);
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
    const commentsLengthRef = collection(
      db,
      'users',
      `${userID}`,
      'tweets',
      `${tweetID}`,
      'comments'
    );
    // const length = await getDocs(commentsLengthRef);
    return new Promise((resolve, reject) => {
      onSnapshot(usersTweetsRef, async (response) => {
        if (response.exists()) {
          const tweetData = response.data();
          switch (tweetData.type) {
            case 'comment':
              getComment(userID, tweetID).then((comment) => {
                setTweet(comment);
                resolve(comment);
              });
              break;
            case 'tweet':
              getUsername(userID).then((username) => {
                tweetData.username = username;
                setTweet(tweetData);
                resolve(tweetData);
              });
              break;
            default:
              reject(null);
          }
        }
      });
    });
  };

  return { tweet, getTweet };
};

export default useFetchTweet;
