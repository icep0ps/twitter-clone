import React, { useEffect } from 'react';
import Tweet from '../../../../common/components/Tweet';
import useFetchTweets from '../../../../common/hooks/tweets/useFetchTweets';

const Tweets = ({ id }) => {
  const { getTweets, tweets } = useFetchTweets();

  useEffect(() => {
    getTweets(id);
  }, []);

  return [...tweets].map((mapObject) => {
    const tweet = mapObject[1];

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
