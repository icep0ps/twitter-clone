/* eslint-disable react-hooks/exhaustive-deps */
import Tweet from '../../../common/components/Tweet';
import Comment from '../../../common/components/Comment';
import { UserContext } from '../../../Context/UserContext';
import React, { useEffect, useState, useContext } from 'react';
import useFetchFollowingTweets from './../../../common/hooks/userdata/useFetchFollowingTweets';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { tweets, comments, getFollowingTweets } = useFetchFollowingTweets();

  useEffect(() => {
    getFollowingTweets(user.displayName).then(() => {
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  }

  return (
    <div className="flex flex-col gap-3 relative ">
      {comments.map((commentAndTweet) => {
        const { tweet, comment, id } = commentAndTweet;
        return <Comment comment={comment} tweet={tweet} key={id} />;
      })}

      {tweets.map((tweet) => {
        const { id, author, ref, retweetedBy } = tweet;
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
              retweeter={retweetedBy}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tweets;
