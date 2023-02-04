import { useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import useFetchComment from './../comments/useFetchComment';

const useFetchTweets = () => {
  let isInitialFetch = true;
  const [getCommentAndTweet] = useFetchComment();
  const [tweets, setTweets] = useState(new Map());
  const [comments, setComments] = useState(new Map());
  const [retweets, setRetweets] = useState([]);

  async function getTweets(userId) {
    const usersTweetsRef = collection(db, 'users', `${userId}`, 'tweets');
    const tweetsQuery = query(usersTweetsRef, where('type', '==', 'tweet'));
    const retweetsQuery = query(usersTweetsRef, where('type', '==', 'retweet'));
    const commentsQuery = query(usersTweetsRef, where('type', '==', 'comment'));

    onSnapshot(tweetsQuery, (docs) => {
      docs.forEach((tweet) => {
        const tweetData = tweet.data();
        setTweets(new Map(tweets.set(tweetData.id, tweetData)));
      });
    });

    const userComments = await getDocs(commentsQuery);
    userComments.forEach(async (comment) => {
      const commentRef = comment.data().commentRef;
      const tweetRef = comment.data().parentTweetRef;

      onSnapshot(commentRef, async () => {
        const tweetAndComment = await getCommentAndTweet(tweetRef, commentRef);
        setComments(new Map(comments.set(tweetAndComment.id, tweetAndComment)));
      });

      onSnapshot(tweetRef, async () => {
        if (isInitialFetch) {
          isInitialFetch = false;
          return;
        }
        const tweetAndComment = await getCommentAndTweet(tweetRef, commentRef);
        setComments(new Map(comments.set(tweetAndComment.id, tweetAndComment)));
      });
    });

    const retweets = await getDocs(retweetsQuery);
    const retweetsCollection = [];
    retweets.forEach(async (retweet) => {
      const retweetReturned = retweet.data();
      retweetsCollection.push(retweetReturned);
    });
    setRetweets((prevState) => prevState.concat(retweetsCollection));

    return tweets;
  }

  return { tweets, comments, retweets, getTweets };
};

export default useFetchTweets;
