import { useState } from 'react';
import { COMMENT } from '../helpers/types';
import { doc, deleteDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import useFetchMainTweet from './useFetchMainTweet';
import useFetchUsername from './useFetchUsername';

const useFetchComment = () => {
  let commentRef;
  const { getUsername } = useFetchUsername();
  const { getMainTweet } = useFetchMainTweet();
  const [tweetStructure, setTweetStructure] = useState({
    type: COMMENT,
    tweet: null,
    comment: null,
  });

  const getComment = async (userID, commentID) => {
    const userCommentRef = doc(
      db,
      'users',
      `${userID}`,
      'tweets',
      `${commentID}`
    );
    const mianTweetRef = await getDoc(userCommentRef);
    const { author, orignalPost, id } = mianTweetRef.data();
    const usersTweetsRef = doc(
      db,
      'users',
      `${author}`,
      'tweets',
      `${orignalPost}`
    );

    const Tweet = await new Promise((resolve, reject) => {
      onSnapshot(usersTweetsRef, async (userComment) => {
        const mainTweet = await getMainTweet(author, orignalPost);
        commentRef = doc(
          db,
          'users',
          `${author}`,
          'tweets',
          `${orignalPost}`,
          'comments',
          `${id}`
        );
        setTweetStructure((prevState) => {
          return { ...prevState, tweet: mainTweet.data() };
        });
        resolve(userComment);
      });
    });

    const Comment = await new Promise((resolve, reject) => {
      onSnapshot(commentRef, async (response) => {
        if (response.exists()) {
          const replyingComment = response.data();
          const username = await getUsername(replyingComment.author);
          replyingComment.username = username;
          setTweetStructure((prevState) => {
            return { ...prevState, comment: replyingComment };
          });
          resolve(replyingComment);
        } else {
          deleteDoc(Tweet);
          resolve(null);
        }
      });
    });

    return Promise.all([Tweet, Comment]).then((res) => {
      return {
        type: COMMENT,
        tweet: res[0],
        comment: res[1],
      };
    });
  };

  return [tweetStructure, getComment];
};

export default useFetchComment;
