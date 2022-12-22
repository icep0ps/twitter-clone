import { useContext } from 'react';
import { db } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';
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
  const { user } = useContext(UserContext);

  const retweet = async () => {
    if (user.displayName === author) return;

    const yourTweetsRef = doc(
      db,
      'users',
      `${user.displayName}`,
      'tweets',
      `${id}`
    );

    getDoc(yourTweetsRef)
      .then((doc) => {
        if (doc.exists()) {
          console.log('Document data:', doc.data());
          deleteDoc(yourTweetsRef);

          updateDoc(tweetRef, {
            retweets: arrayRemove({
              id: user.displayName,
            }),
          });
        } else {
          console.log('No such document!');
          setDoc(yourTweetsRef, {
            type: 'retweet',
            author: author,
            retweeter: user.displayName,
            id: id,
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
