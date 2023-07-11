import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { useState } from 'react';

function useFetchStats(tweetRef) {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [isLoading] = useState(true);

  if (tweetRef) {
    const likesRef = collection(db, tweetRef.path + '/likes');
    const commentsRef = collection(db, tweetRef.path + '/comments');
    const retweetsRef = collection(db, tweetRef.path + '/retweets');

    onSnapshot(likesRef, (docs) => {
      const users = [];
      docs.forEach((user) => users.push(user));
      setLikes(users);
    });

    onSnapshot(commentsRef, (docs) => {
      const users = [];
      docs.forEach((user) => users.push(user));
      setComments(users);
    });

    onSnapshot(retweetsRef, (docs) => {
      const users = [];
      docs.forEach((user) => users.push(user));
      setRetweets(users);
    });
  }

  return { likes, comments, retweets, isLoading };
}

export default useFetchStats;
