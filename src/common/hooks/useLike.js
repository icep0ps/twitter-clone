import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { updateDoc, arrayUnion, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const useLike = (tweetRef, tweet) => {
  const { user } = useContext(UserContext);

  const like = async () => {
    const usersLikesRef = doc(
      db,
      'users',
      `${user.displayName}`,
      'likes',
      `${tweet.id}`
    );

    await setDoc(usersLikesRef, {
      id: tweet.id,
      author: tweet.author,
      type: tweet.type,
    });

    await updateDoc(tweetRef, {
      likes: arrayUnion({
        id: user.displayName,
      }),
    });
  };
  return { like };
};

export default useLike;
