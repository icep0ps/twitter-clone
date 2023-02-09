/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Comments from './components/comments/Comments';
import Comment from '../../common/components/Comment';
import { useParams, useLocation } from 'react-router-dom';
import useFetchTweet from './../../common/hooks/tweets/useFetchTweet';
import TweetInTweetStatus from './components/tweet/TweetInTweetStatus';

function TweetStatus() {
  let location = useLocation();
  const { author, id } = useParams();
  const { tweet, comment, getTweet } = useFetchTweet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTweet(author, id).then(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="col-start-2 flex flex-col gap-5 border-x border-gray-200 border-solid ">
      <h1 className=" font-semibold text-xl p-4 ">Tweet</h1>
      {comment && (
        <React.Fragment>
          <Comment
            key={comment.id}
            comment={comment.comment}
            tweet={comment.tweet}
            inStatus
          ></Comment>
          <Comments
            key={'comments'}
            location={location}
            tweetRef={comment.comment.ref}
          ></Comments>
        </React.Fragment>
      )}

      {tweet && (
        <React.Fragment>
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
          <Comments key={'comments'} location={location} tweetRef={tweet.ref}></Comments>
        </React.Fragment>
      )}
    </div>
  );
}

export default TweetStatus;
