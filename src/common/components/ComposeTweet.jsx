import Tweet from './Tweet';
import React from 'react';
import { COMMENT } from '../helpers/types';
import Reply from '../../pages/Tweet/components/tweet/Reply';

function ComposeTweet({ tweet }) {
  return (
    <div className="fixed rounded-2xl p-5 border-2 border-solid border-black bottom-0 right-0">
      <Tweet
        id={tweet.id}
        key={tweet.id}
        type={COMMENT}
        author={tweet.author}
        username={tweet.username}
        tweet={tweet.tweet.tweet}
        likes={tweet.likes}
        retweets={tweet.retweets}
        tweetInfomation={tweet}
      />
      <Reply></Reply>
    </div>
  );
}

export default ComposeTweet;
