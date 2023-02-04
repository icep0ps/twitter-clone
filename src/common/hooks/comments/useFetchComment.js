import { onSnapshot } from 'firebase/firestore';

const useFetchComment = () => {
  const getCommentAndTweet = async (tweetRef, commentRef) => {
    const tweet = await new Promise((resolve, reject) => {
      onSnapshot(tweetRef, (doc) => {
        resolve(doc.data());
      });
    });

    const comment = await new Promise((resolve, reject) => {
      onSnapshot(commentRef, (doc) => {
        resolve(doc.data());
      });
    });

    const results = await Promise.all([tweet, comment]);
    return {
      id: results[1].parentDocId,
      tweet: results[0],
      comment: results[1],
      type: 'comment',
    };
  };

  return [getCommentAndTweet];
};

export default useFetchComment;
