/* eslint-disable react-hooks/exhaustive-deps */
import Tweet from './Tweet';
import { COMMENT } from '../helpers/types';
import React, { useEffect } from 'react';

import { default as TweetInTweetStatus } from './../../pages/Tweet/components/tweet/Tweet';

function Comment(props) {
  const { tweet, inTweetStatus } = props;

  useEffect(() => {}, [tweet]);

  return (
    <div className=" flex flex-col  border-gray-500 border-solid pb-3 relative">
      <Tweet
        id={tweet.tweet.id}
        key={tweet.tweet.id}
        type={COMMENT}
        author={tweet.tweet.author}
        username={tweet.tweet.username}
        tweet={tweet.tweet.tweet}
        likes={tweet.tweet.likes}
        retweets={tweet.tweet.retweets}
        tweetInfomation={tweet.tweet}
      />
      {inTweetStatus ? (
        <TweetInTweetStatus
          id={tweet.comment.id}
          key={tweet.comment.id}
          author={tweet.comment.author}
          username={tweet.comment.username}
          tweet={tweet.comment.tweet}
          likes={tweet.comment.likes}
          retweets={tweet.comment.retweets}
          tweetInfomation={tweet.comment}
        />
      ) : (
        <Tweet
          id={tweet.comment.id}
          key={tweet.comment.id}
          author={tweet.comment.author}
          username={tweet.comment.username}
          tweet={tweet.comment.tweet}
          likes={tweet.comment.likes}
          retweets={tweet.comment.retweets}
          tweetInfomation={tweet.comment}
        />
      )}
    </div>
  );
}

export default Comment;
