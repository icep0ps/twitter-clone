import React, { useEffect, useState, useContext } from 'react';
import Tweet from '../../../common/components/Tweet';
import { db } from '../../../firebase/firebase-config';
import Comment from '../../../common/components/Comment';
import { collection, getDocs } from 'firebase/firestore';
import { UserContext } from '../../../Context/UserContext';
import useFetchTweets from './../../../common/hooks/useFetchTweets';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { tweets, getTweets } = useFetchTweets();

  const getFollowingTweets = async (id) => {
    const userFollowingRef = collection(db, 'users', `${id}`, 'following');
    const usersFollowing = await getDocs(userFollowingRef);
    usersFollowing.forEach(async (person) => {
      const { id } = person;
      getTweets(id);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getFollowingTweets(user.displayName);
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  }
  return (
    <div className="flex flex-col gap-3 relative ">
      {tweets.map((tweet) => {
        if (tweet.type === 'comment') {
          return <Comment comment={tweet} key={tweet.comment.id} />;
        }
        return (
          <div
            className=" flex flex-col border-b border-gray-200 border-solid pb-3 relative"
            key={tweet.id}
          >
            <Tweet
              id={tweet.id}
              key={tweet.id}
              author={tweet.author}
              username={tweet.username}
              tweet={tweet.tweet.tweet}
              likes={tweet.likes}
              retweets={tweet.retweets}
              tweetInfomation={tweet}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tweets;
