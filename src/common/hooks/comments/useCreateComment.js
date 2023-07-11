import uniqid from 'uniqid';
import { useContext } from 'react';
import { doc, Timestamp } from 'firebase/firestore';

import Author from '../../classes/Author';
import Comment from '../../classes/Comment';
import { db } from '../../../firebase/firebase-config';
import AppContext from '../../../Context/AppContext';

const useCreateAndSendComment = () => {
  const { user } = useContext(AppContext);
  const { displayName, username } = user;

  async function createAndSendComment(
    usersTweet,
    setImages,
    parentTweetAuthor,
    parentTweetRef
  ) {
    const tweetId = uniqid();

    const replyRef = doc(db, 'users', `${displayName}`, 'comments', `${tweetId}`);
    const commentRef = doc(db, parentTweetRef.path + `/comments/${tweetId}`);

    const author = new Author(displayName, username);
    const images = await setImages(tweetId);
    const comment = new Comment(
      tweetId,
      usersTweet,
      author,
      Timestamp.now(),
      commentRef,
      images,
      parentTweetRef,
      parentTweetAuthor
    );

    await comment.send(replyRef, parentTweetRef);
  }

  return { createAndSendComment };
};

export default useCreateAndSendComment;
