import { db } from '../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const useFetchMainTweet = () => {
  const getMainTweet = async (user_id, tweet_id) => {
    const usersTweetsRef = doc(
      db,
      'users',
      `${user_id}`,
      'tweets',
      `${tweet_id}`
    );
    return getDoc(usersTweetsRef);
  };

  return { getMainTweet };
};

export default useFetchMainTweet;
