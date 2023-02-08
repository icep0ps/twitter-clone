import { useContext } from 'react';
import { UserContext } from '../../../Context/UserContext';
import {
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
  getDoc,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

const useLike = (tweetRef, tweet) => {
  const { user } = useContext(UserContext);
  const like = async () => {
    const usersLikesRef = doc(db, 'users', `${user.displayName}`, 'likes', `${tweet.id}`);

    getDoc(usersLikesRef)
      .then((doc) => {
        if (doc.exists()) {
          deleteDoc(usersLikesRef);

          updateDoc(tweetRef, {
            likes: arrayRemove({
              id: user.displayName,
            }),
          });
        } else {
          setDoc(usersLikesRef, {
            ref: tweetRef,
            type: tweet.type,
          });

          updateDoc(tweetRef, {
            likes: arrayUnion({
              id: user.displayName,
            }),
          });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };
  return { like };
};

export default useLike;
