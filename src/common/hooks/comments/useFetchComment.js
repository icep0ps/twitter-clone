import { onSnapshot } from 'firebase/firestore';
import Tweet from '../../classes/Tweet';
import Comment from '../../classes/Comment';
import Author from '../../classes/Author';

const useFetchComment = () => {
  const getCommentAndTweet = async (tweetRef, commentRef) => {
    const tweet = await new Promise((resolve, reject) => {
      onSnapshot(tweetRef, (doc) => {
        const tweetData = doc.data();
        const { id, author, tweet, date, images, ref } = tweetData;
        const { id: AuthorId, username } = author;
        const constructAuthor = new Author(AuthorId, username);
        const constructTweet = new Tweet(id, tweet, constructAuthor, date, ref, images);
        resolve(constructTweet);
      });
    });

    const comment = await new Promise((resolve, reject) => {
      onSnapshot(commentRef, (doc) => {
        const coommentData = doc.data();
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
        resolve(constructComment);
      });
    });

    const results = await Promise.all([tweet, comment]);

    return {
      id: results[1].parentTweet,
      tweet: results[0],
      comment: results[1],
      type: 'comment',
    };
  };

  return [getCommentAndTweet];
};

export default useFetchComment;
