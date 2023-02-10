import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { useState } from 'react';

function useFetchStats() {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [retweets, setRetweets] = useState([]);

  async function getLikes(tweetRef) {
    const likesRef = collection(db, tweetRef.path + '/likes');
    onSnapshot(likesRef, (docs) => {
      const users = [];
      docs.forEach((user) => users.push(user));
      setLikes(users);
    });

    const commentsRef = collection(db, tweetRef.path + '/comments');
    onSnapshot(commentsRef, (docs) => {
      const users = [];
      docs.forEach((user) => users.push(user));
      setComments(users);
    });

    const retweetsRef = collection(db, tweetRef.path + '/retweets');
    onSnapshot(retweetsRef, (docs) => {
      const users = [];
      docs.forEach((user) => users.push(user));
      setRetweets(users);
    });
  }
  return { likes, comments, retweets, getLikes };
}

export default useFetchStats;
