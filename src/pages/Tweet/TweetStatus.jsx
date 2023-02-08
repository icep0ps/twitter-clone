/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Comments from './components/comments/Comments';
import Comment from '../../common/components/Comment';
import useFetchTweet from './../../common/hooks/tweets/useFetchTweet';
import TweetInTweetStatus from './components/tweet/TweetInTweetStatus';

function TweetStatus() {
  let location = useLocation();
  const { author, id } = useParams();
  const { tweet, getTweet } = useFetchTweet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTweet(author, id).then(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="col-start-2 flex flex-col gap-5 border-x border-gray-200 border-solid ">
        <h1 className=" font-semibold text-xl p-4 ">Tweet</h1>
        {console.log(tweet)}
        {tweet.type === 'comment' ? (
          <Comment
            key={tweet.id}
            comment={tweet.comment}
            tweet={tweet.tweet}
            inStatus
          ></Comment>
        ) : (
          <TweetInTweetStatus
            id={tweet.id}
            key={tweet.id}
            author={tweet.author}
            tweetRef={tweet.ref}
            tweet={tweet.tweet}
            images={tweet.images}
            date={tweet.date}
            tweetData={tweet}
          ></TweetInTweetStatus>
        )}
        <Comments
          id={id}
          key={'comments'}
          author={tweet.author}
          tweetInfomation={tweet}
          location={location}
        ></Comments>
      </div>
    );
  }
}

export default TweetStatus;
