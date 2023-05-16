/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Tweet from './Tweet';
import { COMMENT } from '../helpers/types';
import TweetInTweetStatus from './../../pages/Tweet/components/tweet/TweetInTweetStatus';

function Comment({ tweet, comment, inStatus }) {
  return (
    <div className=" flex flex-col  pb-3 relative border-b border-gray-200 border-solid">
      <Tweet
        id={tweet.id}
        key={tweet.id}
        type={COMMENT}
        author={tweet.author}
        tweetRef={tweet.ref}
        tweetData={tweet}
        retweeter={tweet.retweeter}
      />
      {inStatus ? (
        <TweetInTweetStatus
          id={comment.id}
          key={comment.id}
          author={comment.author}
          tweetData={comment}
          tweetRef={tweet.ref}
          parentTweet={comment.parentTweet}
        />
      ) : (
        <Tweet
          id={comment.id}
          key={comment.id}
          tweetRef={comment.ref}
          author={comment.author}
          tweetData={comment}
          retweeter={comment.retweeter}
        />
      )}
    </div>
  );
}
export default Comment;
