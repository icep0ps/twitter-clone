import uniqid from 'uniqid';
import { doc, Timestamp } from 'firebase/firestore';
import { UserContext } from '../../../Context/UserContext';
import { useContext } from 'react';
import { db } from '../../../firebase/firebase-config';
import Author from '../../classes/Author';
import Comment from '../../classes/Comment';

const useCreateAndSendComment = (parentTweetId) => {
  const { user } = useContext(UserContext);
  const { displayName } = user;

  async function createAndSendComment(
    username,
    usersTweet,
    setImages,
    parentTweetAuthor,
    parentTweetRef
  ) {
    const TWEET_ID = uniqid();

    const replyRef = doc(
      db,
      'users',
      `${user.displayName}`,
      'comments',
      `${TWEET_ID}`
    );

    const commentRef = doc(
      db,
      'users',
      `${parentTweetAuthor}`,
      'tweets',
      `${parentTweetId}`,
      'comments',
      `${TWEET_ID}`
    );

    const author = new Author(displayName, username);
    const images = await setImages(TWEET_ID);
    const comment = new Comment(
      TWEET_ID,
      usersTweet,
      author,
      Timestamp.now(),
      commentRef,
      images,
      parentTweetId,
      parentTweetAuthor
    );
    await comment.send(replyRef, parentTweetRef);
  }

  return { createAndSendComment };
};

export default useCreateAndSendComment;
