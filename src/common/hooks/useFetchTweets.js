import { useState } from 'react';
import useFetchComment from './useFetchComment';
import { db } from '../../firebase/firebase-config';
import useFetchRetweet from './useFetchRetweet';
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
  const { getRetweet } = useFetchRetweet();
  const [, getCommentAndTweet] = useFetchComment();

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
      const commentAndTweet = await getCommentAndTweet(
        userId,
        comment.data().id
      );
      commentsCollection.push(commentAndTweet);
    });
    setComments(commentsCollection);

    const retweets = await getDocs(retweetsQuery);
    const retweetsCollection = [];
    retweets.forEach(async (retweet) => {
      const retweetReturned = await getRetweet(userId, retweet.data().id);
      retweetsCollection.push(retweetReturned);
    });
    setRetweets(retweetsCollection);

    return tweets;
  }

  return { tweets, comments, retweets, getTweets };
};

export default useFetchTweets;
