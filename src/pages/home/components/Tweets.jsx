/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import Tweet from '../../../common/components/Tweet';
import Comment from '../../../common/components/Comment';
import { UserContext } from '../../../Context/UserContext';
import useFetchFollowingTweets from './../../../common/hooks/userdata/useFetchFollowingTweets';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { tweets, comments, retweets, getFollowingTweets } = useFetchFollowingTweets();

  useEffect(() => {
    getFollowingTweets(user.displayName);
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  }

  return (
    <div className="flex flex-col gap-3 relative ">
      {[...comments.values()].map((commentAndTweet) => {
        const { tweet, comment, id } = commentAndTweet;
        return <Comment comment={comment} tweet={tweet} key={id} />;
      })}

      {[...tweets.values(), ...retweets].map((tweet) => {
        const { id, author, ref, retweeter } = tweet;
        return (
          <div
            className=" flex flex-col border-b border-gray-200 border-solid pb-3 relative"
            key={id}
          >
            <Tweet
              id={id}
              key={id}
              author={author}
              tweetRef={ref}
              tweetData={tweet}
              retweeter={retweeter}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tweets;
