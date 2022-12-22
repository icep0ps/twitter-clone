/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Tweet from '../../../../common/components/Tweet';
import Comment from '../../../../common/components/Comment';
import useFetchTweets from '../../../../common/hooks/useFetchTweets';
import uniqid from 'uniqid';

const TweetsAndReplies = ({ id }) => {
  const { tweets, getTweets } = useFetchTweets();

  useEffect(() => {
    getTweets(id);
  }, [id]);

  return tweets.map((tweet) => {
    if (tweet) {
      return (
        <div className=" flex flex-col border-b border-gray-500 border-solid p-3 relative">
          {tweet.type === 'comment' ? (
            <Comment comment={tweet} key={uniqid()} />
          ) : (
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
          )}
        </div>
      );
    }
  });
};

export default TweetsAndReplies;
