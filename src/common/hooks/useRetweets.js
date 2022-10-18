import { useEffect, useState } from 'react';
import { onSnapshot, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const useRetweets = (id) => {
  const [retweets, setRetweets] = useState([]);

  useEffect(() => {
    const usersRetweetsRef = collection(db, 'users', `${id}`, 'retweets');
    onSnapshot(usersRetweetsRef, (docs) => {
      docs.forEach(async (tweet) => {
        const { author, id, retweeter } = tweet.data();
        const usersTweetsRef = doc(db, 'users', `${author}`, 'tweets', `${id}`);
        const data = await getDoc(usersTweetsRef);
        const retweet = Object.assign({ retweeter: retweeter }, data.data());
        setRetweets((prevState) => prevState.concat(retweet));
      });
    });
  }, []);
  return { retweets };
};

export default useRetweets;
