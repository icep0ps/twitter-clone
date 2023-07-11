import uniqid from 'uniqid';
import { useContext } from 'react';
import { doc, Timestamp } from 'firebase/firestore';

import Tweet from '../../classes/Tweet';
import Author from '../../classes/Author';
import AppContext from '../../../Context/AppContext';
import { db } from '../../../firebase/firebase-config';

const useCreateAndSendTweet = () => {
  const { user } = useContext(AppContext);
  const { displayName } = user;

  async function createAndSendTweet(username, usersTweet, setImages) {
    const TWEET_ID = uniqid();

    const tweetsRef = doc(db, 'users', `${displayName}`, 'tweets', `${TWEET_ID}`);

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
