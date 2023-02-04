/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Tweet from '../../../../common/components/Tweet';
import Comment from '../../../../common/components/Comment';
import useFetchTweets from '../../../../common/hooks/tweets/useFetchTweets';
import uniqid from 'uniqid';

const Media = ({ id }) => {
  const { tweets, getTweets } = useFetchTweets();

  useEffect(() => {
    getTweets(id);
  }, []);

  return tweets.map((tweet) => {
    if (tweet.type === 'comment') {
      if (tweet.comment.images.length > 0) {
        return (
          <div className=" flex flex-col border-b border-gray-500 border-solid p-3 relative">
            <Comment comment={tweet} key={uniqid()} />
          </div>
        );
      }
      return '';
    }
    if (tweet.images.length > 0) {
      return (
        <div className=" flex flex-col border-b border-gray-500 border-solid p-3 relative">
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
    }
    return '';
  });
};

export default Media;
