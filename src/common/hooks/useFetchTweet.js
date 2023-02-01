import { db } from '../../firebase/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import useFetchComment from './useFetchComment';
import { useState } from 'react';
import useFetchUsername from './useFetchUsername';

const useFetchTweet = () => {
  const [tweet, setTweet] = useState(null);
  const [, getCommentAndTweet] = useFetchComment();
  const { getUsername } = useFetchUsername();

  const getTweet = async (author, tweetID) => {
    const usersTweetsRef = doc(
      db,
      'users',
      `${author}`,
      'tweets',
      `${tweetID}`
    );

    return new Promise((resolve, reject) => {
      onSnapshot(usersTweetsRef, async (tweetSnapshot) => {
        if (tweetSnapshot.exists()) {
          const tweet = tweetSnapshot.data();

          if (tweet.type === 'comment') {
            const getCommentAndTweetInfo = {
              author: author,
              commentID: tweetID,
              type: 'comment',
            };
            setTweet(getCommentAndTweetInfo);
            resolve(getCommentAndTweetInfo);
            return tweet;
          }

          if (tweet.type === 'tweet') {
            getUsername(author).then((username) => {
              tweet.username = username;
              setTweet(tweet);
              resolve(tweet);
            });
            return tweet;
          }

          return tweet;
        } else {
          reject(new Error('Tweet might no longer exisit'));
        }
      });
    });
  };

  return { tweet, getTweet };
};

export default useFetchTweet;

// getCommentAndTweet(author, tweetID).then((comment) => {
//   setTweet(comment);
//   resolve(comment);
// });
