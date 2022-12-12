import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';

function useFetchRetweets() {
  const [retweets, setRetweets] = useState([]);

  const getRetweets = async (user_id) => {
    const usersRetweetsRef = collection(db, 'users', `${user_id}`, 'tweets');
    onSnapshot(usersRetweetsRef, (docs) => {
      docs.forEach(async (tweet) => {
        if (tweet.data().type === 'retweet') {
          const { author, id, retweeter } = tweet.data();
          const usersTweetsRef = doc(
            db,
            'users',
            `${author}`,
            'tweets',
            `${id}`
          );
          const data = await getDoc(usersTweetsRef);
          const retweet = Object.assign({ retweeter: retweeter }, data.data());
          setRetweets((prevState) => prevState.concat(retweet));
        }
      });
    });
  };
  return { getRetweets, retweets };
}

export default useFetchRetweets;
