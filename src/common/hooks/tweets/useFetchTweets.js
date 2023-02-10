import { useState } from 'react';
import Tweet from './../../classes/Tweet';
import Author from '../../classes/Author';
import Retweet from '../../classes/Retweet';
import { COMMENT } from '../../helpers/types';
import { db } from '../../../firebase/firebase-config';
import useFetchComment from './../comments/useFetchComment';
import { collection, getDocs, getDoc } from 'firebase/firestore';

const useFetchTweets = () => {
  const [getCommentAndTweet] = useFetchComment();
  const [tweets, setTweets] = useState([]);
  const [comments, setComments] = useState([]);

  async function getTweets(userId) {
    const tweetsQuery = collection(db, 'users', `${userId}`, 'tweets');
    const retweetsQuery = collection(db, 'users', `${userId}`, 'retweets');
    const commentsQuery = collection(db, 'users', `${userId}`, 'comments');

    const tweets = await getDocs(tweetsQuery);
    const tweetsCollection = [];
    tweets.forEach((tweetSnpshot) => {
      const tweetDoc = tweetSnpshot.data();
      const { id, author, tweet, date, images, ref } = tweetDoc;
      const { id: AuthorId, username } = author;
      const constructAuthor = new Author(AuthorId, username);
      const constructedTweet = new Tweet(id, tweet, constructAuthor, date, ref, images);
      tweetsCollection.push(constructedTweet);
    });
    setTweets(tweetsCollection);

    const userComments = await getDocs(commentsQuery);
    userComments.forEach(async (comment) => {
      const commentRef = comment.data().commentRef;
      const tweetRef = comment.data().parentTweetRef;
      const tweetAndComment = await getCommentAndTweet(tweetRef, commentRef);
      setComments((prevState) => [...prevState, tweetAndComment]);
    });

    const retweets = await getDocs(retweetsQuery);
    retweets.forEach(async (retweet) => {
      const { ref: originalTweetRef, type } = retweet.data();
      const tweetData = await getDoc(originalTweetRef);

      if (type === COMMENT) {
        const { id, author, tweet, date, images, ref, parentTweet, replyingTo } =
          tweetData.data();
        const { id: AuthorId, username } = author;
        const constructAuthor = new Author(AuthorId, username);
        const constructedTweet = new Retweet(
          id,
          tweet,
          constructAuthor,
          date,
          ref,
          images,
          parentTweet,
          replyingTo,
          userId
        );
        setTweets((prevState) => prevState.concat(constructedTweet));
      } else {
        const { id, author, tweet, date, images, ref } = tweetData.data();
        const { id: AuthorId, username } = author;
        const constructAuthor = new Author(AuthorId, username);
        const constructedTweet = new Retweet(
          id,
          tweet,
          constructAuthor,
          date,
          ref,
          images,
          undefined,
          undefined,
          userId
        );
        setTweets((prevState) => prevState.concat(constructedTweet));
      }
    });

    return tweets;
  }

  return { tweets, comments, getTweets };
};

export default useFetchTweets;
