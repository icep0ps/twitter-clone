import { useState } from 'react';
import { COMMENT } from '../helpers/types';
import { db } from '../../firebase/firebase-config';
import { doc, collection, onSnapshot, getDoc } from 'firebase/firestore';
import useFetchMainTweet from './useFetchMainTweet';

function useFetchComments() {
  const [comments, setComments] = useState([]);
  const { getMainTweet } = useFetchMainTweet();

  const getComments = async (user_id) => {
    const tweetRef = collection(db, 'users', `${user_id}`, 'tweets');
    onSnapshot(tweetRef, (replies) => {
      replies.forEach(async (reply) => {
        if (reply.data().type === 'comment') {
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

          setComments((prev) => [
            ...prev,

            {
              type: COMMENT,
              tweet: tweet.data(),
              comment: comment.data(),
            },
          ]);
        }
      });
    });
  };

  return { getComments, comments };
}
export default useFetchComments;
