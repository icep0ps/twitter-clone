import React, { useEffect, useState, useContext } from 'react';
import Tweet from './Tweet';
import { getDocs, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { UserContext } from '../../../Context/UserContext';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);

  const getTweets = async (id) => {
    const usersTweetsRef = collection(db, 'users', id, 'tweets');
    onSnapshot(usersTweetsRef, (tweet) => {
      console.log(usersTweetsRef);
      const tweetsCollection = [];
      tweet.forEach((tweet) => {
        tweetsCollection.push(Object.assign({ id: tweet.id }, tweet.data()));
      });
      setTweets(tweetsCollection);
    });
  };

  const getFollowingTweets = async () => {
    const userFollowingRef = collection(
      db,
      'users',
      `${user.uid}`,
      'following'
    );
    const data = await getDocs(userFollowingRef);
    data.forEach(async (person) => {
      await getTweets(person.id);
    });
  };

  useEffect(() => {
    getFollowingTweets();
    return () => {
      setTweets([]);
    };
  }, [user]);
  return (
    <div className="flex flex-col gap-3 relative ">
      {tweets.map((tweet) => {
        const { id, author, likes, retweets, username } = tweet;
        return (
          <Tweet
            id={id}
            author={author}
            tweet={tweet.tweet}
            username={username}
            likes={likes}
            retweets={retweets}
            tweetInfomation={tweet}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default Tweets;
