import React from 'react';
import Tweet from '../../../../common/components/Tweet';
import useFetchTweets from '../../../../common/hooks/useFetchTweets';

const TweetsCategory = ({ id }) => {
  const { tweets } = useFetchTweets(id);
  const getTweets = tweets.filter((tweet) => tweet.type === 'tweet');

  return getTweets.map((tweet) => {
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
  });
};

export default TweetsCategory;
