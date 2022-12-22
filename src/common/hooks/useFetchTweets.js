import { useState } from 'react';
import useFetchComment from './useFetchComment';
import useFetchUsername from './useFetchUsername';
import { db } from '../../firebase/firebase-config';
import useFetchRetweet from './useFetchRetweet';
import { collection, onSnapshot } from 'firebase/firestore';

const useFetchTweets = () => {
  const [tweets, setTweets] = useState([]);
  const { getRetweet } = useFetchRetweet();
  const { getUsername } = useFetchUsername();
  const [comment, getComment] = useFetchComment();

  async function getTweets(userId) {
    const usersTweetsRef = collection(db, 'users', `${userId}`, 'tweets');

    onSnapshot(usersTweetsRef, (doc) => {
      const tweetsCollection = [];
      doc.forEach(async (tweet) => {
        switch (tweet.data().type) {
          case 'comment':
            const comment = await getComment(userId, tweet.data().id);
            tweetsCollection.push(comment);
            break;

          case 'tweet':
            const tweetData = tweet.data();
            const usernameData = await getUsername(tweetData.author);
            tweetData.username = usernameData;
            tweetsCollection.push(tweetData);
            break;

          case 'retweet':
            const retweet = await getRetweet(userId, tweet.data().id);
            tweetsCollection.push(retweet);
            break;
          default:
            return;
        }
      });
      console.log(tweetsCollection);
      setTweets(tweetsCollection);
    });
    return tweets;
  }

  return { tweets, getTweets };
};

export default useFetchTweets;
