import React, { useEffect } from 'react';
import Tweet from '../../../../common/components/Tweet';
import useFetchTweets from '../../../../common/hooks/useFetchTweets';

const Tweets = ({ id }) => {
  const { getTweets, tweets } = useFetchTweets();
  const filterTweetsOnly = tweets.filter((tweet) => tweet.type === 'tweet');

  useEffect(() => {
    getTweets(id);
  }, []);

  return filterTweetsOnly.map((tweet) => {
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

export default Tweets;
