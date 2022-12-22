import { useState, useEffect } from 'react';
import { COMMENT } from '../helpers/types';
import { doc, getDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import useFetchMainTweet from './useFetchMainTweet';
import useFetchUsername from './useFetchUsername';

//TODO : find a way to re render this component

const useFetchComment = () => {
  const { getUsername } = useFetchUsername();
  const [comment, setComment] = useState({});
  const { mainTweet, getMainTweet } = useFetchMainTweet();

  const getComment = async (userID, commentID) => {
    const userCommentRef = doc(
      db,
      'users',
      `${userID}`,
      'tweets',
      `${commentID}`
    );

    const userComment = await new Promise((resolve, reject) => {
      onSnapshot(userCommentRef, (doc) => {
        resolve(doc);
      });
    });
    const { author, orignalPost, id } = userComment.data();
    let tweet = await getMainTweet(author, orignalPost);

    while (tweet.data()?.orignalPost) {
      const tmpRef = doc(
        db,
        'users',
        `${tweet.data().author}`,
        'tweets',
        `${tweet.data().orignalPost}`,
        'comments',
        `${tweet.data().id}`
      );
      tweet = await new Promise((resolve, reject) => {
        onSnapshot(tmpRef, (doc) => {
          resolve(doc);
        });
      });
    }
    const commentRef = doc(
      db,
      'users',
      `${author}`,
      'tweets',
      `${orignalPost}`,
      'comments',
      `${id}`
    );

    return await new Promise((resolve, reject) => {
      onSnapshot(commentRef, async (response) => {
        if (response.exists()) {
          const replyingComment = response.data();
          const username = await getUsername(replyingComment.author);
          replyingComment.username = username;
          const mainTweetStructure = {
            type: COMMENT,
            tweet: tweet.data(),
            comment: replyingComment,
          };
          setComment(mainTweetStructure);
          resolve(mainTweetStructure);
        }

        deleteDoc(userComment);
        resolve(null);
      });
    });
  };

  return [comment, getComment];
};

export default useFetchComment;
