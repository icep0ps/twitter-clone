/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Tweet from './Tweet';
import { COMMENT } from '../helpers/types';
import TweetInTweetStatus from './../../pages/Tweet/components/tweet/TweetInTweetStatus';

function Comment(props) {
  const { tweet, comment, inStatus } = props;

  return (
    <div className=" flex flex-col  border-gray-500 border-solid pb-3 relative">
      <Tweet
        id={tweet.id}
        key={tweet.id}
        type={COMMENT}
        author={tweet.author}
        tweetData={tweet}
      />
      {inStatus ? (
        <TweetInTweetStatus
          id={comment.id}
          key={comment.id}
          author={comment.author}
          tweetData={comment}
          parentTweet={comment.parentTweet}
        />
      ) : (
        <Tweet
          id={comment.id}
          key={comment.id}
          author={comment.author}
          tweetData={comment}
        />
      )}
    </div>
  );
}

export default Comment;
