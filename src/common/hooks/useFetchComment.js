import { useState } from 'react';
import { COMMENT } from '../helpers/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import useFetchMainTweet from './useFetchMainTweet';
import useFetchUsername from './useFetchUsername';

const useFetchComment = () => {
  const { getUsername } = useFetchUsername();
  const [comment, setComment] = useState({});
  const { getMainTweet } = useFetchMainTweet();

  const getComment = async (userID, commentID) => {
    const userCommentRef = doc(
      db,
      'users',
      `${userID}`,
      'tweets',
      `${commentID}`
    );

    const userComment = await getDoc(userCommentRef);
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
      tweet = await getDoc(tmpRef);
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

    const response = await getDoc(commentRef);
    const replyingComment = response.data();
    const username = await getUsername(replyingComment.author);
    replyingComment.username = username;

    const mainTweetStructure = {
      type: COMMENT,
      tweet: tweet.data(),
      comment: replyingComment,
    };
    setComment(mainTweetStructure);
    return mainTweetStructure;
  };

  return [comment, getComment];
};

export default useFetchComment;
