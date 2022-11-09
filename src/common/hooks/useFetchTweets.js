import { db } from '../../firebase/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useFetchComment from './useFetchComment';

const useFetchTweets = (id) => {
  const [tweets, setTweets] = useState([]);
  const [comment, getComment] = useFetchComment();

  const usersTweetsRef = collection(db, 'users', `${id}`, 'tweets');
  useEffect(() => {
    onSnapshot(usersTweetsRef, (doc) => {
      doc.forEach(async (tweet) => {
        switch (tweet.data().type) {
          case 'comment':
            const comment = await getComment(id, tweet.data().id);
            setTweets((prevState) => prevState.concat(comment));
            return comment;
          case 'tweet':
            setTweets((prevState) => prevState.concat(tweet.data()));
            return tweet.data();
          default:
            return;
        }
      });
    });
  }, []);

  return { tweets };
};

export default useFetchTweets;
