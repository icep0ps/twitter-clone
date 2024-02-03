import useFetchTweets from '../tweets/useFetchTweets';
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const useFetchFollowingTweets = () => {
  const { tweets, comments, retweets, getTweets } = useFetchTweets();

  const getFollowingTweets = async (id) => {
    try {
      const userFollowingRef = collection(db, 'users', `${id}`, 'following');
      const usersFollowing = await getDocs(userFollowingRef);
      usersFollowing.forEach(async (person) => {
        const { id } = person;
        await getTweets(id).catch((error) => {
          throw new Error(`Error Fetching tweet:${id}` + error.message);
        });
      });
    } catch (error) {
      throw new Error('Error getting following tweets: ' + error.message);
    }
  };
  return { tweets, comments, retweets, getFollowingTweets };
};

export default useFetchFollowingTweets;
