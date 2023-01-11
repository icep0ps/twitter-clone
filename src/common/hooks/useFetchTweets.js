import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const useFetchTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [comments, setComments] = useState([]);
  const [retweets, setRetweets] = useState([]);

  async function getTweets(userId) {
    const usersTweetsRef = collection(db, 'users', `${userId}`, 'tweets');
    const tweetsQuery = query(usersTweetsRef, where('type', '==', 'tweet'));
    const retweetsQuery = query(usersTweetsRef, where('type', '==', 'retweet'));
    const commentsQuery = query(usersTweetsRef, where('type', '==', 'comment'));

    onSnapshot(tweetsQuery, (docs) => {
      const tweetsCollection = [];
      docs.forEach((tweet) => {
        const tweetData = tweet.data();
        tweetsCollection.push(tweetData);
      });
      setTweets(tweetsCollection);
    });

    const userComments = await getDocs(commentsQuery);
    const commentsCollection = [];
    userComments.forEach(async (comment) => {
      const getCommentAndTweetInfo = {
        author: userId,
        commentID: comment.data().id,
      };
      commentsCollection.push(getCommentAndTweetInfo);
    });
    setComments(commentsCollection);

    const retweets = await getDocs(retweetsQuery);
    const retweetsCollection = [];
    retweets.forEach(async (retweet) => {
      const retweetReturned = retweet.data();
      retweetsCollection.push(retweetReturned);
    });
    setRetweets(retweetsCollection);

    return tweets;
  }

  return { tweets, comments, retweets, getTweets };
};

export default useFetchTweets;
