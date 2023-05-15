import React, { useEffect } from 'react';
import Tweet from '../../../../common/components/Tweet';
import useFetchTweets from '../../../../common/hooks/tweets/useFetchTweets';

const Tweets = ({ id }) => {
  const { getTweets, tweets } = useFetchTweets();

  useEffect(() => {
    getTweets(id);
  }, [id]);

  return tweets.map((tweedData) => {
    const { id, author, ref, retweetedBy } = tweedData;

    return (
      <div
        className=" flex flex-col border-b border-gray-500 border-solid p-3 relative"
        key={id}
      >
        <Tweet
          id={id}
          author={author}
          tweetRef={ref}
          tweetData={tweedData}
          retweeter={retweetedBy}
        />
      </div>
    );
  });
};

export default Tweets;
