/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import Tweet from '../../../common/components/Tweet';
import Comment from '../../../common/components/Comment';
import { UserContext } from '../../../Context/UserContext';
import useFetchFollowingTweets from './../../../common/hooks/userdata/useFetchFollowingTweets';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { tweets, comments, retweets, getFollowingTweets } =
    useFetchFollowingTweets();

  useEffect(() => {
    getFollowingTweets(user.displayName);
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  }

  return (
    <div className="flex flex-col gap-3 relative ">
      {[...comments].map((mapObject) => {
        const commentAndTweet = mapObject[1];
        return (
          <Comment
            comment={commentAndTweet.comment}
            tweet={commentAndTweet.tweet}
            key={commentAndTweet.id}
          />
        );
      })}

      {[...tweets, ...retweets].map((mapObject) => {
        const tweet = mapObject[1];
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
