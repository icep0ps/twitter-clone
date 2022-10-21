import Tweet from './Tweet';
import React from 'react';
import { COMMENT } from '../helpers/types';
import Reply from '../../pages/Tweet/components/tweet/Reply';

function ComposeTweet({ tweet }) {
  const { id, author, username, likes, retweets } = tweet;
  return (
    <div className="fixed rounded-2xl p-5 border-2 border-solid border-black bottom-0 right-0">
      <Tweet
        id={id}
        key={id}
        type={COMMENT}
        author={author}
        username={username}
        tweet={tweet.tweet}
        likes={likes}
        retweets={retweets}
        tweetInfomation={tweet}
      />
      <Reply id={id} username={username} author={author}></Reply>
    </div>
  );
}

export default ComposeTweet;
