import React from 'react';
import Tweet from '../../../../common/components/Tweet';
import useRetweets from '../../../../common/hooks/useRetweets';

const TweetsAndReplies = ({ id }) => {
  const { retweets } = useRetweets(id);
  return retweets.map((retweet) => {
    const { id, author, username, tweet, likes, retweets } = retweet;
    return (
      <div className=" flex flex-col border-b border-gray-500 border-solid p-3 relative">
        <Tweet
          id={id}
          key={id}
          author={author}
          username={username}
          tweet={tweet.tweet}
          likes={likes}
          retweets={retweets}
          tweetInfomation={tweet}
        />
      </div>
    );
  });
};

export default TweetsAndReplies;
