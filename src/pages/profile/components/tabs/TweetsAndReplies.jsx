/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Tweet from '../../../../common/components/Tweet';
import Comment from '../../../../common/components/Comment';
import useFetchTweets from '../../../../common/hooks/useFetchTweets';
import useFetchComments from '../../../../common/hooks/useFetchComments';
import uniqid from 'uniqid';
import { useState } from 'react';

const TweetsAndReplies = ({ id }) => {
  const { getComments, comments } = useFetchComments();
  const { tweets, getTweets } = useFetchTweets();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    Promise.all([getTweets(id), getComments(id)]).then(() =>
      setIsloading(false)
    );
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return [...tweets, ...comments].map((tweet) => {
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
              likes={tweet.likes}
              retweets={tweet.retweets}
              tweetInfomation={tweet}
            />
          )}
        </div>
      );
    }
    return '';
  });
};

export default TweetsAndReplies;
