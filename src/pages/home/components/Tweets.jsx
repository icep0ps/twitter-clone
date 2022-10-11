import Tweet from '../../../common/Tweet';
import React, { useEffect, useContext, useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import { UserContext } from '../../../Context/UserContext';
import { getDocs, onSnapshot, collection, doc } from 'firebase/firestore';

const Tweets = () => {
  const { user, tweets, setTweets } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const getTweets = async (user_id) => {
    const usersTweetsRef = collection(db, 'users', `${user_id}`, 'tweets');

    onSnapshot(usersTweetsRef, (doc) => {
      const tweetsCollection = [];
      doc.forEach(async (tweet) => {
        const tweetInformation = tweet.data();
        const { type, retweeter } = tweetInformation;
        switch (type) {
          case 'retweet':
            console.log('this is a retweet', tweetInformation);
            getRetweets(tweetInformation, retweeter);
            break;
          case 'tweet':
            console.log('this is a tweet');
            tweetsCollection.push(tweetInformation);
            break;
          case 'comment':
            getComments(tweetInformation, retweeter);
            console.log('this is a comment');
            break;
          default:
            return;
        }
        setTweets(tweetsCollection);
        setIsLoading(false);
      });
    });
  };

  const getRetweets = async (tweet, retweeter) => {
    const tweetRef = doc(
      db,
      'users',
      `${tweet.author}`,
      'tweets',
      `${tweet.id}`
    );
    onSnapshot(tweetRef, (doc) => {
      const tweet = doc.data();
      console.log(tweet, tweetRef);
      const { id } = tweet;
      const retweet = Object.assign({ retweetedBy: retweeter }, tweet);
      setTweets((prev) => {
        if (prev) {
          const updated = prev.filter((tweet) => tweet.id !== id);
          return updated.concat(retweet);
        } else {
          return tweets.concat(retweet);
        }
      });
    });
  };

  const getComments = async (tweet, retweeter) => {
    const tweetRef = doc(
      db,
      'users',
      `${tweet.author}`,
      'tweets',
      `${tweet.id}`
    );
    onSnapshot(tweetRef, (doc) => {
      const tweet = doc.data();
      const { id } = tweet;
      const retweet = Object.assign({ retweetedBy: retweeter }, tweet);
      setTweets((prev) => {
        if (prev) {
          const updated = prev.filter((tweet) => tweet.id !== id);
          return updated.concat(retweet);
        } else {
          return tweets.concat(retweet);
        }
      });
    });
  };

  const getFollowingTweets = async () => {
    const userFollowingRef = collection(
      db,
      'users',
      `${user.uid}`,
      'following'
    );
    const following = await getDocs(userFollowingRef);
    following.forEach(async (person) => {
      await getTweets(person.id);
    });
  };

  useEffect(() => {
    getFollowingTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  } else {
    return (
      <div className="flex flex-col gap-3 relative ">
        {tweets.map((tweet) => {
          const { id, author, likes, retweets, username } = tweet;
          console.log(tweet);
          return (
            <Tweet
              id={id}
              key={id}
              author={author}
              username={username}
              tweet={tweet.tweet}
              likes={likes}
              retweets={retweets}
              tweetInfomation={tweet}
            />
          );
        })}
      </div>
    );
  }
};

export default Tweets;
