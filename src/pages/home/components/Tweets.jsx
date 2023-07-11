/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';

import Tweet from '../../../common/components/Tweet';
import AppContext from '../../../Context/AppContext';
import Comment from '../../../common/components/Comment';
import useFetchFollowingTweets from './../../../common/hooks/userdata/useFetchFollowingTweets';

const Tweets = () => {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const { tweets, comments, getFollowingTweets } = useFetchFollowingTweets();

  useEffect(() => {
    getFollowingTweets(user.displayName).then(() => {
      setIsLoading(false);
    });
  }, []);

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
        const { id, ref } = tweet;
        return (
          <div
            className=" flex flex-col border-b border-gray-200 border-solid pb-3 relative"
            key={id}
          >
            <Tweet key={id} tweetData={tweet} tweetRef={ref} />
          </div>
        );
      })}
    </div>
  );
};

export default Tweets;
