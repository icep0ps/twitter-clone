import { COMMENT } from '../helpers/types';
import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import useFetchMainTweet from './useFetchMainTweet';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';

function useFetchFollowingTweets() {
  const [tweets, setTweets] = useState([]);
  const { getMainTweet } = useFetchMainTweet();

  const getTweets = async (user_id) => {
    const usersTweetsRef = collection(db, 'users', `${user_id}`, 'tweets');
    onSnapshot(usersTweetsRef, (doc) => {
      doc.forEach(async (tweet) => {
        setTweets((prevState) => prevState.concat(tweet.data()));
      });
    });
  };

  const getRetweets = async (user_id) => {
    const usersRetweetsRef = collection(db, 'users', `${user_id}`, 'retweets');
    onSnapshot(usersRetweetsRef, (docs) => {
      docs.forEach(async (tweet) => {
        const { author, id, retweeter } = tweet.data();
        const usersTweetsRef = doc(db, 'users', `${author}`, 'tweets', `${id}`);
        const data = await getDoc(usersTweetsRef);
        const retweet = Object.assign({ retweeter: retweeter }, data.data());
        setTweets((prevState) => prevState.concat(retweet));
      });
    });
  };

  const getComments = async (user_id) => {
    const tweetRef = collection(db, 'users', `${user_id}`, 'replies');
    onSnapshot(tweetRef, (replies) => {
      replies.forEach(async (reply) => {
        const { id, author, orignalPost } = reply.data();
        const commentRef = doc(
          db,
          'users',
          `${author}`,
          'tweets',
          `${orignalPost}`,
          'comments',
          `${id}`
        );
        const tweet = await getMainTweet(author, orignalPost);
        const comment = await getDoc(commentRef);
        setTweets((prev) => [
          ...prev,

          {
            type: COMMENT,
            tweet: tweet.data(),
            comment: comment.data(),
          },
        ]);
      });
    });
  };

  return { tweets, getTweets, getRetweets, getComments };
}

export default useFetchFollowingTweets;
