import { useState } from 'react';
import Author from '../../classes/Author';
import { db } from '../../../firebase/firebase-config';
import { onSnapshot, collection } from 'firebase/firestore';
import Comment from '../../classes/Comment';

function useFetchTweetComments(setIsLoading) {
  const [comments, setComments] = useState([]);

  async function getComments(tweetRef) {
    const commentsRef = collection(db, tweetRef.path + '/comments');
    console.log(commentsRef);
    onSnapshot(commentsRef, (comments) => {
      const commentsCollection = [];
      comments.forEach((comment) => {
        const { id, tweet, author, date, ref, images, parentTweet, replyingTo } =
          comment.data();
        const constructAtuhor = new Author(author.id, author.username);
        const constructComment = new Comment(
          id,
          tweet,
          constructAtuhor,
          date,
          ref,
          images,
          parentTweet,
          replyingTo
        );
        commentsCollection.push(constructComment);
      });

      setComments(commentsCollection);
    });
    setIsLoading(false);
  }

  return [comments, getComments];
}
export default useFetchTweetComments;
