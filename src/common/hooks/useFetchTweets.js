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

  function getTweets(userId) {
    const usersTweetsRef = collection(db, 'users', `${userId}`, 'tweets');

    onSnapshot(usersTweetsRef, (doc) => {
      doc.forEach(async (tweet) => {
        console.log(tweet.data().type);
        switch (tweet.data().type) {
          case 'comment':
            const comment = await getComment(userId, tweet.data().id);
            setTweets((prevState) => prevState.concat(comment));
            return comment;

          case 'tweet':
            const tweetData = tweet.data();
            const usernameData = await getUsername(tweetData.author);
            tweetData.username = usernameData;
            setTweets((prevState) => prevState.concat(tweetData));
            return tweet.data();

          case 'retweet':
            const retweet = await getRetweet(userId, tweet.data().id);
            setTweets((prevState) => prevState.concat(retweet));
            console.log(retweet);
            break;
          default:
            return;
        }
      });
    });
  }

  return { tweets, getTweets };
};

export default useFetchTweets;
