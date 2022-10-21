import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { COMMENT } from '../helpers/types';
import useFetchComment from '../hooks/useFetchComment';

function Comment({ comment }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tweet, getComment] = useFetchComment();

  const seach = async () => {
    console.log(comment);

    await getComment(comment.comment.author, comment.comment.id);
    setIsLoading(false);
  };
  useEffect(() => {
    seach();
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className=" flex flex-col border-b border-gray-500 border-solid pb-3 relative">
      <Tweet
        id={tweet.tweet.id}
        key={tweet.tweet.id}
        type={COMMENT}
        author={tweet.tweet.author}
        username={tweet.tweet.username}
        tweet={tweet.tweet.tweet.tweet}
        likes={tweet.tweet.likes}
        retweets={tweet.tweet.retweets}
        tweetInfomation={tweet.tweet}
      />
      <Tweet
        id={tweet.comment.id}
        key={tweet.comment.id}
        author={tweet.comment.author}
        username={tweet.comment.username}
        tweet={tweet.comment.tweet.tweet}
        likes={tweet.comment.likes}
        retweets={tweet.comment.retweets}
        tweetInfomation={tweet.comment}
      />
    </div>
  );
}

export default Comment;
