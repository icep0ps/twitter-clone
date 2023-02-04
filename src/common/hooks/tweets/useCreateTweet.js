import uniqid from 'uniqid';
import { doc, Timestamp } from 'firebase/firestore';
import { UserContext } from '../../../Context/UserContext';
import { useContext } from 'react';
import { db } from '../../../firebase/firebase-config';
import Author from '../../classes/Author';
import Tweet from '../../classes/Tweet';

const useCreateAndSendTweet = () => {
  const { user } = useContext(UserContext);
  const { displayName } = user;

  async function createAndSendTweet(username, usersTweet, setImages) {
    const TWEET_ID = uniqid();

    const tweetsRef = doc(
      db,
      'users',
      `${displayName}`,
      'tweets',
      `${TWEET_ID}`
    );

    const author = new Author(displayName, username);
    const images = await setImages(TWEET_ID);
    const tweet = new Tweet(
      TWEET_ID,
      usersTweet,
      author,
      Timestamp.now(),
      tweetsRef,
      images
    );
    await tweet.send();
  }

  return { createAndSendTweet };
};

export default useCreateAndSendTweet;
