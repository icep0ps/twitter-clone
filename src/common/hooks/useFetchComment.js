import { useState } from 'react';
import { COMMENT } from '../helpers/types';
import { doc, deleteDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import useFetchMainTweet from './useFetchMainTweet';
import useFetchUsername from './useFetchUsername';

const useFetchComment = () => {
  const { getUsername } = useFetchUsername();
  const { getMainTweet } = useFetchMainTweet();

  const [TweetStructure, setTweetStructure] = useState({
    type: COMMENT,
    tweet: null,
    comment: null,
  });

  const getCommentAndTweet = async (tweetAuthor, commentID) => {
    const tweetInfomationRef = doc(
      db,
      'users',
      `${tweetAuthor}`,
      'tweets',
      `${commentID}`
    );

    console.log(tweetAuthor, commentID);
    const tweetSnapshot = await getDoc(tweetInfomationRef);
    const { author, orignalPost, id } = tweetSnapshot.data();
    const tweetRef = doc(db, 'users', `${author}`, 'tweets', `${orignalPost}`);

    const Tweet = await new Promise((resolve, reject) => {
      onSnapshot(tweetRef, async (tweet) => {
        const mainTweet = await getMainTweet(author, orignalPost);
        if (mainTweet) {
          setTweetStructure((prevState) => {
            return { ...prevState, tweet: mainTweet };
          });
          resolve(tweet.data());
        } else {
          reject(new Error('Tweet no longer exists'));
        }
      });
    });

    const Comment = await new Promise((resolve, reject) => {
      let commentRef = doc(
        db,
        'users',
        `${author}`,
        'tweets',
        `${orignalPost}`,
        'comments',
        `${id}`
      );
      onSnapshot(commentRef, async (commentSnapshot) => {
        if (commentSnapshot.exists()) {
          const comment = commentSnapshot.data();
          const username = await getUsername(comment.author);
          comment.username = username;
          setTweetStructure((prevState) => {
            return { ...prevState, comment: comment };
          });
          resolve(comment);
        } else {
          deleteDoc(Tweet);
          reject(new Error('Tweet no longer exists'));
        }
      });
    });

    return Promise.all([Tweet, Comment]).then((responses) => {
      return {
        type: COMMENT,
        tweet: responses[0],
        comment: responses[1],
      };
    });
  };

  return [TweetStructure, getCommentAndTweet];
};

export default useFetchComment;
