import React from 'react';
import Tweet from './Tweet';
import { COMMENT } from '../helpers/types';
import CommentReplyingToTweet from './../../pages/Tweet/components/tweet/TweetInTweetStatus';

function Comment(props) {
  const { tweet, comment, inStatus } = props;

  return (
    <div className=" flex flex-col  pb-3 relative border-b border-gray-200 border-solid">
      <Tweet key={tweet.id} type={COMMENT} tweetData={tweet} tweetRef={tweet.ref} />
      {inStatus ? (
        <CommentReplyingToTweet
          key={comment.id}
          tweetData={comment}
          tweetRef={comment.ref}
        />
      ) : (
        <Tweet key={comment.id} tweetRef={comment.ref} tweetData={comment} />
      )}
    </div>
  );
}
export default Comment;
