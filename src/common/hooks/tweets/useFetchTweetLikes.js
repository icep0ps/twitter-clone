import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { useState } from 'react';

function useFetchTweetLikes() {
  const [likes, setLikes] = useState([]);

  async function getLikes(tweetRef) {
    const likesRef = collection(db, tweetRef.path + '/likes');
    onSnapshot(likesRef, (docs) => {
      const users = [];
      docs.forEach((user) => users.push(user));
      setLikes(users);
    });
  }
  return { likes, getLikes };
}

export default useFetchTweetLikes;
