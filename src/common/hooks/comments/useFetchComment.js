import { getDoc } from 'firebase/firestore';
import Tweet from '../../classes/Tweet';
import Comment from '../../classes/Comment';
import Author from '../../classes/Author';

const useFetchComment = () => {
  const getCommentAndTweet = async (tweetRef, commentRef) => {
    const tweet = await (async () => {
      const tweetSnapshot = await getDoc(tweetRef);
      const tweetData = tweetSnapshot.data();
      const { id, author, tweet, date, images, ref } = tweetData;
      const { id: AuthorId, username } = author;
      const constructAuthor = new Author(AuthorId, username);
      const constructTweet = new Tweet(id, tweet, constructAuthor, date, ref, images);
      return constructTweet;
    })();

    const comment = await (async () => {
      const commentSnapshot = await getDoc(commentRef);
      const coommentData = commentSnapshot.data();
      const { id, author, tweet, date, images, ref, parentTweet, replyingTo } =
        coommentData;
      const { id: AuthorId, username } = author;
      const constructAuthor = new Author(AuthorId, username);
      const constructComment = new Comment(
        id,
        tweet,
        constructAuthor,
        date,
        ref,
        images,
        parentTweet,
        replyingTo
      );

      return constructComment;
    })();

    return {
      id: comment.parentTweet,
      tweet: tweet,
      comment: comment,
      type: 'comment',
    };
  };

  return [getCommentAndTweet];
};

export default useFetchComment;
