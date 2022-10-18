import { db } from '../../firebase/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useFetchTweets = (id) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const usersTweetsRef = collection(db, 'users', `${id}`, 'tweets');
    onSnapshot(usersTweetsRef, (doc) => {
      doc.forEach(async (tweet) => {
        setTweets((prevState) => prevState.concat(tweet.data()));
      });
    });
  }, []);

  return { tweets };
};

export default useFetchTweets;
