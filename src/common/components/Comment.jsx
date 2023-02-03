/* eslint-disable react-hooks/exhaustive-deps */
import Tweet from './Tweet';
import React from 'react';
import { COMMENT } from '../helpers/types';
import { default as TweetInTweetStatus } from './../../pages/Tweet/components/tweet/Tweet';

function Comment(props) {
  const { tweet, comment, inTweetStatus } = props;

  return (
    <div className=" flex flex-col  border-gray-500 border-solid pb-3 relative">
      <Tweet
        id={tweet.id}
        key={tweet.id}
        type={COMMENT}
        author={tweet.author}
        username={tweet.username}
        tweet={tweet.tweet}
        likes={tweet.likes}
        retweets={tweet.retweets}
        tweetInfomation={tweet}
      />
      {inTweetStatus ? (
        <TweetInTweetStatus
          id={comment.id}
          key={comment.id}
          author={comment.author}
          username={comment.username}
          tweet={comment.tweet}
          likes={comment.likes}
          retweets={comment.retweets}
          tweetInfomation={comment}
        />
      ) : (
        <Tweet
          id={comment.id}
          key={comment.id}
          author={comment.author}
          username={comment.username}
          tweet={comment.tweet}
          likes={comment.likes}
          retweets={comment.retweets}
          tweetInfomation={comment}
        />
      )}
    </div>
  );
}

export default Comment;
