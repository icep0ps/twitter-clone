import Tweet from '../../../common/Tweet';
import React, { useEffect, useContext, useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import { UserContext } from '../../../Context/UserContext';
import { getDocs, onSnapshot, collection, doc } from 'firebase/firestore';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTweets = async (user_id) => {
    const usersTweetsRef = collection(db, 'users', `${user_id}`, 'tweets');

    onSnapshot(usersTweetsRef, (querySnapshot) => {
      const tweetsCollection = [];
      querySnapshot.forEach(async (tweet) => {
        const tweetInformation = tweet.data();
        const { type, retweeter } = tweetInformation;
        type === 'retweet'
          ? getRetweets(tweetInformation, retweeter)
          : tweetsCollection.push(tweetInformation);
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
      `${tweet.tweetID}`
    );
    onSnapshot(tweetRef, (querySnapshot) => {
      const tweet = querySnapshot.data();
      const { id } = tweet;
      const retweet = Object.assign({ retweetedBy: retweeter }, tweet);
      setRetweets((prev) => {
        if (prev) {
          const updated = prev.filter((tweet) => tweet.id !== id);
          return updated.concat(retweet);
        } else {
          return retweets.concat(retweet);
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
        {tweets.concat(retweets).map((tweet) => {
          const { id, author, likes, retweets, username } = tweet;
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
