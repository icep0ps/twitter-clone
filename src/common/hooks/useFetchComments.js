import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { useState } from 'react';
import useFetchComment from './useFetchComment';
import { db } from '../../firebase/firebase-config';

function useFetchComments() {
  let isInitialFetch = true;
  const [comments, setComments] = useState(new Map());
  const [getCommentAndTweet] = useFetchComment();

  const getComments = async (user_id) => {
    const tweetRefs = collection(db, 'users', `${user_id}`, 'tweets');
    const commentsQuery = query(tweetRefs, where('type', '==', 'comment'));

    const commentsQueried = await getDocs(commentsQuery);
    commentsQueried.forEach(async (comment) => {
      const { parentTweetRef, commentRef } = comment.data();

      onSnapshot(commentRef, async () => {
        const tweetAndComment = await getCommentAndTweet(
          parentTweetRef,
          commentRef
        );
        setComments(new Map(comments.set(tweetAndComment.id, tweetAndComment)));
      });

      onSnapshot(parentTweetRef, async () => {
        if (isInitialFetch) {
          isInitialFetch = false;
          return;
        }
        const tweetAndComment = await getCommentAndTweet(
          parentTweetRef,
          commentRef
        );
        setComments(new Map(comments.set(tweetAndComment.id, tweetAndComment)));
      });
    });

    return comments;
  };

  return { getComments, comments };
}
export default useFetchComments;
