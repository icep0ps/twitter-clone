import { useContext } from 'react';
import { db } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

function useRetweet(tweetRef, tweetInfomation) {
  const { id, author } = tweetInfomation;
  const { user } = useContext(UserContext);

  const retweet = async () => {
    await updateDoc(tweetRef, {
      retweets: arrayUnion({
        id: user.displayName,
      }),
    });

    const yourTweetsRef = doc(
      db,
      'users',
      `${user.displayName}`,
      'tweets',
      `${id}`
    );
    await setDoc(yourTweetsRef, {
      type: 'retweet',
      author: author,
      retweeter: user.displayName,
      id: id,
    });
  };
  return { retweet };
}

export default useRetweet;
