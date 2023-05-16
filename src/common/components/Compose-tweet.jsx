import React from 'react';
import Tweet from './Tweet';
import { useContext } from 'react';
import { COMMENT } from '../helpers/types';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Reply from '../../pages/Tweet/components/tweet/Reply';
import CreateTweet from '../../pages/home/components/Create-tweet';

function ComposeTweet() {
  const navigate = useNavigate();
  const { replyingTo: tweet } = useContext(UserContext);
  console.log('replayting to', tweet);

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-40	right-0 left-0 flex justify-center pt-28 z-10	">
      <div className=" h-fit w-4/12	 rounded-xl py-4 bg-white">
        <span
          onClick={(e) => {
            navigate(-1);
          }}
          className="p-4"
        >
          Close
        </span>
        {tweet ? (
          <>
            <Tweet
              id={tweet.id}
              key={tweet.id}
              type={COMMENT}
              author={tweet.author}
              username={tweet.username}
              tweet={tweet.tweet.tweet}
              likes={tweet.likes}
              retweets={tweet.retweets}
              tweetInfomation={tweet.tweet}
              tweetor={tweet.tweet}
              tweetData={tweet}
              tweetRef={tweet.ref}
            />
            <Reply
              username={tweet.username}
              author={tweet.author}
              id={tweet.id}
              parentTweetRef={tweet.ref.parent}
            ></Reply>
          </>
        ) : (
          <CreateTweet></CreateTweet>
        )}
      </div>
    </div>
  );
}

export default ComposeTweet;
