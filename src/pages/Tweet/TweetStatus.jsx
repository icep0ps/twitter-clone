/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useLocation } from 'react-router-dom';
import Tweet from './components/tweet/Tweet';
import React, { useEffect, useState } from 'react';
import Comments from './components/comments/Comments';
import useFetchTweet from '../../common/hooks/useFetchTweet';
import Comment from '../../common/components/Comment';

function TweetStatus() {
  let location = useLocation();
  const { author, id } = useParams();
  const { tweet, getTweet } = useFetchTweet();
  const [isLoading, setIsLoading] = useState(true);

  const fetchTweetAndComments = async () => {
    await getTweet(author, id);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTweetAndComments();
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="col-start-2 flex flex-col gap-5 border-x border-gray-200 border-solid ">
        <h1 className=" font-semibold text-xl p-4 ">Tweet</h1>
        {tweet.type === 'comment' ? (
          <>
            <Comment
              key={tweet.id}
              comment={tweet.comment}
              tweet={tweet.tweet}
              inTweetStatus={true}
            ></Comment>
            <Comments
              id={id}
              key={'comments'}
              author={tweet.author}
              tweetInfomation={tweet}
              location={location}
            ></Comments>
          </>
        ) : (
          <Tweet
            id={id}
            key={id}
            username={tweet.username}
            author={tweet.author}
            tweet={tweet.tweet}
            likes={tweet.likes}
            retweets={tweet.retweets}
            tweetInfomation={tweet}
            type={tweet.type}
          ></Tweet>
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
