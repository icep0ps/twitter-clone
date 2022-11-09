import { useState } from 'react';
import { COMMENT } from '../helpers/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import useFetchMainTweet from './useFetchMainTweet';

const useFetchComment = () => {
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
    const tweet = await getMainTweet(author, orignalPost);
    const commentRef = doc(
      db,
      'users',
      `${author}`,
      'tweets',
      `${orignalPost}`,
      'comments',
      `${id}`
    );
    const finalComment = await getDoc(commentRef);
    const mainTweetStructure = {
      type: COMMENT,
      tweet: tweet.data(),
      comment: finalComment.data(),
    };
    setComment(mainTweetStructure);
    return mainTweetStructure;
  };

  return [comment, getComment];
};

export default useFetchComment;
