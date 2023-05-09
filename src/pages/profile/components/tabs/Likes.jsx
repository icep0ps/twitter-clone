/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import uniqid from 'uniqid';
import { useEffect } from 'react';
import Tweet from '../../../../common/components/Tweet';
import Comment from '../../../../common/components/Comment';
import useFetchLikes from './../../../../common/hooks/userdata/useFetchLikes';

const Likes = ({ id }) => {
  const { tweets, comments, getLikes } = useFetchLikes();

  async function getLikedTweets() {
    await getLikes(id);
  }

  useEffect(() => {
    getLikedTweets();
  }, [id]);

  return (
    <div className=" flex flex-col border-b border-gray-500 border-solid p-3 relative">
     

      {comments.map((comment) => {
        return <Comment comment={comment.comment} tweet={comment.tweet} key={uniqid()} />;
      })}

      {tweets.map((tweet) => {
        return (
          <Tweet
            id={tweet.id}
            key={tweet.id}
            author={tweet.author}
            retweeter={tweet.retweeter}
            tweetData={tweet}
          />
        );
      })}
    </div>
  );
};
export default Likes;
