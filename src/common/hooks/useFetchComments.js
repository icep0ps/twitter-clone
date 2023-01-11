import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, where, query } from 'firebase/firestore';

function useFetchComments() {
  const [comments, setComments] = useState([]);

  const getComments = async (user_id) => {
    const tweetRef = collection(db, 'users', `${user_id}`, 'tweets');
    const commentsQuery = query(tweetRef, where('type', '==', 'comment'));
    const commentsQueried = await getDocs(commentsQuery);
    const commentsCollection = [];
    commentsQueried.forEach(async (comment) => {
      const getCommentAndTweetInfo = {
        author: user_id,
        commentID: comment.data().id,
        type: 'comment',
      };
      commentsCollection.push(getCommentAndTweetInfo);
    });
    setComments(commentsCollection);
    return commentsCollection;
  };

  return { getComments, comments };
}
export default useFetchComments;
