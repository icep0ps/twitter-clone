import { useContext } from 'react';
import { db } from '../../../firebase/firebase-config';
import AppContext from '../../../Context/AppContext';
import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';

function useRetweet(tweetRef, tweetInfomation) {
  const { id, author } = tweetInfomation;
  const { user } = useContext(AppContext);

  const retweet = async () => {
    if (user.displayName === author) return;

    const yourTweetsRef = doc(db, 'users', `${user.displayName}`, 'tweets', `${id}`);

    getDoc(yourTweetsRef)
      .then((doc) => {
        if (doc.exists()) {
          deleteDoc(yourTweetsRef);

          updateDoc(tweetRef, {
            retweets: arrayRemove({
              id: user.displayName,
            }),
          });
        } else {
          setDoc(yourTweetsRef, {
            type: 'retweet',
            ref: tweetRef,
          });

          updateDoc(tweetRef, {
            retweets: arrayUnion({
              id: user.displayName,
            }),
          });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  return { retweet };
}

export default useRetweet;
