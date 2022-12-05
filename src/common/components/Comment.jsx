import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { COMMENT } from '../helpers/types';
import useFetchComment from '../hooks/useFetchComment';

function Comment(props) {
  const { comment } = props;
  const [tweet, getComment] = useFetchComment();
  const [isLoading, setIsLoading] = useState(true);

  const seach = async () => {
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
    <div className=" flex flex-col  border-gray-500 border-solid pb-3 relative">
      <Tweet
        id={tweet.tweet.id}
        key={tweet.tweet.id}
        type={COMMENT}
        author={tweet.tweet.author}
        username={tweet.tweet.username}
        tweet={tweet.tweet.tweet}
        likes={tweet.tweet.likes}
        retweets={tweet.tweet.retweets}
        tweetInfomation={tweet.tweet}
      />
      <Tweet
        id={tweet.comment.id}
        key={tweet.comment.id}
        author={tweet.comment.author}
        username={tweet.comment.username}
        tweet={tweet.comment.tweet}
        likes={tweet.comment.likes}
        retweets={tweet.comment.retweets}
        tweetInfomation={tweet.comment}
      />
    </div>
  );
}

export default Comment;
