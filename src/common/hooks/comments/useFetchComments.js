import { useState } from 'react';
import useFetchComment from './useFetchComment';
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function useFetchComments() {
  const [comments, setComments] = useState([]);
  const [getCommentAndTweet] = useFetchComment();

  const getComments = async (user_id) => {
    const commentsRefs = collection(db, 'users', `${user_id}`, 'comments');

    const commentsQueried = await getDocs(commentsRefs);
    commentsQueried.forEach(async (comment) => {
      const { parentTweetRef, commentRef } = comment.data();

      const tweetAndComment = await getCommentAndTweet(parentTweetRef, commentRef);
      setComments((prevState) => [...prevState, tweetAndComment]);
    });

    return comments;
  };

  return { getComments, comments };
}
export default useFetchComments;
