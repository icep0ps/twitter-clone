/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Comments from './components/comments/Comments';
import Comment from '../../common/components/Comment';
import useFetchTweet from './../../common/hooks/tweets/useFetchTweet';
import TweetInTweetStatus from './components/tweet/TweetInTweetStatus';

function TweetStatus() {
  const { author, id: queryId } = useParams();
  const { tweet, getTweet } = useFetchTweet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(queryId);
    getTweet(author, queryId).then(() => setIsLoading(false));
  }, [queryId]);

  if (isLoading) return <h1>Loading...</h1>;

  const { id, type } = tweet;
  const isTweet = type === 'tweet';

  return (
    <div className="col-start-2 flex flex-col gap-5 border-x border-gray-200 border-solid ">
      <h1 className=" font-semibold text-xl p-4 ">Tweet</h1>

      {isTweet ? (
        <TweetInTweetStatus key={id} tweetRef={tweet.ref} tweetData={tweet} />
      ) : (
        <Comment key={id} comment={tweet.comment} tweet={tweet.tweet} inStatus />
      )}
      <Comments tweetRef={isTweet ? tweet.ref : tweet.comment.ref} />
    </div>
  );
}

export default TweetStatus;
